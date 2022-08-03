import { Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Header from "commons/Header";
import { Page, View, Content } from "commons/Layout";
import { useReport } from "core/hooks/useReport";
import { CategoryService } from "core/queries";
import { Category, ReportData } from "core/types";
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import styles from './index.module.scss';

interface ReportDataByCategory {
    [x: string]: ReportData[]
}

export default function ReportPage() {
    const navigate = useNavigate();
    const { sum, data } = useReport();
    const { data: categories } = useQuery<Category[]>(['categories'], CategoryService.get);
    
    const usagesByCategory: ReportDataByCategory = React.useMemo(() => {
        return categories?.reduce((sum, category) => ({
            ...sum,
            [category.name]: data?.filter(usage => usage.category_id === category.id)
        }), {}) as ReportDataByCategory;
    }, [data, categories]);

    const handleBack = () => navigate(-1)
    
    return (
        <Page>
            <Header onBack={handleBack} />
            <View>
                <Content padding>
                    {
                        sum && data ?
                        <>
                            <Paper className={styles.title}>
                                <Typography variant="h5" gutterBottom>Report</Typography>
                                <Typography color="text.primary">Total CO<sub>2</sub> emission in a year is {sum.toFixed(2)} kg</Typography>
                            </Paper>
                            <Grid container spacing={2}>
                                {
                                    usagesByCategory &&
                                    Object.entries(usagesByCategory).map(([ category, data ], index) => (
                                        <Grid key={index} item xs={12} sm={6} md={4}>
                                            <Card category={category} data={data} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </> :
                        null
                    }
                </Content>
            </View>
        </Page>
    )
}