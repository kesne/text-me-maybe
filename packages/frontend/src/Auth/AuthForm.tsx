import React from 'react';
import styled from 'styled-components';
import { Typography, Card } from 'antd';
import Spacing from '../Spacing';

type Props = {
    title: string;
    children: NonNullable<React.ReactNode>;
};

const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
`;

export default function AuthForm({ title, children }: Props) {
    return (
        <Container>
            <Spacing top={8}>
                <Card>
                    <Typography.Title>{title}</Typography.Title>
                    {children}
                </Card>
            </Spacing>
        </Container>
    );
}
