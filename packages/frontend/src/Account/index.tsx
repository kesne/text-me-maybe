import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from '@airbnb/lunar-layouts/lib/components/Layout';
import Card, { Content as CardContent } from '@airbnb/lunar/lib/components/Card';
import Grid, { Col } from '@airbnb/lunar/lib/components/Grid';
import Text from '@airbnb/lunar/lib/components/Text';
import Basics from './Basics';
import Security from './Security';
import Billing from './Billing';

export default function Account() {
    const history = useHistory();

    function navigateTo(path: string) {
        return () => history.push(`/account/${path}`);
    }

    return (
        <Layout centerAlign>
            <Grid>
                <Col span={3}>
                    <Card>
                        <CardContent onClick={navigateTo('')} compact>
                            <Text>Account</Text>
                        </CardContent>
                        <CardContent onClick={navigateTo('security')} compact>
                            <Text>Security</Text>
                        </CardContent>
                        <CardContent onClick={navigateTo('billing')} compact>
                            <Text>Billing</Text>
                        </CardContent>
                    </Card>
                </Col>
                <Col span={9}>
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
                </Col>
            </Grid>
        </Layout>
    );
}
