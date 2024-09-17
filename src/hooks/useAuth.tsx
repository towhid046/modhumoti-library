import { auth } from "@/auth";
const useAuth = () => {
  const useSession = async () => {
    const session = await auth();
    return session;
  };
  return useSession();
};

export default useAuth;
