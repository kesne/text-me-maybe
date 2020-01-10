import React from 'react';
import { Col } from '@airbnb/lunar/lib/components/Grid';
import Card, { Content as CardContent } from '@airbnb/lunar/lib/components/Card';
import Text from '@airbnb/lunar/lib/components/Text';
import Row from '@airbnb/lunar/lib/components/Row';

type Props = {
    header: string;
    description: string;
    Icon: React.ComponentType<any>;
};

export default function ValueProp({ header, description, Icon }: Props) {
    return (
        <Col span={4}>
            <Card>
                <CardContent>
                    <Row before={<Icon size={64} />} middleAlign>
                        <Text large>{header}</Text>
                        <Text>{description}</Text>
                    </Row>
                </CardContent>
            </Card>
        </Col>
    );
}
