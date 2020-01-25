import React, { useState, useMemo } from 'react';
import Cookie from 'js-cookie';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import styled from 'styled-components';
import client from '../src/utils/client';
import Header from '../src/Header';
import HasUserContext from '../src/HasUserContext';

const HAS_USER_COOKIE = 'hasUser';
const HAS_USER_VALUE = '1';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    // TODO: This should probably be min-height,
    // we just need to sort out the messages view.
    height: 100vh;
`;

export default function App({ children }: { children: any }) {
    const [hasUser, setHasUser] = useState(
        Cookie.get(HAS_USER_COOKIE) === HAS_USER_VALUE ? true : false
    );
    const contextValue = useMemo(
        () => ({
            hasUser,
            setHasUser: (value: boolean) => {
                // TODO: Remotely sign-out:
                value ? Cookie.set(HAS_USER_COOKIE, '1') : Cookie.remove(HAS_USER_COOKIE);
                setHasUser(value);
            }
        }),
        [hasUser, setHasUser]
    );

    return (
        <Layout>
            <HasUserContext.Provider value={contextValue}>
                <ApolloProvider client={client}>
                    <Root>
                        <Header />
                        {children}
                    </Root>
                </ApolloProvider>
            </HasUserContext.Provider>
        </Layout>
    );
}
