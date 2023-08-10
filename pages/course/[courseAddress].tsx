import { Box, Container, Flex, Heading, SimpleGrid, Skeleton, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { MediaRenderer, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { SectionCard } from "../../components/section-card";
import { useState } from "react";
import { CourseContent } from "../../components/course-content";

export default function CoursePage() {
    const router = useRouter();
    const { courseAddress } = router.query;
    console.log(courseAddress);

    const address = useAddress();

    const {
        contract
    } = useContract(courseAddress as string);

    const {
        data: courseName,
        isLoading: courseNameLoading
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

    const {
        data: courseImage,
        isLoading: courseImageLoading
    } = useContractRead(
        contract,
        "courseImage"
    );

    const [selectedSection, setSelectedSection] = useState<number>(0);
    const [isSectionSelected, setIsSectionSelected] = useState<boolean>(false);
    
    return (
        <Container minW={"100%"}>
            <Flex flexDirection={"row"}>
                <Box
                    width={"30%"}
                    height={"95vh"}
                    p={10}
                    borderRight={"1px solid black"}
                >
                    <Stack>
                        <SkeletonText isLoaded={!courseNameLoading}>
                            <Heading fontSize={"2xl"}>{courseName}</Heading>
                        </SkeletonText>
                        <Skeleton isLoaded={!courseImageLoading}>
                            <Box borderRadius={4} overflow={"hidden"}>
                                <MediaRenderer
                                    src={courseImage}
                                    width="100%"
                                    height="auto"
                                />
                            </Box>
                        </Skeleton>
                        <Box>
                            <Text fontSize={"lg"} fontWeight={"bold"}>Sections:</Text>
                        {Array.from({ length: sectionCount}).map((_,index) => {
                            return (
                                <Box
                                    key={index}
                                    _hover={{
                                        cursor: "pointer",
                                        backgroundColor: "gray.300"
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
                            )
                        })}
                        </Box>
                    </Stack>
                </Box>
                <Box
                    width={"100%"}
                    height={"95vh"}
                >
                    <CourseContent
                        courseAddress={courseAddress as string}
                        sectionId={selectedSection}
                    />
                </Box>
            </Flex>
        </Container>
    )
};