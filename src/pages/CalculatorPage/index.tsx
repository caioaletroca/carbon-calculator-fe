import { Box } from "@mui/material";
import Header from "./Header";
import { Content, Page, View } from "commons/Layout";
import React from "react";
import { Outlet } from "react-router-dom";
import Tabs from './Tabs'

export default function CalculatorPage() {
    return (
        <Page>
            <Header />
            <View>
                <Content>
                    <Tabs />
                    <Outlet />
                </Content>
            </View>
        </Page>
    )
}