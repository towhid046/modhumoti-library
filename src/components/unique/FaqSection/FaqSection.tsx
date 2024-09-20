import faqs from "./faqData";
import Image from "next/image";
// import faqImg from '../../../assets/images/faq.png'
import faqImg from '../../../assets/images/faq.jpeg'
import SectionHeader from './../../shared/SectionHeader/SectionHeader';
const FaqSection = () => {
  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader url="/contact"  urlLabel="Any more Question" title="Popular" actionText="FAQ"/>
      <div className="flex justify-between flex-col lg:flex-row items-center lg:gap-10">
        <figure className='flex-1 flex justify-center items-center'>
          <Image
            width={undefined}
            height={undefined}
            className="max-w-96 rounded-xl object-cover"
            src={faqImg}
            alt="Faq img"
          />
        </figure>
        <div className="flex-1">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="collapse collapse-arrow shadow-md rounded-md"
            >
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-md font-bold text-custom-black ">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-custom-gray text-base font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
