import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect, Link, useRouteMatch } from 'react-router-dom';
import { Card, Menu, Layout } from 'antd';
import Basics from './Basics';
import Security from './Security';
import Billing from './Billing';

const LayoutStyled = styled(Layout)`
    background: #fff;
`;

const SiderStyled = styled(Layout.Sider)`
    background: #fff;
`;

export default function Account() {
    const { params = {} } = useRouteMatch('/account/:param') ?? {};
    const selectedKeys = [params.param ?? 'account'];

    return (
        <Layout.Content>
            <LayoutStyled>
                <SiderStyled width={200}>
                    <Menu mode="inline" selectedKeys={selectedKeys} style={{ height: '100%' }}>
                        <Menu.Item key="account">
                            <Link to="/account">Account</Link>
                        </Menu.Item>
                        <Menu.Item key="security">
                            <Link to="/account/security">Security</Link>
                        </Menu.Item>
                        <Menu.Item key="billing">
                            <Link to="/account/billing">Billing</Link>
                        </Menu.Item>
                    </Menu>
                </SiderStyled>
                <Layout.Content>
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
                </Layout.Content>
            </LayoutStyled>
        </Layout.Content>
    );
}
