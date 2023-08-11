import {
  Container,
  Flex,
  Heading,
  Link,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { SectionCard } from "../../../components/section-card";
import {
  TEST_COURSE_ADDRESS,
  TEST_COURSE_ADDRESS_2,
} from "../../../constants/contractAddresses";

export default function CoursePage() {
  const router = useRouter();
  const { courseAddress } = router.query;
  console.log(courseAddress);

  const address = useAddress();

  const { contract } = useContract(courseAddress as string);

  const { data: courseName } = useContractRead(contract, "courseName");
  console.log(courseName);

  const { data: isEnrolled, isLoading: isEnrolledLoading } = useContractRead(
    contract,
    "enrolledStudents",
    [address]
  );
  console.log(isEnrolled);

  const { data: sectionCount, isLoading: sectionCountLoading } =
    useContractRead(contract, "sectionCount");
  console.log("SectionCount: " + sectionCount);

  const { data: courseImage, isLoading: courseImageLoading } = useContractRead(
    contract,
    "courseImage"
  );

  const { data: courseDescription, isLoading: courseDescriptionLoading } =
    useContractRead(contract, "courseDescription");

  return (
    <Container maxWidth={"1440px"}>
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
          <Skeleton h={"10px"} w={"10px"} />
        )}
      </Flex>
      <MediaRenderer src={courseImage} />
      <Text>{courseDescription}</Text>
      <Text>Sections:</Text>
      {Array.from({ length: sectionCount }).map((_, index) => {
        return (
          <SectionCard
            key={index}
            sectionAddress={courseAddress as string}
            sectionId={index + 1}
            isEnrolled={isEnrolled as boolean}
          />
        );
      })}
    </Container>
  );
}
