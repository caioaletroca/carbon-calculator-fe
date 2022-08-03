import { Outlet } from "react-router-dom";
import { Content, Page, View } from "commons/Layout";
import Header from "./Header";
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