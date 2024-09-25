import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import dynamic from 'next/dynamic';

// Dynamically import MapLeaflet to disable SSR
const MapLeaflet = dynamic(() => import('../MapLeaflet/MapLeaflet'), { ssr: false });

interface FullMapProp {
  setIsMapShowFull: Dispatch<SetStateAction<boolean>>;
}

const MapLeafletFull = ({ setIsMapShowFull }: FullMapProp) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure the component is mounted on the client side
  }, []);

  if (!isMounted) {
    return null; // Return null until the component is mounted
  }

  return (
    <section className="fixed top-0 bg-black bg-opacity-70 min-h-screen z-50 w-full">
      <div className="p-4">
        <div className="absolute right-8 top-8 hover:text-primary-color text-red-400 transition duration-300 z-50">
          <button
            className="p-2 bg-white shadow-xl rounded-full"
            onClick={() => setIsMapShowFull(false)}
          >
            <RxCross2 className="h-6 w-6" />
          </button>
        </div>
        <MapLeaflet height="h-[95vh] w-full" />
      </div>
    </section>
  );
};

export default MapLeafletFull;