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
        "getQuizCountForSection",
        [sectionId]
    );

    const {
        data: questions,
        isLoading: questionsLoading
    } = useContractRead(
        contract,
        "getQuizzesForSection",
        [sectionId]
    );

    const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));
    console.log(answers);
    console.log(answers.length);

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
                questions.map((question: any, index: number) => {
                    return(
                        <Box>
                            <Text>{question.question}</Text>
                            <RadioGroup>
                                <Stack>
                                    {question.options.map((option: any, optionIndex: number) => {
                                        return(
                                            <Radio
                                                key={optionIndex}
                                                name={`question-${index}`}
                                                value={optionIndex.toString()}
                                                onChange={() => handleAnswerChange(index, optionIndex)}
                                            >{option}</Radio>
                                        )
                                    })}
                                </Stack>
                            </RadioGroup>
                        </Box>
                    )
                })
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