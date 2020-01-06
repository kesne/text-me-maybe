import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Text from '@airbnb/lunar/lib/components/Text';
import Row from '@airbnb/lunar/lib/components/Row';
import { Item as ListItem } from '@airbnb/lunar/lib/components/List';

type Props = {
    id: number;
    title: string;
    subtitle: React.ReactNode;
    seen: boolean;
    selected: boolean;
    onClick?: () => void;
};

export default function ThreadItem({ id, title, subtitle, seen, selected, onClick }: Props) {
    const [classes, cx] = useStyles(theme => ({
        button: {
            display: 'block',
            textDecoration: 'none',
            padding: theme.unit * 2,
            ':hover': {
                background: theme.color.accent.bgHover
            }
        },
        selected: {
            background: theme.color.accent.bgHover
        },
        badge: {
            height: theme.unit,
            width: theme.unit,
            borderRadius: theme.unit,
            color: 'white',
            backgroundColor: theme.color.core.primary[0]
        }
    }));

    return (
        <ListItem bordered>
            <Link
                to={`/inbox/${id}`}
                onClick={onClick}
                className={cx(classes.button, selected && classes.selected)}
            >
                <Row after={!seen && <div className={cx(classes.badge)}></div>}>
                    <Text>{title}</Text>
                    <Text small muted>
                        {subtitle}
                    </Text>
                </Row>
            </Link>
        </ListItem>
    );
}
