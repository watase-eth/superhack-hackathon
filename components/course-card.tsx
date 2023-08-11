import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Skeleton,
  SkeletonText,
  Tag,
  Text,
  Stack,
} from "@chakra-ui/react";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { TEST_COURSE_ADDRESS } from "../constants/contractAddresses";

type Props = {
  courseContractAddress: string;
};

export const CourseCard: React.FC<Props> = ({ courseContractAddress }) => {
  const address = useAddress();

  const { contract } = useContract(courseContractAddress);

  const { data: courseName, isLoading: courseNameLoading } = useContractRead(
    contract,
    "courseName"
  );

  const { data: isEnrolled, isLoading: isEnrolledLoading } = useContractRead(
    contract,
    "enrolledStudents",
    [address]
  );

  const { data: sectionCount, isLoading: sectionCountLoading } =
    useContractRead(contract, "sectionCount");

  const {
    data: totalEnrolledStudents,
    isLoading: totalEnrolledStudentsLoading,
  } = useContractRead(contract, "totalEnrolledStudents");

  const { data: courseImage, isLoading: courseImageLoading } = useContractRead(
    contract,
    "courseImage"
  );

  const { data: courseDescription, isLoading: courseDescriptionLoading } =
    useContractRead(contract, "courseDescription");

  return (
    <Card p={4} w={"100%"} mt={10} boxShadow="lg">
      <Flex flexDirection={"column"} justifyContent={"space-between"}>
        <SkeletonText
          isLoaded={!courseNameLoading && !isEnrolledLoading}
          fadeDuration={1}
        >
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={2}
          >
            <Heading fontSize={"2xl"}>{courseName}</Heading>
            {!isEnrolledLoading &&
              (isEnrolled ? (
                <Tag size={"md"} variant={"solid"} colorScheme={"green"}>
                  Enrolled
                </Tag>
              ) : (
                <Tag size={"md"} variant={"solid"} colorScheme={"red"}>
                  Not Enrolled
                </Tag>
              ))}
          </Flex>
        </SkeletonText>
        <Skeleton isLoaded={!courseImageLoading}>
          <Box borderRadius={4} overflow={"hidden"}>
            <MediaRenderer src={courseImage} width="100%" height="auto" />
          </Box>
        </Skeleton>
        <Flex
          flexDirection={"row"}
          justifyContent={"flex-start"}
          alignContent={"center"}
          my={4}
        >
          <Tag size={"sm"} variant={"outline"} colorScheme={"messenger"}>
            {sectionCount?.toNumber()} Sections
          </Tag>
          <Tag size={"sm"} variant={"outline"} colorScheme={"messenger"} ml={2}>
            {totalEnrolledStudents?.toNumber()} Students
          </Tag>
        </Flex>
        <SkeletonText isLoaded={!courseDescriptionLoading}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Course Description:
          </Text>
          <Text fontSize={"sm"} mt={2} pb={4}>
            {courseDescription}
          </Text>
        </SkeletonText>

        <Stack spacing={2}>
          <Link href={`/course/${courseContractAddress}`}>
            <Button minW={"100%"}>View Course</Button>
          </Link>
          {!isEnrolledLoading && !isEnrolled && (
            <Button
              as={Web3Button}
              contractAddress={courseContractAddress as string}
              action={(contract: any) => contract.call("enrollStudent")}
              isDisabled={isEnrolled}
              backgroundColor="green.200"
              color="green.700"
              _hover={{ backgroundColor: "green.400" }}
              _active={{ backgroundColor: "green.500" }}
            >
              Enroll
            </Button>

            // <Web3Button
            //   contractAddress={courseContractAddress as string}
            //   action={(contract) => contract.call("enrollStudent")}
            //   isDisabled={isEnrolled}
            // >
            //   Enroll
            // </Web3Button>
          )}
        </Stack>
      </Flex>
    </Card>
  );
};
