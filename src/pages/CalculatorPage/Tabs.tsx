import { Box, Tabs as MuiTab, Tab } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "core/queries";
import { Category } from "core/types";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Tabs() {
    const { pathname } = useLocation();
    const { category } = useParams();
    
    const navigate = useNavigate();
    const { data: categories, isLoading, isSuccess } = useQuery<Category[]>(['categories'], CategoryService.get);

    const handleChange = (e: React.SyntheticEvent, newValue: string) => {
        navigate(`/calculator/${newValue}`);
    }

    React.useEffect(() => {
        if(categories && pathname === '/calculator') {
            navigate(`/calculator/${categories?.[0].id}`)
        }
    }, [categories]);
    
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {
                isSuccess &&
                <MuiTab value={Number(category)} onChange={handleChange}>
                    {categories?.map(({ id, name }) => (
                        <Tab key={id} label={name} value={id} />
                    ))}
                </MuiTab>
            }
        </Box>
    )
}