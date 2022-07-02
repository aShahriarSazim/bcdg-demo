import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Box, Text} from "@chakra-ui/react";
import {useAppSelector} from "../store/hooks";

const Navbar: FC = () => {
    const auth = useAppSelector(state => state.auth);
    return (
        <Box px="20px" className="navbar" bg="green.200" h="70px" display="flex" alignItems="center" justifyContent="space-between">
            <div className="navbarHeader">
                <Text fontSize="25px" fontWeight="bold">
                    <Link to="/">Teebay</Link>
                </Text>
            </div>
            <Box  className="navbarLinks" display="flex" columnGap="20px" >
                {auth.isAuthenticated &&
                    <>
                        <Text><Link to="/my-products">My Products</Link></Text>
                        <Text><Link to="/logout">Logout</Link></Text>
                    </>
                }
                {!auth.isAuthenticated &&
                    <>
                        <Text><Link to="/login">Login</Link></Text>
                        <Text><Link to="/register">Register</Link></Text>
                    </>
                }
            </Box>
        </Box>
    )
}

export default Navbar;
