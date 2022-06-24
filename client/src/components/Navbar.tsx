import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Box, Text} from "@chakra-ui/react";

const Navbar: FC = () => {
    return (
        <Box px="20px" className="navbar" bg="green.200" h="70px" display="flex" alignItems="center" justifyContent="space-between">
            <div className="navbarHeader">
                <Text fontSize="25px" fontWeight="bold">
                    <Link to="/">Teebay</Link>
                </Text>
            </div>
            <Box w="400px" className="navbarLinks" display="flex" justifyContent="space-between">
                <Text><Link to="/my-products">My Products</Link></Text>
                <Text><Link to="/login">Login</Link></Text>
                <Text><Link to="/register">Register</Link></Text>
            </Box>
        </Box>
    )
}

export default Navbar;