import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    wrapperOther: {
        alignItems: 'flex-start'
    },
    container: {
        background: grey['200'],
        border: `1px solid ${grey['300']}`,
        padding: theme.spacing(),
        margin: theme.spacing(),
        borderRadius: theme.spacing(),
        borderBottomRightRadius: 0
    },
    other: {
        color: 'white',
        backgroundColor: green['500'],
        border: `1px solid ${green['600']}`,
        borderBottomRightRadius: theme.spacing(),
        borderBottomLeftRadius: 0
    }
}));

const SENDER_OTHER = 'OTHER';

export default function Message({ message }) {
    const classes = useStyles();

    return (
        <div className={clsx(classes.wrapper, { [classes.wrapperOther]: message.sender === SENDER_OTHER })}>
            <div className={clsx(classes.container, { [classes.other]: message.sender === SENDER_OTHER })}>
                <Typography>{message.body}</Typography>
            </div>
        </div>
    );
}
