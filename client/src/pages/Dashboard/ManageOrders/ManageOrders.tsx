
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const navlinks = [
    { title: 'Ordered Books', path: '/dashboard/manage-orders' },
    { title: 'Ordered Sheets', path: '/dashboard/manage-orders/ordered-sheets' },
]
const ManageOrders = () => {

    const path = useLocation().pathname;
    return (
        <>
            <header className='sticky top-0 z-50'>
                <nav className='w-full bg-base-200 pt-8 border-b-[1.5px] border-primary-color border-opacity-50'>
                    <ul className='flex items-center justify-center gap-5 bg-base-200 py-1'>
                        {navlinks.map((link) => (
                            <li key={link.path}>
                                <NavLink to={link.path} className={`px-3 py-2 ${path === link.path ? 'bg-white text-primary-color font-semibold rounded-t-md border-[1.8px] border-b-0 border-primary-color border-opacity-50' : 'text-black'}`}>{link.title}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
};

export default ManageOrders