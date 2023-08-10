import { Box, Heading, Text } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { QuizModal } from "./quiz-modal";

type Props = {
    courseAddress: string;
    sectionId: number;
};

export const CourseContent: React.FC<Props> = ({ courseAddress, sectionId }) => {
    const {
        contract
    } = useContract(courseAddress);

    const {
        data: section,
        isLoading: sectionLoading
    } = useContractRead(
        contract,
        "sections",
        [sectionId + 1]
    );

    function extractHash(ipfsUri: string) {
        return ipfsUri.replace('ipfs://', '');
    }

    return (
        <Box
            p={10}
        >
            <Heading mb={4}>{section?.name}</Heading>
            <video width={"100%"} height={"auto"} controls>
                <source src={`https://gateway.ipfscdn.io/ipfs/${extractHash("ipfs://QmbAxAuR3iRVgVE8K55R7rihG5rYy7iSpmEcwTxhyzwg5Q/demo.mp4")}`} type="video/mp4"/>
            </video>
            <Box>
                <Text fontSize={"xl"} fontWeight={"bold"} py={4}>Section Description:</Text>
                <Text>{section?.description}</Text>
            </Box>
            <Box mt={4}>
                <QuizModal sectionAddress={courseAddress} sectionId={(sectionId + 1).toString()}/>
            </Box>
        </Box>
    )
};