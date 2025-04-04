import faqImg from '@/assets/images/faq.jpeg';
import SectionHeader from './../../shared/SectionHeader/SectionHeader';
import faqs from "./faqData";
import Reveal from '../../shared/Reveal/Reveal';
const FaqSection = () => {
  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader url="" urlLabel="" title="Popular" actionText="FAQ" />
      <div className="flex justify-between flex-col lg:flex-row items-center lg:gap-10">
        <Reveal className='flex-1 flex justify-center items-center'>
          <img
            className="md:max-w-96 max-w-80 rounded-xl object-cover"
            src={faqImg}
            alt="Faq img"
          />
        </Reveal>

        <Reveal className="flex-1">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="collapse collapse-arrow shadow-md rounded-md"
            >
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-bold text-custom-black ">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-custom-gray font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default FaqSection;
