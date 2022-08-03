import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface ConfirmationDialogProps {
    open?: boolean;
    title?: string;
    onCancel?: (e: React.SyntheticEvent) => void;
    onConfirm?: (e: React.SyntheticEvent) => void;
}

export default function ConfirmationDialog({
    open = false,
    title,
    onCancel,
    onConfirm
}: ConfirmationDialogProps) {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button color='error' onClick={onCancel}>Cancel</Button>
                <Button variant='contained' onClick={onConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}