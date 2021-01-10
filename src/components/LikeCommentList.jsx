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
      >
        <AlertDialogOverlay />

        <AlertDialogContent mt="20" mx="4">
          <AlertDialogHeader>Likes</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <SimpleGrid p="2" minChildWidth="200px" spacing="10px" bg="gray.50">
              {list.length === 0
                ? "There are no likes"
                : list.map(({ likedBy }) => (
                    <Box key={likedBy.name}>{likedBy.name}</Box>
                  ))}
            </SimpleGrid>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
