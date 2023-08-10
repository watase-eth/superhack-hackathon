import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { TEST_COURSE_ADDRESS } from "../constants/contractAddresses";
import { CourseCard } from "../components/course-card";

export default function CoursesPage() {
    
    return (
        <Container minW={"100%"} p={10}>
            <Heading>Courses:</Heading>
            <SimpleGrid columns={4} spacing={10}>
                <CourseCard courseContractAddress={TEST_COURSE_ADDRESS} />
            </SimpleGrid>
        </Container>
    )
};