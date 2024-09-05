import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className='header'>
            <div className='container'>
                <div className='header-box'>
                    <div className='logo'>
                        <Link to="/">Test Task</Link>
                    </div>
                    <div className='navbar'>
                        <NavLink
                            className={({ isActive }) => (isActive ? "link-active" : "")}
                            to="/products">Карточки</NavLink>
                        <NavLink 
                            className={({ isActive }) => (isActive ? "link-active" : "")}
                            to="/create-product">Создать карточку</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;