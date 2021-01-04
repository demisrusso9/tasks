import React from 'react';

import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

const Header: React.FC = () => {
   return (
      <Navbar bg="dark" variant="dark" expand="lg">
         <Navbar.Brand href="/">Demis Russo - Tasks</Navbar.Brand>

         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
               <Nav.Link as={Link} to='/'>Home</Nav.Link>
               <Nav.Link as={Link} to='/tasks'>Tasks</Nav.Link>
               <Nav.Link as={Link} to='/tasks/add'>Add New Tasks</Nav.Link>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
}

export default Header;