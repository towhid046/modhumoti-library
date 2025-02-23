import useScrollToTop from '../../hooks/useScrollToTop';
import PageHeader from './../../components/shared/PageHeader/PageHeader';
import SheetOrderForm from './../../components/unique/SheetOrderForm/SheetOrderForm';

const Sheets = () => {
    useScrollToTop()
    return (
        <>
            <PageHeader title="Sheets" url="/sheets" />
            <section className="container mx-auto px-4">
                <div className="lg:py-12 py-6 max-w-5xl mx-auto ">
                    <h2 className="md:text-3xl text-xl font-bold text-center mb-1">
                        Order Your Lecture Sheet
                    </h2>
                    <p className='text-center mb-4'>Now it is easy to order lecture sheets. Fill up the form and Confirm Order</p>
                    <SheetOrderForm />
                </div>
            </section>
        </>
    );
};

export default Sheets;
