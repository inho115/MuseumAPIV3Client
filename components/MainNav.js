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

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function submitForm(e) {
    e.preventDefault();
    setIsExpanded(false);
    setSearchHistory((current) => [...current, `title=true&q=${searchField}`]);
    console.log(searchHistory);
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
              <Link href="/search" legacyBehavior passHref>
                <Nav.Link
                  onClick={toggleExpand}
                  active={router.pathname === "/search"}
                >
                  <span>Advanced Search</span>
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
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
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
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
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </Container>
  );
}
