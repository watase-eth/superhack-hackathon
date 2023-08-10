import { NextPage } from "next";
import NavigationHeader from "../components/NavigationHeader";
import Cta1 from "../components/CallToActionWithAnnotation";
import Features1 from "../components/FeaturesWithImage";
import GridList from "../components/GridList";
import Contact from "../components/Contact";
import { useAddress } from "@thirdweb-dev/react";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { CourseCard } from "../components/course-card";
import { MINTED_COURSE_CONTRACTS } from "../constants/contractAddresses";

//... other imports ...

const Home: NextPage = () => {
  const address = useAddress();

  return (
    <>
      {address ? (
        <Container minW={"100%"} p={10}>
            <Heading>Courses:</Heading>
            <SimpleGrid columns={3} spacing={10}>
                {Array.from({ length: MINTED_COURSE_CONTRACTS.length }, (_, i) => {
                    return <CourseCard key={i} courseContractAddress={MINTED_COURSE_CONTRACTS[i]} />
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
