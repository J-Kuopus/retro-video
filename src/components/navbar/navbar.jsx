import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';
import image from '../../img/rv-logo.png';

export function NavbarView() {
    let user = localStorage.getItem('user');

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token')
        } else {
            return false;
        }
    };


        return (
                <Navbar className="navbar" fixed="top" bg="dark" variant="dark" expand="md">
                        <Navbar.Brand as={Link}  to={'/'} className="navbar-brand">
                            <img
                                src={image}
                                width="70"
                                className="navbar-logo d-inline-block align-top"
                                alt="Retro Video logo"
                            />{' '}
                            Retro Video
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {isAuth() && (
                        <Navbar.Collapse className='ham-menu'>
                            <Nav>
                                <Nav.Link as={Link} to={`/users/${user}`}>Hello, {user}</Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>
                                <Nav.Link onClick={() => { 
                                 onLoggedOut(); 
                                }}>Logout
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    )}
                </Navbar>
        );
}
