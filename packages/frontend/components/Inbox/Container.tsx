import styled from 'styled-components';
import Threads from './Threads';

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

type Props = {
    children: React.ReactNode;
}

export default function Inbox({ children }: Props) {
    return (
        <Container>
            <Drawer>
                <Threads />
            </Drawer>
            <Content>
                <ContentOverflow>
                    {children}
                </ContentOverflow>
            </Content>
        </Container>
    );
}
