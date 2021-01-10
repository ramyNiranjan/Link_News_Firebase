import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export default function ConfirmationModal({
  signoutClose,
  title,
  isOpen,
  onClose,
}) {
  return (
    <>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt="20" mx="4">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button bg="red.100" mr={3} onClick={signoutClose}>
              Yes
            </Button>
            <Button bg="green.100" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
