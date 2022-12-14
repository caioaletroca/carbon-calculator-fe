import { Card as MuiCard, CardContent, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
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
                    {data.map(({ id, name, value }, index, array) => (
                        <ListItem key={id} divider={index < array.length - 1}>
                            <ListItemText primary={name} />
                            <ListItemSecondaryAction>
                                <Typography>{value.toFixed(2)} kg CO<sub>2</sub> e/yr</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </MuiCard>
    )
}