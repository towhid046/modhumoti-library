'use client'
import CartItem from "../../../unique/CartItem/CartItem";
// import { BookIdContext } from "@/providers/BookInfoProvider";
// import { useContext, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
const bookIds = [1, 2, 3, 4,]

const Cart = () => {
  // const { bookIds, isCartShow, setIsCartShow } = useContext(BookIdContext)
  // useEffect(() => { }, [bookIds])
  const isCartShow = false

  return (
    <>
      <div className="relative z-10">
        <div className="indicator mt-2">
          <IoCartOutline className="text-2xl cursor-pointer" />
          <span className="indicator-item badge badge-secondary">{bookIds.length}</span>
        </div>
      </div>
      {isCartShow && <CartItem />}
    </>
  );
};

export default Cart;
