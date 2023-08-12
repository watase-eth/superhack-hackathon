import { NextPage } from "next";
import Cta1 from "../components/CallToActionWithAnnotation";
import Features1 from "../components/FeaturesWithImage";
import GridList from "../components/GridList";
import Contact from "../components/Contact";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import { CourseCard } from "../components/course-card";
import { MINTED_COURSE_CONTRACTS } from "../constants/contractAddresses";

//... other imports ...

const Home: NextPage = () => {
  const address = useAddress();

  const { contract: featuredCourseContract } = useContract(
    MINTED_COURSE_CONTRACTS[0]
  );

  const { data: courseName, isLoading: courseNameLoading } = useContractRead(
    featuredCourseContract,
    "courseName"
  );

  const { data: courseImage, isLoading: courseImageLoading } = useContractRead(
    featuredCourseContract,
    "courseImage"
  );

  const { data: courseDescription, isLoading: courseDescriptionLoading } =
    useContractRead(featuredCourseContract, "courseDescription");

  const { data: sectionCount, isLoading: sectionCountLoading } =
    useContractRead(featuredCourseContract, "sectionCount");

  const {
    data: totalEnrolledStudents,
    isLoading: totalEnrolledStudentsLoading,
  } = useContractRead(featuredCourseContract, "totalEnrolledStudents");

  const { data: isEnrolled, isLoading: isEnrolledLoading } = useContractRead(
    featuredCourseContract,
    "enrolledStudents",
    [address]
  );

  return (
    <>
      {address ? (
        <Container minW={"100%"} p={10}>
          <Card p={10} mb={10} boxShadow="lg">
            <Flex flexDirection={{ md: "row", sm: "column"}}>
              <Flex borderRadius={8} overflow={"hidden"} w={"30%"}>
                <Box>
                  <MediaRenderer src={courseImage} width="100%" height="100%" />
                </Box>
              </Flex>
              <Flex
                flexDirection={"column"}
                px={10}
                justifyContent={"space-between"}
              >
                <Flex
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignContent={"center"}
                  my={4}
                >
                  <Box>
                    <Tag
                      size={"sm"}
                      variant={"outline"}
                      colorScheme={"messenger"}
                    >
                      {sectionCount?.toNumber()} Sections
                    </Tag>
                    <Tag
                      size={"sm"}
                      variant={"outline"}
                      colorScheme={"messenger"}
                      ml={2}
                    >
                      {totalEnrolledStudents?.toNumber()} Students
                    </Tag>
                  </Box>
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
                <Box>
                  <Heading fontSize={"7xl"}>{courseName}</Heading>
                  <Box mt={4} w={"85%"}>
                    <Text fontSize={"xl"} fontWeight={"bold"}>
                      Course Description:
                    </Text>
                    <Text fontSize={"xl"}>{courseDescription}</Text>
                  </Box>
                </Box>

                <Flex flexDirection={"row"} justifyContent={"flex-end"} mt={4}>
                  <Link href={`/course/${MINTED_COURSE_CONTRACTS[0]}`} mr={4}>
                    <Button minW={"100%"}>View Course</Button>
                  </Link>
                  {!isEnrolledLoading && !isEnrolled && (
                    <Button
                      as={Web3Button}
                      contractAddress={MINTED_COURSE_CONTRACTS[0]}
                      action={(contract: any) => contract.call("enrollStudent")}
                      isDisabled={isEnrolled}
                      backgroundColor="green.200"
                      color="green.700"
                      _hover={{ backgroundColor: "green.400" }}
                      _active={{ backgroundColor: "green.500" }}
                    >
                      Enroll
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Heading>Courses:</Heading>
          <SimpleGrid columns={{ base: 4, md: 3, sm: 1}} spacing={10}>
            {Array.from({ length: MINTED_COURSE_CONTRACTS.length }, (_, i) => {
              return (
                <CourseCard
                  key={i}
                  courseContractAddress={MINTED_COURSE_CONTRACTS[i]}
                />
              );
            })}
          </SimpleGrid>
        </Container>
      ) : (
        <div>
          <div>
            <Cta1 />
            <Features1 />
            <GridList />
            <Contact></Contact>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
