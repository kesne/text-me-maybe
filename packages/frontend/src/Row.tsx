import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Before = styled.div`
    margin-right: 8px;
`;

const Content = styled.div`
    flex: 1;
`;

const After = styled.div`
    margin-left: 8px;
`;

type Props = {
    before?: any;
    children: any;
    after?: any;
};

// TODO: Maybe this goes away at some point???
export default function Row({ before, after, children }: Props) {
    return (
        <Container>
            {before && <Before>{before}</Before>}
            <Content>{children}</Content>
            {after && <After>{after}</After>}
        </Container>
    );
}
