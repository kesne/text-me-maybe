import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), transparent)'
    }
}));

export default function ThreadEnded() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant="subtitle1">Thread has ended.</Typography>
        </div>
    );
}
