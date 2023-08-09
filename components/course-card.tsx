import { Button, Card, Flex, Heading, Link, Skeleton, Text } from "@chakra-ui/react";
import { MediaRenderer, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { TEST_COURSE_ADDRESS, TEST_COURSE_ADDRESS_2 } from "../constants/contractAddresses";

type Props = {
    courseContractAddress: string;
};

export const CourseCard: React.FC<Props> = ({ courseContractAddress }) => {
    const address = useAddress();

    const {
        contract
    } = useContract(courseContractAddress);

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
    console.log(sectionCount);

    const {
        data: totalEnrolledStudents,
        isLoading: totalEnrolledStudentsLoading
    } = useContractRead(
        contract,
        "totalEnrolledStudents"
    );
    console.log(totalEnrolledStudents);

    const {
        data: courseImage,
        isLoading: courseImageLoading
    } = useContractRead(
        contract,
        "courseImage"
    );

    const {
        data: courseDescription,
        isLoading: courseDescriptionLoading
    } = useContractRead(
        contract,
        "courseDescription"
    );

    return (
        <Card p={4} maxW={"50%"}>
            <Flex flexDirection={"row"} justifyContent={"space-between"}>
                <Heading>{courseName}</Heading>
                {!isEnrolledLoading ? (
                    <Web3Button
                        contractAddress={TEST_COURSE_ADDRESS_2}
                        action={(contract) => contract.call("enrollStudent")}
                        isDisabled={isEnrolled}
                    >
                        {isEnrolled ? "Joined" : "Enroll"}
                    </Web3Button>
                ) : (
                    <Skeleton h={"10px"} w={"10px"}/>
                )}
            </Flex>
            <MediaRenderer
                src={courseImage}
            />
            <Text>{courseDescription}</Text>
            <Text>{sectionCount?.toNumber()} Sections</Text>
            <Text>{totalEnrolledStudents?.toNumber()} Students</Text>
            <Link href={`/course/${courseContractAddress}/courseDetail`}>
                <Button>View Course</Button>
            </Link>
            
        </Card>
    );
};