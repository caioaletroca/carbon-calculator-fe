import { IconButton, Tooltip } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import { default as HeaderCommons } from "commons/Header"
import { CalculatorService } from "core/queries";
import { useNavigate } from "react-router-dom";
import { useCarbonData } from "core/hooks"
import { useReport } from "core/hooks/useReport";
import { Report } from "core/types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "commons/ConfirmationDialog";
import session from 'core/stores/SessionStorage';
import styles from './Header.module.scss';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from "notistack";

export default function Header() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const { data: carbonData, persist, clear: clearCarbonData } = useCarbonData();
    const { setReport, clear: clearReport } = useReport();

    const { mutate, isLoading } = useMutation(CalculatorService.post, {
        onError: async () => enqueueSnackbar('An error occurred when accessing the server')
    });

    const handleClick = () => {
        // Build the raw data
        const raw = Object.values(carbonData).reduce((sum, data) => [ ...sum, ...data ], []);

        // Remove field with empty values
        const payload = raw.filter(data => data.value && data.usage && data.unit_type && data.time_type);

        mutate(payload, {
            onSuccess: handleSuccess,   
        });
        persist();
    }

    const handleClear = () => {
        session.clear();
        clearCarbonData();
        clearReport();
        setOpen(false);
    }

    const handleSuccess = async (data: Report) => {
        setReport(data);
        navigate('/report');
    }

    return (
        <HeaderCommons>
            <ConfirmationDialog
                open={open}
                title="Do you want to clear all data?"
                onCancel={() => setOpen(false)}
                onConfirm={handleClear}
            />
            <Tooltip title='Erase data'>
                <IconButton
                    color='inherit'
                    onClick={() => setOpen(true)}>
                    <FontAwesomeIcon icon={faTrash} size='xs' />
                </IconButton>
            </Tooltip>
            <LoadingButton
                className={styles.calculateButton}
                color='info'
                variant='contained'
                loading={isLoading}
                onClick={handleClick}>
                Calculate
            </LoadingButton>
        </HeaderCommons>
    )
}