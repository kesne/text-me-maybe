import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import formatPhone from '../utils/formatPhone';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

type Props = {
    phoneNumber: string;
    createdAt: string;
};

export default function YouAre({ phoneNumber, createdAt }: Props) {
    const classes = useStyles();

    console.log(createdAt);

    return (
        <div className={classes.container}>
            <Typography variant="overline">You are {formatPhone(phoneNumber)}</Typography>
            <Typography variant="overline">Conversation started {moment(Number(createdAt)).fromNow()}</Typography>
        </div>
    );
}
