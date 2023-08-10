import { NextPage } from "next";
import NavigationHeader from "../components/NavigationHeader";
import Cta1 from "../components/CallToActionWithAnnotation";
import Features1 from "../components/FeaturesWithImage";
import GridList from "../components/GridList";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Blobshape from "../components/Blobshape";

//... other imports ...

const Home: NextPage = () => {
  return (
    <div>
      <div>
        <Cta1 />
        <Features1 />
        <GridList />
        <Contact></Contact>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
