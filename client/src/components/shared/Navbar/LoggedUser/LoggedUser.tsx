import userProfile from "@/assets/images/profile_image.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "./../../LoadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const LoggedUser = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    if (user?.photoURL) {
      setProfilePic(user.photoURL);
    }
  }, [user?.photoURL]);

  // const router = useRouter();
  const handleLogout = async () => {
    setIsLoading(true);
    await logout()
    await axiosPublic.post("/users/logout")
    navigate("/");
    toast.success("Logout success!");
    if (!user) {
      setIsLoading(false);
    }
  };


  if (isLoading) return <LoadingSpinner height="!5vh" />;
  return (
    <div className="flex items-center gap-4">
      <button className="h-10 w-10" onClick={() => setIsOpen(true)}>
        <img
          height={45}
          width={45}
          src={profilePic || userProfile}
          className="object-cover w-[38px] h-[38px] rounded-full border-2 hover:border-blue-200 transition duration-300"
          alt={"User Image"}
        />
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed right-0 top-0 w-full min-h-screen"
        >
          <div className="relative container mx-auto px-4">
            <ul
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-md px-8 py-4 space-y-3 z-50  text-[17px] absolute right-4 top-16"
            >
              <li>Hi, {user?.displayName}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-400 hover:text-red-600 transition duration-300"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedUser;
