import React, { useContext } from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Row from '@airbnb/lunar/lib/components/Row';
import Text from '@airbnb/lunar/lib/components/Text';
import Button from '../Button';
import UserButton from './UserButton';
import HasUserContext from '../HasUserContext';
import { useHistory } from 'react-router-dom';

export default function Header() {
    const [classes, cx] = useStyles(theme => ({
        container: {
            background: theme.color.core.primary[3],
            borderBottom: `1px solid ${theme.color.accent.border}`,
            padding: theme.unit * 2
        },
        logo: {
            textDecoration: 'none'
        }
    }));
    const { hasUser } = useContext(HasUserContext);
    const history = useHistory();

    function handleClick() {
        history.push('/');
    }

    return (
        <div className={cx(classes.container)}>
            <Row
                middleAlign
                after={hasUser ? <UserButton /> : <Button to="/signin">Sign in</Button>}
            >
                <a href="/" onClick={handleClick} className={cx(classes.logo)}>
                    <Text large bold inverted>
                        Text Me Maybe
                    </Text>
                </a>
            </Row>
        </div>
    );
}
