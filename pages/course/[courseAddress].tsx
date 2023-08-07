import { Container, Heading, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { SectionCard } from "../../components/section-card";

export default function CoursePage() {
    const router = useRouter();
    const { courseAddress } = router.query;
    console.log(courseAddress);

    const address = useAddress();

    const {
        contract
    } = useContract(courseAddress as string);

    const {
        data: courseName
    } = useContractRead(
        contract,
        "courseName"
    );
    console.log(courseName);

    const {
        data: isEnrolled,
        isLoading: isEnrolledLoading
    } = useContractRead(
        contract,
        "enrolledStudents",
        [address]
    );
    console.log(isEnrolled);

    const {
        data: sectionCount,
        isLoading: sectionCountLoading
    } = useContractRead(
        contract,
        "sectionCount"
    );
    console.log("SectionCount: " + sectionCount);
    
    return (
        <Container maxWidth={"1440px"}>
            <Heading>{courseName}</Heading>
            <Text>Sections:</Text>
            {/* Create mapping based on section count and create section card for each section */}
            
        </Container>
    )
};