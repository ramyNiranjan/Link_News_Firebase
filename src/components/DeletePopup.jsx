import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { firestore } from "../firebase";
import { toastAlert } from "../utils/helper";

export default function DeletePopup({ isOpen, onClose, itemId }) {
  const toast = useToast();
  const docRef = firestore.collection("links").doc(itemId);
  const deleteOnClose = () => {
    onClose();
    docRef
      .delete()
      .then(() => {
        toastAlert(
          toast,
          "Deleted",
          "The selected item has been deleted",
          "success"
        );
      })
      .catch((err) => {
        toastAlert(
          toast,
          "Error",
          "Please try again later, internal error occurred",
          "error"
        );
      });
  };
  return (
    <>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent mt="20" mx="4">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete selected Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={deleteOnClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
