import BookSection from '../../components/shared/BookSection/BookSection'
import ContactSection from '../../components/unique/ContactSection/ContactSection'
import FaqSection from '../../components/unique/FaqSection/FaqSection'
import Hero from '../../components/unique/Hero/Hero'
import LectureSheets from '../../components/unique/LectureSheets/LectureSheets'
import OurServices from '../../components/unique/OurServices/OurServices'
import StationeriesSection from '../../components/unique/StationeriesSection/StationeriesSection'
import useScrollToTop from '../../hooks/useScrollToTop'

const Home = () => {
    useScrollToTop()

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
    )
}

export default Home