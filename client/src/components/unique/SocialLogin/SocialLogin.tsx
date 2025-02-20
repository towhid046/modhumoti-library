import { toast } from "react-toastify";
import googleIcon from '../../../assets/images/google-icon.png'
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast.success("Login success!")
      navigate('/')
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="w-full border-t border-gray-300" />
        <span className="px-3 text-gray-500">or</span>
        <hr className="w-full border-t border-gray-300" />
      </div>

      {/* Google Login Button */}
      <button
        type="submit"
        className="w-full flex items-center gap-4 justify-center bg-gray-800 hover:bg-gray-900 text-white py-2 rounded transition duration-300"
        onClick={handleGoogleLogin}
      >
        <img src={googleIcon} alt="Google icon" className="w-6 h-auto" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
