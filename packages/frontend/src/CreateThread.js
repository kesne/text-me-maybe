import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiPhoneNumber from 'material-ui-phone-number';
import { THREADS } from './Threads';
import client from './client';

const CREATE_THREAD = gql`
    mutation CreateThread($phoneNumber: String!) {
        createThread(to: $phoneNumber) {
            id
        }
    }
`;

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(4)
    }
}));

export default function CreateThread() {
    const classes = useStyles();
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = useState('');

    // TODO: Eventually this should probably just write into the cache directly,
    // but for now I'll just re-fetch all of the threads after creating one.
    const [createThread, { loading, data }] = useMutation(CREATE_THREAD, {
        variables: {
            phoneNumber
        }
    });

    useEffect(() => {
        if (data) {
            // Force a refetch of threads from network
            client.query({ query: THREADS, fetchPolicy: 'network-only' });
            history.push(`/threads/${data.createThread.id}`);
        }
    }, [data, history]);

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4" component="h2">
                        Create a new thread
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Message will arrive from a unique phone number, and will not be associated
                        with you.
                    </Typography>
                    <MuiPhoneNumber
                        label="Phone Number"
                        value={phoneNumber}
                        defaultCountry={'us'}
                        onChange={setPhoneNumber}
                        margin="normal"
                        disabled={loading}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => createThread()}
                        disabled={loading}
                        variant="contained"
                        color="primary"
                    >
                        Create Thread
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
