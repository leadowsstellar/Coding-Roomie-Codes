// Write some Code here

import { NavLink, Outlet } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div>
            <NavLink to="/dashboard/books">Books</NavLink>
            <NavLink to="/dashboard/products">Products</NavLink>
            <Outlet></Outlet>
        </div>
    );
}