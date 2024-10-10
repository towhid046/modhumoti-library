'use client'
import useBookIds from "@/hooks/useBookIds";
import { IoCartOutline } from "react-icons/io5";
const Cart = () => {
  const { bookIds } = useBookIds()

  return (
    <div className="relative z-10">
      <div className="indicator mt-2">
        <IoCartOutline className="text-2xl cursor-pointer" />
        <span className="indicator-item badge badge-secondary">{bookIds.length}</span>
      </div>
    </div>
  );
};

export default Cart;
