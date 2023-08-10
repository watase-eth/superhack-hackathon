import { Box, Radio, RadioGroup, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useState } from "react";

type Props = {
    sectionAddress: string;
    sectionId: string;
};

export const Question: React.FC<Props> = ({ sectionAddress, sectionId }) => {
    const address = useAddress();
    const toast = useToast();
    
    const {
        contract
    } = useContract(sectionAddress);

    const {
        data: totalQuestions,
        isLoading: totalQuestionsLoading
    } = useContractRead(
        contract,
        "sectionQuizCounts",
        [sectionId]
    );

    const {
        data: questions,
        isLoading: questionsLoading
    } = useContractRead(
        contract,
        "getSectionWithQuizzes",
        [sectionId]
    );

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

    const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));

    const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    return (
        <>
            {questionsLoading && sectionStatusLoading ? (
                <Spinner />
            ) : (
                !sectionStatus ? (
                    <>
                        {questions?.quizzes.map((question: any, questionIndex: number) => (
                            <>
                                <Text fontSize={"lg"} fontWeight={"bold"} mt={4}>{question.question}</Text>
                                <RadioGroup>
                                    <Stack>
                                        {Array.from({ length: question.options.length }, (_, i) => {
                                            return (
                                                <Radio
                                                    key={i}
                                                    name={`question-${i}`}
                                                    value={i.toString()}
                                                    onChange={() => handleAnswerChange(questionIndex, i)}
                                                >{question.options[i]}</Radio>
                                            );
                                        })}
                                    </Stack>
                                </RadioGroup>
                            </>
                        ))}
                        <Box my={10}>
                            <Web3Button
                                contractAddress={sectionAddress}
                                action={(contract) => contract.call(
                                    "submitQuiz",
                                    [
                                        sectionId,
                                        answers
                                    ]
                                )}
                                onError={() => toast({
                                    title: 'Incorrect',
                                    description: "1 or more of your answers were incorrect. Please try again.",
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                })}
                                onSuccess={() => toast({
                                    title: 'Correct',
                                    description: "All of your answers were correct. You have completed this section.",
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                })}
                            >Submit</Web3Button>
                        </Box>
                    </>
                ) : (
                    <Text fontSize={"lg"} fontWeight={"bold"} mt={4}>You have already completed this section.</Text>
                )
            )}
        </>
    );
};