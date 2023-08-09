import { Container } from "@chakra-ui/react";
import { NextPage } from "next";
import { CourseCard } from "../components/course-card";
import { TEST_COURSE_ADDRESS_2 } from "../constants/contractAddresses";
import { ConnectWallet } from "@thirdweb-dev/react";

const Home: NextPage = () => {
  return (
    <Container maxWidth={"1440px"}>
      <ConnectWallet />
      <CourseCard courseContractAddress={TEST_COURSE_ADDRESS_2} />
    </Container>
  );
};

export default Home;
