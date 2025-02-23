import { useEffect } from "react";

const useScrollToTop = (id?: string | number) => {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [id]);
};

export default useScrollToTop;
