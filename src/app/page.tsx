import Hero from "@/components/unique/Hero/Hero";
import PopularAcademicBooks from "@/components/unique/PopularAcademicBooks/PopularAcademicBooks";
import OurServices from "@/components/unique/OurServices/OurServices";
import LectureSheets from "@/components/unique/LectureSheets/LectureSheets";
import StationeriesSection from "@/components/unique/StationeriesSection/StationeriesSection";
import NonFictionalBooks from "@/components/unique/NonFictionalBooks/NonFictionalBooks";
import FictionalBooks from "@/components/unique/FictionalBooks/FictionalBooks";
import FaqSection from "@/components/unique/FaqSection/FaqSection";
const Home = () => {
  return (
    <>
      <Hero />
      <OurServices />
      <PopularAcademicBooks />
      <LectureSheets />
      <StationeriesSection/>
      <NonFictionalBooks/>
      <FictionalBooks/>
      <FaqSection/>
    </>
  );
};
export default Home;
