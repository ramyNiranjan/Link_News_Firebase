import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "../firebase";
import { getDomain } from "../../utils/";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
// import FirebaseContext from "../../firebase/context";

function LinkItem({ link, index, showCount, history }) {
  const { firebase, user } = React.useContext(FirebaseContext);


  function handelDeleteLink(){
    const linkRef = firebase.firestore.collection("links").doc(link.id);
    linkRef.delete().then(()=>{
      console.log(`documete with ${link.id} delete`)
    }).catch((err)=>{
      console.log(`Error deleting document :${err}`)
    })

  }

  useEffect(()=>{
    
  })

  function handleVote() {
    if (!user) {
      history.push("/login");
    } else {
      const voteRef = firebase.firestore.collection("links").doc(link.id);
      voteRef.get().then(doc => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          voteRef.update({ votes: updatedVotes });
        }
      });
    }
  }

    const postedByAuthUser=user && user.uid==link.postedBy.id

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button" onClick={handleVote} >
          ▲
        </div>
      </div>
      <div className="ml1">
        <div>
          {link.description}{" "}
          <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes by {link.postedBy.name}{" "}
          {distanceInWordsToNow(link.created)}
          {" | "}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0
              ? `${link.comments.length} comments`
              : "discuss"}
          </Link>
          {postedByAuthUser && 
             <>
              <span className='delete-button' onClick={handelDeleteLink}>
                  Delete
              </span>
             </>
          
          }
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
