import { Link } from "react-router-dom";
import Button from "../../components/shared/Button/Button";

interface NotFoundProps {
    isAdmin?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ isAdmin = false }) => {
    return (
        <div className="h-[90vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-6">
                    Page Not Found
                </h2>
                <p className="text-gray-500 mb-8">
                    The page you are looking for might have been removed or is temporarily
                    unavailable.
                </p>
                <Button>
                    <Link to={isAdmin ? "/dashboard" : "/"}>Return Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
