import { NextPage } from "next";
import NavigationHeader from "../components/NavigationHeader";
import Cta1 from "../components/CallToActionWithAnnotation";
import Features1 from "../components/FeaturesWithImage";
import GridList from "../components/GridList";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Blobshape from "../components/Blobshape";
import { useAddress } from "@thirdweb-dev/react";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { CourseCard } from "../components/course-card";
import { TEST_COURSE_ADDRESS } from "../constants/contractAddresses";

//... other imports ...

const Home: NextPage = () => {
  const address = useAddress();

  return (
    <>
      {address ? (
        <Container minW={"100%"} p={10}>
            <Heading>Courses:</Heading>
            <SimpleGrid columns={4} spacing={10}>
                <CourseCard courseContractAddress={TEST_COURSE_ADDRESS} />
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
