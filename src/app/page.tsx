import Hero from "@/components/unique/Hero/Hero";
import PopularAcademicBooks from "@/components/unique/PopularAcademicBooks/PopularAcademicBooks";
import OurServices from "@/components/unique/OurServices/OurServices";
import LectureSheets from "@/components/unique/LectureSheets/LectureSheets";
import StationeriesSection from "@/components/unique/StationeriesSection/StationeriesSection";
import NonFictionalBooks from "@/components/unique/NonFictionalBooks/NonFictionalBooks";
import FictionalBooks from "@/components/unique/FictionalBooks/FictionalBooks";
import FaqSection from "@/components/unique/FaqSection/FaqSection";
import ContactSection from "@/components/unique/ContactSection/ContactSection";
import BookSection from './../components/shared/BookSection/BookSection';

const Home = () => {
  return (
    <>
      <Hero />
      <OurServices />
      <BookSection title="Popular" actionText="Academic Books"/>
      <LectureSheets />
      <StationeriesSection />
      <BookSection title="Explore" actionText="Non-Fictional Books"/>
      <BookSection title="Explore" actionText="Fictional Books"/>
      <FaqSection />
      <ContactSection /> 
    </>
  );
};
export default Home;
