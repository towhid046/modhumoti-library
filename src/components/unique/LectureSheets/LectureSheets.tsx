import Button from "@/components/shared/Button/Button";
import YouTubeEmbed from "@/components/shared/YouTubeEmbed/YouTubeEmbed";
import SectionHeader  from '@/components/shared/SectionHeader/SectionHeader';

const LectureSheets = () => {
  return (
    <section className="container mx-auto px-4">
      <SectionHeader
        title="Need A"
        actionText='Lecture Sheets?'
        urlLabel='Order Now'
        url='/lecture_sheet_order_page'
      />
      <div className="flex mb-24 items-center md:gap-12 gap-6 flex-col lg:flex-row">
        <div className="lg:flex-1 space-y-5">
          <h2 className="text-gray-700 font-semibold text-2xl">How to order lecture sheet?</h2>
          <div>
            <p className="text-gray-500 text-justify">
              This video demonstrate how you can simply order a lecture sheet. Frist click on the <b>Order Now </b>
              button and the select your department, year and the teacher sheet number
              then Confirm an order. The authority of Modhumoti will get your
              order and they will ready your sheets. That simple..
            </p>
          </div>
          <Button>Order Now</Button>
        </div>
        <div className="lg:flex-1 w-full">
          <YouTubeEmbed videoId="r9WNlxEsNDo" />
        </div>
      </div>
    </section>
  );
};

export default LectureSheets;
