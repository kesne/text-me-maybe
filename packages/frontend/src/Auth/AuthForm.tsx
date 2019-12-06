import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Title from '@airbnb/lunar/lib/components/Title';
import Card from '@airbnb/lunar/lib/components/Card';
import CardContent from '@airbnb/lunar/lib/components/Card/Content';
import Spacing from '@airbnb/lunar/lib/components/Spacing';

type Props = {
    title: String;
    children: NonNullable<React.ReactNode>;
};

export default function AuthForm({ title, children }: Props) {
    const [classes, cx] = useStyles(() => ({
        container: {
            width: 400,
            margin: '0 auto'
        }
    }));

    return (
        <div className={cx(classes.container)}>
            <Spacing top={8}>
                <Card>
                    <CardContent>
                        <Title level={1}>{title}</Title>
                        {children}
                    </CardContent>
                </Card>
            </Spacing>
        </div>
    );
}
