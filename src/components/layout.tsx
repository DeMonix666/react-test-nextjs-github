import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Navbar, Nav, NavDropdown, Toast } from 'react-bootstrap';
import { Message, hideMessage } from 'app/reducer/messageSlice';

function Layout({ children }) {
    const dispatch = useAppDispatch();
    const message = useAppSelector(Message);

    useEffect(() => {

    }, [message]);

    return (
        <>
            <Head>
                <title>React - Technical Test</title>
            </Head>
            <main>
                <Container>
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <span className="nav-link"><Link href="/" >Home</Link></span>
                                    <span className="nav-link"><Link href="/about" >About Me</Link></span>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>                    
                    
                    <Toast onClose={() => dispatch(hideMessage({}))} show={message.show} delay={message.options.autoHideDuration} autohide style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 1000
                        }}
                    >
                        <Toast.Header>
                            <strong className="me-auto">{message.options.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{message.options.message}</Toast.Body>
                    </Toast>


                    {children}
                </Container>
            </main>
        </>
    )
}

export default Layout
