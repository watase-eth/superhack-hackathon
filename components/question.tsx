import { Box, Card, Radio, RadioGroup, Spinner, Stack, Text } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useState } from "react";

type Props = {
    sectionAddress: string;
    sectionId: string;
};

export const Question: React.FC<Props> = ({ sectionAddress, sectionId }) => {
    const address = useAddress();
    
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
    console.log("Question data: " + questions?.quizzes[0].options.length);

    const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));
    console.log("Answers: " + answers);

    const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    return (
        <>
            {questionsLoading ? (
                <Spinner />
            ) : (
                questions?.quizzes.map((question: any, questionIndex: number) => (
                    <>
                        <Text>{question.question}</Text>
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
                ))
            )}
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
                    onError={(error) => alert(error.message)}
                    onSuccess={
                        (result) => {
                            alert("You passed!");
                        }
                    }
                >Submit</Web3Button>
            </Box>
            
        </>
    );
};