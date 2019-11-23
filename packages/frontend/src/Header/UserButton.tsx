import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useMeQuery } from '../queries';
import HasUserContext from '../HasUserContext';

export default function UserButton() {
    const history = useHistory();
    const { data, loading } = useMeQuery();
    const { setHasUser } = useContext(HasUserContext);

    const [anchorEl, setAnchorEl] = useState(null);

    function signOut() {
        setHasUser(false);
        history.push('/');
    }

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (loading || !data || !data.me) {
        return null;
    }

    return (
        <>
            <Button
                color="inherit"
                aria-controls="account-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                {data.me.name}
            </Button>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to="/account" onClick={handleClose}>
                    My account
                </MenuItem>
                <MenuItem onClick={signOut}>Sign out</MenuItem>
            </Menu>
        </>
    );
}
