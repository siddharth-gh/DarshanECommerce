import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const toggleCircle = () => {
        setIsExpanded(!isExpanded);
        document.body.style.color = 'white';
    };

    const handleLogout = () => {
        localStorage.setItem('token', '');
        localStorage.setItem('name', '');
        toast.success('Logging out...');
        props.setName('');
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/searchResults?q=${encodeURIComponent(searchQuery)}`);
        } else {
            toast.warning('Please enter a search term.');
        }
    };

    const toggleUserMenu = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <>
            <div className={styles.Navbar}>
                <Link to="./">
                    <span className={styles.logo}>
                        <p>Darshan Enterprises</p>
                        <Icon icon="fontisto:opencart" width="1.5em" height="1.5em" />
                    </span>
                </Link>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Enter item to search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Icon
                        icon="ic:round-search"
                        width="1.2em"
                        height="1.2em"
                        onClick={handleSearch}
                    />
                </div>

                {props.name && (
                    <span className={styles.cart} onClick={props.toggleCart}>
                        <p>{props.cartCount}</p>
                        <Icon icon="f7:cart" width="1.5em" height="1.5em" />
                    </span>
                )}
                {props.name ? (
                    <>
                        <div className={styles.userMenu}>
                            <p onClick={toggleUserMenu}>
                                Hello,{' '}
                                {props.name[0].toUpperCase() +
                                    props.name.slice(1).split(' ')[0]}{' '}
                                <Icon icon="bxs:down-arrow" width="1.2em" height="1.2em" style={{ color: "orange" }}></Icon>
                            </p>
                            {isExpanded && (
                                <div className={styles.menu}>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>

                    </>
                ) : (
                    <div className={styles.login}>
                        <Link to="./login">Login</Link>
                    </div>
                )}



                <div className={styles.darkmode} onClick={props.toggleTheme}>
                    {props.theme === 'light' ? (
                        <img
                            src="/toDark.png"
                            style={{ height: '30px', filter: 'invert(1)' }}
                            alt="themeToggler"
                            className={
                                props.theme === 'light'
                                    ? styles.remove_bookmark
                                    : styles.remove_bookmark_unactive
                            }
                        />
                    ) : (
                        <img
                            src="/toLight.png"
                            style={{ height: '30px', filter: 'invert(1)' }}
                            alt="themeToggler"
                            className={
                                props.theme === 'light'
                                    ? styles.add_bookmark
                                    : styles.add_bookmark_unactive
                            }
                        />
                    )}
                </div>
            </div>
        </>
    );
}
