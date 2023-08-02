import {
  Nav,
  Navbar,
  Container,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  let token = readToken();
  const router = useRouter();
  const [searchField, setSearchField] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  async function submitForm(e) {
    e.preventDefault();
    setIsExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  function toggleExpand() {
    setIsExpanded(isExpanded != true);
  }

  return (
    <Container>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        className="fixed-top navbar-expand-lg bg-dark navbar-dark"
      >
        <Container>
          <Navbar.Brand>
            <span>IN HO HAN</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleExpand}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior passHref>
                <Nav.Link
                  onClick={toggleExpand}
                  active={router.pathname === "/"}
                >
                  <span>Home</span>
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" legacyBehavior passHref>
                  <Nav.Link
                    onClick={toggleExpand}
                    active={router.pathname === "/search"}
                  >
                    <span>Advanced Search</span>
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            <Nav className="ml-auto">
              {!token && (
                <Link href="/register" legacyBehavior passHref>
                  <Nav.Link
                    onClick={toggleExpand}
                    active={router.pathname === "/register"}
                  >
                    <span>Register</span>
                  </Nav.Link>
                </Link>
              )}
              {!token && (
                <Link href="/login" legacyBehavior passHref>
                  <Nav.Link
                    onClick={toggleExpand}
                    active={router.pathname === "/login"}
                  >
                    <span>Login</span>
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form onSubmit={submitForm} className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  name="searchField"
                  aria-label="Search"
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button variant="success" type="submit">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            {token && (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" legacyBehavior passHref>
                    <NavDropdown.Item
                      onClick={toggleExpand}
                      active={router.pathname === "/favourites"}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" legacyBehavior passHref>
                    <NavDropdown.Item
                      onClick={toggleExpand}
                      active={router.pathname === "/history"}
                    >
                      History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </Container>
  );
}
