import Hero from "@/components/unique/Hero/Hero";
import OurServices from "@/components/unique/OurServices/OurServices";
import LectureSheets from "@/components/unique/LectureSheets/LectureSheets";
import StationeriesSection from "@/components/unique/StationeriesSection/StationeriesSection";
import FaqSection from "@/components/unique/FaqSection/FaqSection";
import ContactSection from "@/components/unique/ContactSection/ContactSection";
import BookSection from './../components/shared/BookSection/BookSection';

const Home = () => {
  return (
    <>
      <Hero />
      <OurServices />
      <BookSection title="Popular" actionText="Academic Books" category="Academic" />
      <LectureSheets />
      <StationeriesSection />
      <BookSection title="Explore" actionText="Non-Fictional Books" category="Non-Fiction" />
      <BookSection title="Explore" actionText="Fictional Books" category="Fiction" />
      <FaqSection />
      <ContactSection />
    </>
  );
};
export default Home;
