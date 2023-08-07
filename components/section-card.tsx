import { Card, Text } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

type Props = {
    sectionAddress: string;
    sectionId: number;
};

export const SectionCard: React.FC<Props> = ({ sectionAddress, sectionId }) => {
    const {
        contract
    } = useContract(sectionAddress);

    const {
        data: section,
        isLoading: sectionLoading
    } = useContractRead(
        contract,
        "sections",
        [sectionId + 1]
    );
    console.log(section);
    
    return (
        <Card p={4}>
            <Text>{section?.name}</Text>
        </Card>
    )
};