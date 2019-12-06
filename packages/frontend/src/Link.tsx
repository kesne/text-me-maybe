import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import LunarLink, { Props as LinkProps } from '@airbnb/lunar/lib/components/Link';

type Props = {
    to: string;
} & LinkProps;

export default function LinkThing({ to, ...props }: Props) {
    const history = useHistory();
    const handleClick = useCallback(
        e => {
            e.preventDefault();
            history.push(to);
        },
        [history, to]
    );

    return <LunarLink onClick={handleClick} href="handleClick" {...props} />;
}
