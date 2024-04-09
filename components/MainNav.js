import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link"
import { Form, Button } from 'react-bootstrap'
import { useState } from "react";
import { useRouter } from 'next/router'
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
    const [search, setSearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter()
    let token = readToken();


    async function submitForm(e) {
        e.preventDefault(); // prevent the browser from automatically submitting the form
        if (search) {
            setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 
            setIsExpanded(false)
            router.push(`/artwork?title=true&q=${search}`);
        }   
    }

    function logout() {
        setIsExpanded(false)
        removeToken()
        router.push(`/login`);
    }

    return (
    <>
        <Navbar style={{ float: "right" }} expand={isExpanded} expanded={isExpanded} className="navbar-dark bg-primary fixed-top">
          <Container>
            <Navbar.Brand>Ron Agady</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => { setIsExpanded(!isExpanded) }}/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={() => { setIsExpanded(false) }}>Home</Nav.Link></Link>
                    {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={() => { setIsExpanded(false) }}>Advanced Search</Nav.Link></Link>}
                </Nav>
                {!token && <Nav className="me-auto">
                    <Link href="/register" passHref legacyBehavior><Nav.Link>Register</Nav.Link></Link>
                    <Link href="/login" passHref legacyBehavior><Nav.Link>Login</Nav.Link></Link></Nav>}
                {token && <>
                    <Form className="d-flex" onSubmit={submitForm}>
                        <Form.Control value={search} onChange={(e) => setSearch(e.target.value)} />         
                        <Button type="submit" variant="outline-success" style={{ "background-color": "#24C279" }}>Search</Button>
                    </Form>
                    <Nav className="me-auto">
                        <NavDropdown title={token.userName} id="basic-nav-dropdown">
                        <NavDropdown.Item active={router.pathname === "/favourites"} href="#action/3.1"><Link href="/favourites" passHref legacyBehavior><Nav.Link onClick={() => { setIsExpanded(false) }}><font color="#000000">Favourites</font></Nav.Link></Link></NavDropdown.Item>
                        <NavDropdown.Item active={router.pathname === "/history"} href="#action/3.2"><Link href="/history" passHref legacyBehavior><Nav.Link onClick={() => { setIsExpanded(false) }}><font color="#000000">Search History</font></Nav.Link></Link></NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav></>}
            </Navbar.Collapse>
          </Container>
        </Navbar>
    <br/><br/></>
    );
}