import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Fab, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "core/queries";
import React from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";
import { useCarbonData } from "core/hooks";
import styles from './Content.module.scss';
import EmptyMessage from "./EmptyMessage";

export default function CalculatorPageContent() {
    const { category } = useParams();
    const { data: carbonData, addEmpty } = useCarbonData();
    const { data: categories } = useQuery(['categories'], CategoryService.get);
    const { data: usages } = useQuery(['usages', category], () => CategoryService.getUsages(Number(category)), {
        enabled: !!categories
    });

    return (
        <>
            <div className={styles.wrapper}>
                {
                    carbonData.length === 0 ?
                    <EmptyMessage /> :
                    carbonData.map((carbon, index) => (
                        <Item key={index} id={index} {...carbon} usages={usages} />
                    ))
                }
            </div>
            <Box className={styles.fabButton}>
                <Tooltip title='Add new usage'>
                    <Fab
                        color='primary'
                        onClick={() => addEmpty()}>
                        <FontAwesomeIcon icon={faPlus} size="2x" />
                    </Fab>
                </Tooltip>
            </Box>
        </>
    )
}