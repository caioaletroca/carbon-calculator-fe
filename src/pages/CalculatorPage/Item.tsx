import { Box, Divider, Grid, IconButton, MenuItem, Paper, TextField } from "@mui/material";
import { UnitService } from "core/queries/unit";
import { useQuery } from "@tanstack/react-query";
import { CarbonData, Unit, Usage } from "core/types";
import React from "react";
import styles from './Item.module.scss';
import { useCarbonData } from "core/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ItemProps extends CarbonData {
    id: number;
    usages?: Usage[];
}

export default function Item({ id, usages }: ItemProps) {
    const { data: carbonData, update, remove } = useCarbonData();
    const { data: time_types } = useQuery<Unit[]>(['units', 'time'], UnitService.getByType);
    const { data: units } = useQuery<Unit[]>(['units', carbonData[id]?.usage?.unit_type], UnitService.getByType, {
        enabled: !!carbonData[id]?.usage
    });

    const handleSelectUsage = (e: React.ChangeEvent<{ value: unknown }>) => {
        update(id, {
            usage: usages?.find(usage => usage.id === Number(e.target.value))
        });
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        update(id, { [e.target.name]: Number(e.target.value) });
    }

    const handleChange = (e: React.ChangeEvent<{ name: string, value: unknown }>) => {
        update(id, { [e.target.name]: e.target.value });
    }

    return (
        <Paper className={styles.paper}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <TextField
                        name='usage'
                        label='Type'
                        select
                        value={carbonData[id]?.usage?.id.toString() || ''}
                        onChange={handleSelectUsage}
                        fullWidth
                        size="small">
                        {usages?.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>{name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {
                    carbonData[id]?.usage &&
                    <>
                        <Grid item xs={3}>
                            <TextField
                                type='number'
                                name='value'
                                label='Usage'
                                value={carbonData[id]?.value || ''}
                                onChange={handleValueChange}
                                size='small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <TextField
                                name='unit_type'
                                label='Unit'
                                select
                                value={carbonData[id]?.unit_type || ''}
                                onChange={handleChange}
                                size='small'
                                fullWidth>
                                <MenuItem disabled>Select an option...</MenuItem>
                                {units?.map(({ name }) => (
                                    <MenuItem key={name} value={name}>{name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={1}>
                            <TextField
                                name='time_type'
                                label='Per'
                                select
                                value={carbonData[id]?.time_type || ''}
                                onChange={handleChange}
                                size='small'
                                fullWidth>
                                <MenuItem disabled>Select an option...</MenuItem>
                                {time_types?.map(({ name }) => (
                                    <MenuItem key={name} value={name}>{name.toUpperCase()}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </>
                }
                <Grid item xs>
                    <Box className={styles.removeBox}>
                        <IconButton
                            onClick={() => remove(id)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <Divider orientation="vertical" />
        </Paper>
    );
}
