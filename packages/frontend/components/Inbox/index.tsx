import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Empty } from 'antd';
import Threads from './Threads';
import Messages from './Messages';

const Container = styled.div`
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: row;
`;

const Drawer = styled.div`
    width: 320px;
    padding: 16px;
`;

const Content = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const ContentOverflow = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 16px;
`;

export default function Inbox() {
    return (
        <Container>
            <Drawer>
                <Threads />
            </Drawer>
            <Content>
                <ContentOverflow>
                    <Switch>
                        <Route path="/inbox/:id">
                            <Messages />
                        </Route>
                        <Route>
                            <Empty />
                        </Route>
                    </Switch>
                </ContentOverflow>
            </Content>
        </Container>
    );
}
