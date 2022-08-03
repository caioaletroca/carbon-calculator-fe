import { Box, CircularProgress, Divider, Grid, IconButton, MenuItem, Paper, TextField } from "@mui/material";
import { UnitService } from "core/queries/unit";
import { useQuery } from "@tanstack/react-query";
import { CarbonEntity, Unit, Usage } from "core/types";
import React from "react";
import styles from './Item.module.scss';
import { useCarbonData } from "core/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

interface ItemProps extends CarbonEntity {
    id: number;
    usages?: Usage[];
}

export default function Item({
    id,
    value,
    unit_type,
    time_type,
    usage,
    usages
}: ItemProps) {
    const { category } = useParams();
    const { update, remove } = useCarbonData();
    const { data: time_types, isLoading: timeTypesLoading } = useQuery<Unit[]>(['units', 'time'], UnitService.getByType);
    const { data: units } = useQuery<Unit[]>(['units', usage?.unit_type], UnitService.getByType, {
        enabled: !!usage
    });

    const handleSelectUsage = (e: React.ChangeEvent<{ value: unknown }>) => {
        update(category, id, {
            usage: usages?.find(usage => usage.id === Number(e.target.value))
        });
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        update(category, id, { [e.target.name]: Number(e.target.value) });
    }

    const handleChange = (e: React.ChangeEvent<{ name: string, value: unknown }>) => {
        update(category, id, { [e.target.name]: e.target.value });
    }
    
    if(timeTypesLoading || !usages)
        return (
            <Paper className={styles.paper}>
                <div className={styles.loadingWrapper}>
                    <CircularProgress />
                </div>
            </Paper>
        );

    return (
        <Paper className={styles.paper}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        name='usage'
                        label='Type'
                        select
                        value={usage?.id.toString() || ''}
                        onChange={handleSelectUsage}
                        fullWidth
                        size="small">
                        {usages?.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>{name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {
                    usage &&
                    <>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                type='number'
                                name='value'
                                label='Usage'
                                value={value || ''}
                                onChange={handleValueChange}
                                size='small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={1}>
                            <TextField
                                name='unit_type'
                                label='Unit'
                                select
                                value={unit_type || ''}
                                onChange={handleChange}
                                size='small'
                                fullWidth>
                                <MenuItem disabled>Select an option...</MenuItem>
                                {units?.map(({ name }) => (
                                    <MenuItem key={name} value={name}>{name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                name='time_type'
                                label='Per'
                                select
                                value={time_type || ''}
                                onChange={handleChange}
                                size='small'
                                fullWidth>
                                <MenuItem disabled>Select an option...</MenuItem>
                                {time_types?.map(({ name }) => (
                                    <MenuItem key={name} value={name}>
                                        {name[0].toUpperCase() + name.slice(1)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </>
                }
                <Grid item xs>
                    <Box className={styles.removeBox}>
                        <IconButton
                            onClick={() => remove(category, id)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <Divider orientation="vertical" />
        </Paper>
    );
}
