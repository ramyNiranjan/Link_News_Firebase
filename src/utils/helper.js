import { firestore } from "../firebase";
import formatDistance from "date-fns/formatDistance";

export function getDomain(url) {
  return url.replace(/^https?:\/\//i, "");
}

export const handelLike = (user, id, toast) => {
  const likeRef = firestore.collection("links").doc(id);
  if (!user) {
    toastAlert(
      toast,
      "You are not logged in",
      "Please login or create an account to  like",
      "info"
    );
    return;
  }
  likeRef.get().then((doc) => {
    if (doc.exists) {
      const previousLikes = doc.data().likes;
      if (previousLikes.some((item) => item.likedBy.id === user.uid)) {
        const updatedLikes = previousLikes.filter((like) => {
          return like.likedBy.id !== user.uid;
        });
        likeRef.update({
          likes: updatedLikes,
        });
        return;
      }
      const newLikes = { likedBy: { id: user.uid, name: user.displayName } };
      const updatedLikes = [...previousLikes, newLikes];
      likeRef.update({
        likes: updatedLikes,
      });
    }
  });
};

export const handelComment = (user, id, toast, msg) => {
  const commentRef = firestore.collection("links").doc(id);
  commentRef.get().then((doc) => {
    if (doc.exists) {
      const previousComments = doc.data().comments;
      const newComment = {
        commentedBy: {
          id: user.uid,
          name: user.displayName,
          msg,
          createdAt: Date.now(),
        },
      };
      const updatedComments = [...previousComments, newComment];
      commentRef.update({
        comments: updatedComments,
      });
    }
  });
};

export const handelCommentEdit = (value, docRef, createdAt) => {
  docRef.get().then((doc) => {
    if (doc.exists) {
      const allComments = doc.data().comments;
      const selectedComments = allComments.map((item) => {
        if (item.commentedBy.createdAt === createdAt) {
          item.commentedBy.msg = value;
        }
        return item;
      });
      docRef.update({
        comments: selectedComments,
      });
    }
  });
};

export const handelCommentDelete = (docRef, createdAt) => {
  docRef.get().then((doc) => {
    if (doc.exists) {
      const previousComments = doc.data().comments;
      const updatedComments = previousComments.filter(
        ({ commentedBy }) => commentedBy.createdAt !== createdAt
      );
      docRef.update({
        comments: updatedComments,
      });
    }
  });
};

export const colorLikeIcon = (likes, user) => {
  return likes.filter(({ likedBy }) => likedBy?.id === user.uid);
};
export const colorCommentIcon = (comment, user) => {
  return comment.filter(({ commentedBy }) => commentedBy?.id === user.uid);
};

export const toastAlert = (toast, title, desc, status) => {
  toast({
    title: title,
    description: desc,
    status: status,
    duration: 3000,
    isClosable: true,
    position: "top",
  });
};

export const convertToReadableDate = (data) => {
  return formatDistance(new Date(data), Date.now(), {
    addSuffix: true,
  });
};
