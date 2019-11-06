import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import auth from '../utils/auth';

const ME = gql`
    query Me {
        me {
            id
            name
        }
    }
`;

export default function UserButton() {
    const history = useHistory();
    const { data, loading } = useQuery(ME);

    const [anchorEl, setAnchorEl] = useState(null);

    function signOut() {
        auth.clear();
        history.push('/');
    }

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (loading) {
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={signOut}>Sign out</MenuItem>
            </Menu>
        </>
    );
}
