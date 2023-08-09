import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

type Props = {
    sectionAddress: string;
    sectionId: string;
};

export const QuizModal: React.FC<Props> = ({ sectionAddress, sectionId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Quiz content here.</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Submit</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};