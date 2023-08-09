import { Card, Flex, Text } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Link from "next/link";

type Props = {
    sectionAddress: string;
    sectionId: number;
    isEnrolled: boolean;
};

export const SectionCard: React.FC<Props> = ({ sectionAddress, sectionId, isEnrolled }) => {
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
    
    if(!isEnrolled) {
        return (
            <Card
                backgroundColor={"gray.200"}
                p={4}
            >
                <Text>{section?.name}</Text>
            </Card>
        );
    }

    return (
        <Link href={`/course/${sectionAddress}/sections/${sectionId}`}>
            <Card p={4} mb={4}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Text>{section?.name}</Text>
                    <Text>{">"}</Text>
                </Flex>
            </Card>
        </Link>
    )
};