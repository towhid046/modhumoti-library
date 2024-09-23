import PopularAcademicBooks from "./../../components/unique/PopularAcademicBooks/PopularAcademicBooks";
import FictionalBooks from "./../../components/unique/FictionalBooks/FictionalBooks";
import NonFictionalBooks from "./../../components/unique/NonFictionalBooks/NonFictionalBooks";

const BooksPage = () => {
  return (
    <section>
      <PopularAcademicBooks />
      <FictionalBooks />
      <NonFictionalBooks />
    </section>
  );
};

export default BooksPage;
