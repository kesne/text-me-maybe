import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import styled from 'styled-components';
import client from './client';
import Header from './Header';

// TODO: We need a utility for if the user is signed in or not.
// import Cookie from 'js-cookie';
// const HAS_USER_COOKIE = 'hasUser';
// const HAS_USER_VALUE = '1';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    // TODO: This should probably be min-height,
    // we just need to sort out the messages view.
    height: 100vh;
`;

export default function App({ children }: { children: any }) {
    return (
        <Layout>
            <ApolloProvider client={client}>
                <Root>
                    <Header />
                    {children}
                </Root>
            </ApolloProvider>
        </Layout>
    );
}
