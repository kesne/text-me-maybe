import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import BoltIcon from '@material-ui/icons/OfflineBolt';
import BuildIcon from '@material-ui/icons/Build';
import ValueProp from './ValueProp';

const useStyles = makeStyles(theme => ({
    hero: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50vh',
        padding: theme.spacing(4),
        background: theme.palette.grey[200],
        width: '100vw',
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
        marginBottom: theme.spacing(4)
    },
    heroButton: {
        borderRadius: '100px',
        fontSize: '1.2rem'
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.hero}>
                <Container maxWidth="md">
                    <Typography variant="h1">Never reveal your phone number again</Typography>
                    <Box marginTop={4} marginBottom={4}>
                        <Typography variant="h5">
                            Send text messages to anyone without revealing your phone number,
                            starting at just $5 per month.
                        </Typography>
                    </Box>
                    <div>
                        <Button
                            component={RouterLink}
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.heroButton}
                            to="/signup"
                        >
                            Get Started
                        </Button>
                    </div>
                </Container>
            </div>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <ValueProp
                        Icon={LockIcon}
                        header="Private"
                        description="Messages come from a completely unique phone number."
                    />
                    <ValueProp
                        Icon={BuildIcon}
                        header="In Control"
                        description="Stop anyone from messaging you instantly by ending a conversation."
                    />
                    <ValueProp
                        Icon={BoltIcon}
                        header="Fast"
                        description="You can start conversations in seconds, without any setup."
                    />
                </Grid>
            </Container>
        </div>
    );
}
