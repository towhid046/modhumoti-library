import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useToGetPublicData = <T,>(url: string) => {
    const axiosPublic = useAxiosPublic();

    const { data, isLoading, refetch, error } = useQuery<T>({
        queryKey: [url], // Unique query key
        queryFn: async () => {
            const response = await axiosPublic.get<T>(url);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
        refetchOnWindowFocus: false, // Prevent refetching when switching tabs
    });

    return { data, isLoading, refetch, error };
};

export default useToGetPublicData;
