import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserButton from './UserButton';
import HasUserContext from '../HasUserContext';

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    title: {
        flex: 1
    }
}));

export default function Header() {
    const classes = useStyles();
    const { hasUser } = useContext(HasUserContext);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title} noWrap>
                    Text Me Maybe
                </Typography>
                {hasUser ? (
                    <UserButton />
                ) : (
                    <Button component={Link} to="/signin" color="inherit">
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
