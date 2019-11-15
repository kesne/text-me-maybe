import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InfoIcon from '@material-ui/icons/Info';
import { Thread } from '../queries';

const useStyles = makeStyles(theme => ({
    title: {
        marginRight: theme.spacing(),
        flex: 1
    }
}));

type Props = {
    thread: Partial<Thread>;
};

export default function Header({ thread }: Props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const copyRecipient = () => {
        navigator.clipboard.writeText(thread.recipient as string);
        handleClose();
    };

    return (
        <AppBar color="inherit" position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {thread.name}
                </Typography>
                <IconButton edge="end" color="primary" onClick={handleClick}>
                    <InfoIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={copyRecipient}>To: {thread.recipient}</MenuItem>
                    <MenuItem onClick={handleClose}>Deactivate Phone Number</MenuItem>
                    <MenuItem onClick={handleClose}>Delete Thread</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
