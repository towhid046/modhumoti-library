import { useEffect } from "react";
import useCart from "../../../../hooks/useCart";
import CartItem from "../../../unique/CartItem/CartItem";
import { IoCartOutline } from "react-icons/io5";

const Cart = () => {
  const { bookIds, isCartShow, setIsCartShow } = useCart()
  useEffect(() => { }, [bookIds])

  return (
    <>
      <div onClick={() => setIsCartShow(true)} className="relative z-10">
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
