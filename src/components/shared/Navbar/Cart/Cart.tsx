import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
const Cart = () => {
  return (
    <div className="relative">
      <Link className="inline-block" href={"/user_cart"}>
        <div className="indicator mt-2">
          <IoCartOutline className="text-2xl cursor-pointer" />
          <span className="indicator-item badge badge-secondary">0</span>
        </div>
      </Link>
    </div>
  );
};

export default Cart;
