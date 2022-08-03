import { Card as MuiCard, CardContent, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography } from "@mui/material";
import { ReportData } from "core/types";
import styles from './Card.module.scss';

interface CardProps {
    category: string;
    data: ReportData[];
}

export default function Card({ category, data }: CardProps) {
    const categoryName = category[0].toUpperCase() + category.slice(1);

    if(data.length === 0) return null;

    return (
        <MuiCard className={styles.card}>
            <CardContent>
                <Typography color="text.secondary" gutterBottom>{categoryName}</Typography>
                <List>
                    {data.map(({ id, name, value }) => (
                        <ListItem key={id}>
                            <ListItemText primary={name} />
                            <ListItemSecondaryAction>
                                <Typography>{value.toFixed(2)} kg CO2e/yr</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </MuiCard>
    )
}