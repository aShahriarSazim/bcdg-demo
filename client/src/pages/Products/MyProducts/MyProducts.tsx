import {FC} from "react";
import {Tabs, TabList, TabPanels, Tab, TabPanel, Box} from "@chakra-ui/react";
import UserProducts from "./components/UserProducts";
import UserBoughtProducts from "./components/UserBoughtProducts";
import UserSoldProducts from "./components/UserSoldProducts";
import UserRentProducts from "./components/UserRentProducts";
import UserLentProducts from "./components/UserLentProducts";

const MyProducts: FC = () => {
    return (
        <Box mt={5}>
            <Tabs variant={'enclosed'} isLazy={true}>
                <TabList>
                    <Tab>My Products</Tab>
                    <Tab>Bought Products</Tab>
                    <Tab>Sold Products</Tab>
                    <Tab>Rented Products</Tab>
                    <Tab>Lent Products</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UserProducts></UserProducts>
                    </TabPanel>
                    <TabPanel>
                        <UserBoughtProducts></UserBoughtProducts>
                    </TabPanel>
                    <TabPanel>
                        <UserSoldProducts></UserSoldProducts>
                    </TabPanel>
                    <TabPanel>
                        <UserRentProducts></UserRentProducts>
                    </TabPanel>
                    <TabPanel>
                        <UserLentProducts></UserLentProducts>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
export default MyProducts;
