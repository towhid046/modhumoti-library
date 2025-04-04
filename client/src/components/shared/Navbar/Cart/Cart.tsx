import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import useCart from "../../../../hooks/useCart";

const Cart = () => {
  const { bookIds, setIsCartShow } = useCart()
  useEffect(() => { }, [bookIds])

  return (
    <div onClick={() => setIsCartShow(true)} className="relative z-10">
      <div className="indicator mt-2">
        <IoCartOutline className="text-2xl cursor-pointer" />
        <span className="indicator-item badge badge-secondary">{bookIds.length}</span>
      </div>
    </div>
  );
};

export default Cart;
