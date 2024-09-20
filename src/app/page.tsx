import Hero from "../components/unique/Hero/Hero";
import PopularAcademicBooks from "../components/unique/PopularAcademicBooks/PopularAcademicBooks";
import OurServices from "../components/unique/OurServices/OurServices";
import LectureSheets from "./../components/unique/LectureSheets/LectureSheets";
import StationeriesSection from "./../components/unique/StationeriesSection/StationeriesSection";
const Home = () => {
  return (
    <>
      <Hero />
      <OurServices />
      <PopularAcademicBooks />
      <LectureSheets />
      <StationeriesSection/>
    </>
  );
};
export default Home;
