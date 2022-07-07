import {FC} from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Home: FC = () => {
    return (
        <Box my={20} mx={20}>
            <Text textAlign={'center'} fontWeight={'bold'} fontSize={30}>Home Page</Text>

            <Text textAlign={'center'} mt={10}>Here are some Descriptions. You can add some introductory things here. Or some images too</Text>

            <Text textAlign={'center'} mt={10}>Here are some Descriptions. You can add some introductory things here</Text>

            <Text mt={10} textAlign={'center'}><Link to={'/products'}><Button colorScheme={'green'}>See All Products</Button></Link></Text>
        </Box>
    )
}

export default Home;
