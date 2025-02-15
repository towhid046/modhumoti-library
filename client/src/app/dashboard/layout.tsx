import DashboardNavbar from '@/components/shared/DashboardNavbar/DashboardNavbar';
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
    return (
        <div className='flex mx-auto px-2'>
            <div className='w-72'>
                <DashboardNavbar/>
            </div>
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
