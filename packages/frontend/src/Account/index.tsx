import React from 'react';
import { Link as RouterLink, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Basics from './Basics';
import Security from './Security';
import Billing from './Billing';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2)
    }
}));

export default function Account() {
    const classes = useStyles();
    const match = useRouteMatch('/account/:page');

    const matchParams: Record<string, string> = match ? match.params : {};

    return (
        <Container className={classes.container} maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper>
                        <List>
                            <ListItem
                                component={RouterLink}
                                to="/account"
                                selected={!matchParams.page}
                                button
                            >
                                <ListItemText primary="Account" />
                            </ListItem>
                            <ListItem
                                component={RouterLink}
                                to="/account/security"
                                selected={matchParams.page === 'security'}
                                button
                            >
                                <ListItemText primary="Security" />
                            </ListItem>
                            <ListItem
                                component={RouterLink}
                                to="/account/billing"
                                selected={matchParams.page === 'billing'}
                                button
                            >
                                <ListItemText primary="Billing" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardContent>
                            <Switch>
                                <Route path="/account" exact>
                                    <Basics />
                                </Route>
                                <Route path="/account/security">
                                    <Security />
                                </Route>
                                <Route path="/account/billing">
                                    <Billing />
                                </Route>
                                <Route>
                                    <Redirect to="/account" />
                                </Route>
                            </Switch>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
