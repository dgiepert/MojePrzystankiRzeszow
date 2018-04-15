import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <Navbar>
            <Nav bsStyle="tabs">
                <NavItem eventKey={1} href="/">
                    <NavLink to="/">Główna</NavLink>
                </NavItem>
                <NavItem eventKey={1} href="/routes">
                    <NavLink to="/routes">Linie</NavLink>
                </NavItem>
                <NavItem eventKey={2} href="/busstops">
                    <NavLink to="/busstops">Przystanki</NavLink>
                </NavItem>
                <NavItem eventKey={3} href="/streets">
                    <NavLink to="/streets">Ulice</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
      );
    }
  }

export default Header