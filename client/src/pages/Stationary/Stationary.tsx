import useScrollToTop from '../../hooks/useScrollToTop';
import PageHeader from './../../components/shared/PageHeader/PageHeader';
// import Pagination from './../../components/unique/Pagination/Pagination';
const stationeries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const image = `https://images.pexels.com/photos/254717/pexels-photo-254717.jpeg?auto=compress&cs=tinysrgb&w=600`;
const Stationary = () => {
    useScrollToTop()
    return (
        <>
            <PageHeader title="Stationeries" url="/stationeries" />
            <section className="container mx-auto px-4 mb-16">
                <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
                    {stationeries?.map((stationary) => (
                        <div key={stationary} className="border rounded-md p-4 space-y-3">
                            <figure>
                                <img
                                    width={100}
                                    height={100}
                                    src={image}
                                    alt="Image"
                                    className="object-cover w-full rounded-md"
                                />
                            </figure>
                            <div className="space-y-.5">
                                <div className='flex justify-between flex-warp gap-1'>
                                    <h2 className="text-2xl font-bold">
                                        Pencil
                                    </h2>
                                    <span className="text-xs font-normal bg-green-300 py-[3px] px-2 text-white flex items-center justify-center rounded-full ">2 pics</span>
                                </div>
                                <h3 className="text-lg font-semibold text-primary-color">
                                    Price: 15 BDT
                                </h3>
                                <p>One pics pen 5 Tk</p>
                            </div>
                            {/* <Button customClass="w-full">Add to Cart</Button> */}
                        </div>
                    ))}
                </div>
                <div>
                    {/* <Pagination /> */}
                </div>
            </section>
        </>
    );
};

export default Stationary;
