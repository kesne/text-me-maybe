import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Text from '@airbnb/lunar/lib/components/Text';

export default function ThreadEnded() {
    const [classes, cx] = useStyles(theme => ({
        container: {
            display: 'flex',
            justifyContent: 'center',
            padding: theme.unit * 2,
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), transparent)'
        }
    }));

    return (
        <div className={cx(classes.container)}>
            <Text>Thread has ended.</Text>
        </div>
    );
}
