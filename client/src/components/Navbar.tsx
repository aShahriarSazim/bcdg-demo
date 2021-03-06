import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Box, Text} from "@chakra-ui/react";
import {useAppSelector} from "../store/hooks";

const Navbar: FC = () => {
    const auth = useAppSelector(state => state.auth);
    return (
        <Box px="20px" className="navbar" bg="blackAlpha.700" h="70px" display="flex" alignItems="center" justifyContent="space-between" color={"white"}>
            <div className="navbarHeader">
                <Text fontSize="25px" fontWeight="bold">
                    <Link to="/">Games Hive</Link>
                </Text>
            </div>
            <Box  className="navbarLinks" display="flex" columnGap="20px" >

                <Text><Link to="/products">All Products</Link></Text>

                {auth.isAuthenticated ?
                    <>
                        <Text><Link to="/products/my">My Products</Link></Text>
                        <Text><Link to="/logout">Logout</Link></Text>
                    </>
                    :
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
