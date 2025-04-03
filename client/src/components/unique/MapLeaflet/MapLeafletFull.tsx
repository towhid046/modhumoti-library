import { Dispatch, SetStateAction } from "react";
import MapLeaflet from "./../MapLeaflet/MapLeaflet";
import { RxCross2 } from "react-icons/rx";
interface FullMapProp {
    setIsMapShowFull: Dispatch<SetStateAction<boolean>>;
}
const MapLeafletFull = ({ setIsMapShowFull }: FullMapProp) => {
    return (
        <section className="fixed top-0 bg-black bg-opacity-70 min-h-screen z-50 w-full ">
            <div className="p-4 ">
                <div className="absolute right-8 top-8 text-primary-color hover:text-red-400 transition duration-300  z-50">
                    <button
                        className="p-2 bg-white shadow-xl rounded-full"
                        onClick={() => setIsMapShowFull(false)}
                    >
                        <RxCross2 className="h-6 w-6 color " />
                    </button>
                </div>
                <MapLeaflet className="h-[95vh] w-full" />
            </div>
        </section>
    );
};

export default MapLeafletFull;