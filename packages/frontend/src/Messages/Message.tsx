import React, { useEffect } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import { Message as MessageData, Sender, useMarkMessageSeenMutation } from '../queries';

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
        borderRadius: theme.spacing(2),
        textAlign: 'right'
    },
    other: {
        textAlign: 'left',
        color: 'white',
        backgroundColor: green['500'],
        border: `1px solid ${green['600']}`
    },
    text: {
        fontSize: '1.25rem'
    },
    sentAt: {
        margin: theme.spacing(0, 1, 2, 0)
    }
}));

type Props = {
    message: Partial<MessageData>;
};

export default function Message({ message }: Props) {
    const classes = useStyles();
    const [markMessageSeen] = useMarkMessageSeenMutation();

    useEffect(() => {
        if (message.sender !== Sender.Self && !message.seen) {
            markMessageSeen({
                variables: {
                    id: message.id as number
                }
            });
        }
    }, [message, markMessageSeen]);

    return (
        <div
            className={clsx(classes.wrapper, {
                [classes.wrapperOther]: message.sender === Sender.Other
            })}
        >
            <div
                className={clsx(classes.container, {
                    [classes.other]: message.sender === Sender.Other
                })}
            >
                <Typography className={classes.text}>{message.body}</Typography>
            </div>
            <Typography variant="body2" className={classes.sentAt}>
                {moment(Number(message.createdAt)).format('dddd, MMM D, h:mm')}
            </Typography>
        </div>
    );
}
