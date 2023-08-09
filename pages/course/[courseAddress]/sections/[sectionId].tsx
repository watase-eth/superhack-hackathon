import { Container, Heading } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { QuizModal } from "../../../../components/quiz-modal";

export default function SectionPage() {
    const router = useRouter();
    const { courseAddress, sectionId } = router.query;

    const {
        contract
    } = useContract(courseAddress as string);

    const {
        data: section,
        isLoading: sectionLoading
    } = useContractRead(
        contract,
        "sections",
        [sectionId]
    );
    console.log(section);

    function extractHash(ipfsUri: string) {
        return ipfsUri.replace('ipfs://', '');
    }

    return (
        <Container maxWidth={"1440px"}>
            <Heading>{section?.name}</Heading>
            <video width={"100%"} height={"auto"} controls>
                <source src={`https://gateway.ipfscdn.io/ipfs/${extractHash("ipfs://QmbAxAuR3iRVgVE8K55R7rihG5rYy7iSpmEcwTxhyzwg5Q/demo.mp4")}`} type="video/mp4"/>
            </video>
            <QuizModal
                sectionAddress={courseAddress as string}
                sectionId={sectionId as string}
            />
        </Container>
    );
}
