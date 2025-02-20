import DashboardNavbar from '../components/shared/DashboardNavbar/DashboardNavbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {

    return (
        <div className='flex mx-auto'>
            <div className='w-72'>
                <DashboardNavbar />
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout
