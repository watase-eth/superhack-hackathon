import { Box, Button, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useState } from "react";
import { Question } from "./question";

type Props = {
    sectionAddress: string;
    sectionId: string;
};

export const QuizModal: React.FC<Props> = ({ sectionAddress, sectionId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const address = useAddress();

    const {
        contract
    } = useContract(sectionAddress);

    const {
        data: section,
        isLoading: sectionLoading
    } = useContractRead(
        contract,
        "sections",
        [sectionId]
    );

    const {
        data: totalQuestions,
        isLoading: totalQuestionsLoading
    } = useContractRead(
        contract,
        "getQuizCountForSection",
        [sectionId]
    );
    console.log(totalQuestions);

    const {
        data: questions,
        isLoading: questionsLoading
    } = useContractRead(
        contract,
        "getQuizzesForSection",
        [sectionId]
    );
    console.log(questions);

    const {
        data: sectionStatus,
        isLoading: sectionStatusLoading
    } = useContractRead(
        contract,
        "getSectionStatus",
        [
            address,
            sectionId
        ]
    );

    return (
        <>
            <Button 
                onClick={onOpen}
                disabled={sectionStatusLoading ? true : sectionStatus === "COMPLETED" ? true : false}
            >Take Quiz</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{section?.name} Quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {totalQuestionsLoading ? (
                        <Spinner />
                    ) : (
                        <Question
                            sectionAddress={sectionAddress}
                            sectionId={sectionId}
                        />
                    )}
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};