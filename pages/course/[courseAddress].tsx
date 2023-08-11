import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  ConnectWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { SectionCard } from "../../components/section-card";
import { useState } from "react";
import { CourseContent } from "../../components/course-content";
import { CERTIFICATE_ADDRESS } from "../../constants/contractAddresses";

export default function CoursePage() {
  const router = useRouter();
  const { courseAddress } = router.query;

  const address = useAddress();
  const toast = useToast();

  const { contract } = useContract(courseAddress as string);

  const { contract: certificateContract } = useContract(
    CERTIFICATE_ADDRESS,
    "signature-drop"
  );

  const { data: courseName, isLoading: courseNameLoading } = useContractRead(
    contract,
    "courseName"
  );
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

  const { data: hasCompletedCourse } = useContractRead(
    contract,
    "hasCompletedAllSectionQuizzes",
    [address]
  );

  const [selectedSection, setSelectedSection] = useState<number>(0);
  const [isSectionSelected, setIsSectionSelected] = useState<boolean>(false);

  const mintCertificate = async () => {
    try {
      const signedPayloadReq = await fetch(`../api/server`, {
        method: "POST",
        body: JSON.stringify({
          claimerAddress: address,
          courseAddress: courseAddress,
        }),
      });

      const json = await signedPayloadReq.json();

      if (!signedPayloadReq.ok) {
        alert(json.error);
      }

      const signedPayload = json.signedPayload;

      const prize = await certificateContract?.erc721.signature.mint(
        signedPayload
      );
      return prize;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxW="container.xl" p={8} boxShadow="xl">
      <Flex flexDirection={"row"} justifyContent="space-between">
        <Box
          width={{ base: "100%", md: "30%" }}
          height={"auto"}
          p={6}
          borderRight={{ md: "1px solid black" }}
          mb={{ base: 4, md: 0 }}
          boxShadow="sm"
          borderRadius="md"
        >
          <Stack>
            <Button onClick={() => router.push("/")}>Back</Button>
            <ConnectWallet theme="light" />
            {isEnrolled ? (
              <Tag size={"lg"} variant={"outline"} colorScheme={"green"} my={2}>
                Enrolled
              </Tag>
            ) : (
              <Tag size={"lg"} variant={"outline"} colorScheme={"red"} my={2}>
                Not Enrolled
              </Tag>
            )}
            <SkeletonText isLoaded={!courseNameLoading}>
              <Heading fontSize={"2xl"}>{courseName}</Heading>
            </SkeletonText>
            <Skeleton isLoaded={!courseImageLoading}>
              <Box borderRadius={4} overflow={"hidden"}>
                <MediaRenderer src={courseImage} width="100%" height="auto" />
              </Box>
            </Skeleton>
            <Box>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Sections:
              </Text>
              {Array.from({ length: sectionCount }).map((_, index) => {
                return (
                  <Box
                    key={index}
                    _hover={{
                      cursor: "pointer",
                      backgroundColor: "gray.300",
                    }}
                    onClick={() => {
                      setSelectedSection(index);
                      setIsSectionSelected(true);
                    }}
                  >
                    <SectionCard
                      key={index}
                      sectionAddress={courseAddress as string}
                      sectionId={index}
                      isSectionSelected={isSectionSelected}
                    />
                  </Box>
                );
              })}
            </Box>
            {hasCompletedCourse && (
              <Web3Button
                contractAddress={courseAddress as string}
                action={() => mintCertificate()}
                onSuccess={() =>
                  toast({
                    title: "Certificate Minted!",
                    description:
                      "You have successfully minted your certificate!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  })
                }
              >
                Mint Certificate
              </Web3Button>
            )}
          </Stack>
        </Box>
        <Box
          width={{ base: "100%", md: "67%" }}
          p={6}
          height={"auto"}
          boxShadow="sm"
          borderRadius="md"
        >
          <Flex h={"100%"} justifyContent={"center"} alignItems={"center"}>
            {isEnrolledLoading ? (
              <Spinner />
            ) : isEnrolled ? (
              <CourseContent
                courseAddress={courseAddress as string}
                sectionId={selectedSection}
              />
            ) : (
              <Tag size={"lg"} variant={"solid"} colorScheme={"red"}>
                Enroll in the course to view content
              </Tag>
            )}
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}
