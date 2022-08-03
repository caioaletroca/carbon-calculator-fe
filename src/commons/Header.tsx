import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {
  onBack?: (e: React.SyntheticEvent) => void,
  children?: React.ReactNode
}

export default function Header({ onBack, children }: HeaderProps) {
  const navigate = useNavigate();

  const handleClick = () => navigate('/');

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {
            onBack &&
            <IconButton
              className={styles.backButton}
              color='inherit'
              onClick={onBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
          }
          <Typography
            className={styles.title}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={handleClick}>
            Carbon Calculator
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}