import Hero from "../components/unique/Hero/Hero";
import PopularAcademicBooks from "../components/unique/PopularAcademicBooks/PopularAcademicBooks";
import OurServices from "../components/unique/OurServices/OurServices";
import LectureSheets from "./../components/unique/LectureSheets/LectureSheets";
const Home = () => {
  return (
    <>
      <Hero />
      <OurServices />
      <PopularAcademicBooks />
      <LectureSheets />
    </>
  );
};
export default Home;
