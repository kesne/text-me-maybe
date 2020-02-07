import { Provider } from 'urql';
import { Layout } from 'antd';
import styled from 'styled-components';
import client from './utils/client';
import Header from './Header';

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
            <Provider value={client}>
                <Root>
                    <Header />
                    {children}
                </Root>
            </Provider>
        </Layout>
    );
}
