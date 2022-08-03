import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import styles from './EmptyMessage.module.scss';

export default function EmptyMessage() {
    return (
        <div className={styles.root}>
            <FontAwesomeIcon className={styles.icon} icon={faFile} size="4x" color="grey" />
            <Typography color='text.secondary'>Add a new usage in this category clicking the button below</Typography>
        </div>
    )
}