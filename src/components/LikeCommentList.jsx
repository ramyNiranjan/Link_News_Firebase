import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";

export default function LikeList({ list = [], isOpen, onClose }) {
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Likes</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <SimpleGrid minChildWidth="200px" spacing="10px">
              {list &&
                list.map(({ likedBy }) => (
                  <Box key={likedBy.name}>{likedBy.name}</Box>
                ))}
            </SimpleGrid>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
