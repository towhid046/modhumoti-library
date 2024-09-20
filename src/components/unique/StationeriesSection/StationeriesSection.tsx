import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import Image from "next/image";
const stationeries = [
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/4032977/pexels-photo-4032977.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Paper",
    description: "A high-quality pencil for drawing and sketching.",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/159519/back-to-school-paper-colored-paper-stationery-159519.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Colored Paper",
    description:
      "Vibrant colored papers perfect for crafting and school projects.",
  },
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/159497/school-notebook-binders-notepad-159497.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Khata Diary",
    description:
      "A simple khata for writing down notes or maintaining a journal.",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/220502/pexels-photo-220502.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Pencil",
    description:
      "Smooth-writing pen for daily use, perfect for students and professionals.",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/53874/pexels-photo-53874.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Marker",
    description: "Bold marker for writing on whiteboards and other surfaces.",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/207665/pexels-photo-207665.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Mix",
    description: "Standard paper for writing, printing, or making notes.",
  },
];

const StationeriesSection = () => {
  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader
        title="Essential"
        actionText="Stationeries"
        urlLabel="View More"
        url="/stationeries"
      />
      <div className="grid grid-cols-2 gap-5 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3">
        {stationeries?.map((stationary) => (
          <div key={stationary?.id} className="flex flex-col gap-4 items-center justify-center">
            <figure className="border rounded-full  hover:border-primary-color cursor-pointer hover:shadow-lg duration-500 transition">
             <div className="border-[24px] rounded-full flex items-center justify-center">
             <Image className='rounded-full h-32 w-32 object-cover ' width={100} height={100} src={stationary.image} alt={""} />
             </div>
            </figure>
            <div>
              <h2 className="text-lg font-semibold">{stationary.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default StationeriesSection;
