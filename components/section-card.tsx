import { Box, Button, Card, Flex, Link, Tag, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

type Props = {
    sectionAddress: string;
    sectionId: number;
    isSectionSelected: boolean;
};

export const SectionCard: React.FC<Props> = ({ sectionAddress, sectionId, isSectionSelected }) => {
    const address = useAddress();

    const {
        contract
    } = useContract(sectionAddress);

    const {
        data: section
    } = useContractRead(
        contract,
        "sections",
        [sectionId + 1]
    );

    const {
        data: isCompleted,
        isLoading: isCompletedLoading
    } = useContractRead(
        contract,
        "getSectionStatus",
        [
            address,
            sectionId + 1
        ]
    );
    console.log(sectionId + " isCompleted: " + isCompleted);
    
    return (
        <Box
            p={4}
            borderBottom={"1px solid"}
            _hover={
                {
                    cursor: "pointer",
                    backgroundColor: "gray.100"
                }
            }
        >
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Text>{section?.name}</Text>
                {/* Tag that say is completed if isCompleted is true */}
                <Tag
                    size={"md"}
                    variant={"solid"}
                    colorScheme={isCompleted ? "green" : "gray"}
                >
                    {isCompleted ? "Completed" : "Incomplete"}
                </Tag>
            </Flex>
        </Box>
    )
};