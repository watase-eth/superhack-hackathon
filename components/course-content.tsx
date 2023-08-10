import { Box, Heading, Skeleton, Text } from "@chakra-ui/react";
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

    const {
        data: sectionData,
        isLoading: sectionDataLoading
    } = useContractRead(
        contract,
        "sections",
        [sectionId + 1]
    );

    function extractHash(ipfsUri: string) {
        return ipfsUri?.replace('ipfs://', '');
    }

    return (
        <Box
            p={10}
        >
            <Heading mb={4}>{section?.name}</Heading>
            <Skeleton isLoaded={sectionData}>
                <video 
                    width={"100%"} 
                    height={"auto"} 
                    controls
                    key={sectionData?.courseVideo}
                >
                    <source src={`https://gateway.ipfscdn.io/ipfs/${extractHash(sectionData?.courseVideo)}`} type="video/mp4"/>
                </video>
            </Skeleton>
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