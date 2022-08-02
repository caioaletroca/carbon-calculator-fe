import { Box, Tabs, Tab } from "@mui/material";
import Header from "commons/Header";
import { Content, Page, View } from "commons/Layout";
import React from "react";

export default function CalculatorPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Page>
            <Header />
            <View>
                <Content>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        </Tabs>
                    </Box>
                    {/* <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel> */}
                </Box>
                </Content>
            </View>
        </Page>
    )
}