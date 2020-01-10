import React, { useContext } from 'react';
import MenuToggle, { Item as MenuItem } from '@airbnb/lunar/lib/components/MenuToggle';
import { useHistory } from 'react-router-dom';
import { useMeQuery } from '../queries';
import HasUserContext from '../HasUserContext';

export default function UserButton() {
    const history = useHistory();
    const { data, loading } = useMeQuery();
    const { setHasUser } = useContext(HasUserContext);

    function signOut() {
        setHasUser(false);
        history.push('/');
    }

    function handleAccount() {
        history.push('/account');
    }

    if (loading || !data || !data.me) {
        return null;
    }

    return (
        <MenuToggle accessibilityLabel={data.me.name} toggleLabel={data.me.name}>
            <MenuItem onClick={handleAccount}>My account</MenuItem>
            <MenuItem onClick={signOut}>Sign out</MenuItem>
        </MenuToggle>
    );
}
