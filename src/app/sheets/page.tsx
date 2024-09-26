import PageHeader from "@/components/shared/PageHeader/PageHeader";
import SheetOrderForm from "@/components/unique/SheetOrderForm/SheetOrderForm";

const SheetsPage = () => {
  return (
    <>
      <PageHeader title="Sheets" url="/sheets" />
      <section className="container mx-auto px-4">
        <div className="lg:py-12 py-6 max-w-5xl mx-auto">
          <h2 className="md:text-3xl text-xl font-bold text-center mb-4">
            Order Your Lecture Sheet
          </h2>
          <SheetOrderForm />
        </div>
      </section>
    </>
  );
};

export default SheetsPage;
