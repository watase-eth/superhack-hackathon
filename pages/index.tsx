import { Container } from "@chakra-ui/react";
import { NextPage } from "next";
import { CourseCard } from "../components/course-card";
import { TEST_COURSE_ADDRESS } from "../constants/contractAddresses";

const Home: NextPage = () => {
  return (
    <Container maxWidth={"1440px"}>
      <CourseCard courseContractAddress={TEST_COURSE_ADDRESS} />
    </Container>
  );
};

export default Home;
