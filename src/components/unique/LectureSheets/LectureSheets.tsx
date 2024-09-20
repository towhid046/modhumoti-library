import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import Button from "@/components/shared/Button/Button";
import YouTubeEmbed from "@/components/shared/YouTubeEmbed/YouTubeEmbed";

const LectureSheets = () => {
  return (
    <section className="flex mb-24 items-center md:gap-12 gap-6 flex-col lg:flex-row container mx-auto px-4">
      <div className="lg:flex-1 space-y-5">
        <SectionHeading
          customClass="text-left"
          title="Need A Lecture sheet?"
          description="See the video, How to order a Lecture sheet?"
        />
        <div>
          <p className="text-gray-500 text-justify">
            How do you order a lecture sheet? Simple click on the Order Now
            button and the select your department, year and the teacher sheet
            then Confirm an order. The authority of Modhumoti will get your
            order and they will ready your sheets. That simple. Thank you!
          </p>
        </div>
        <Button>Order Now</Button>
      </div>
      <div className="lg:flex-1 w-full">
        <YouTubeEmbed videoId='r9WNlxEsNDo'/>
      </div>
    </section>
  );
};

export default LectureSheets;
