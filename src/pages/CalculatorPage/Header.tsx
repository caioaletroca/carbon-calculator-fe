import { Button, IconButton, Tooltip } from "@mui/material"
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

export default function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const { data: carbonData, persist, clear: clearCarbonData } = useCarbonData();
    const { setReport, clear: clearReport } = useReport();

    const { mutate } = useMutation(CalculatorService.post);

    const handleClick = () => {
        mutate(carbonData, {
            onSuccess: handleSuccess
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
                    onClick={() => setOpen(true)}>
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Tooltip>
            <Button
                color='secondary'
                variant='contained'
                onClick={handleClick}>
                Calculate
            </Button>
        </HeaderCommons>
    )
}