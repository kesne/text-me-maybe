import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import LunarButton, { Props as ButtonProps } from '@airbnb/lunar/lib/components/Button';

type Props = {
    to: string;
} & ButtonProps;

export default function ButtonThing({ to, ...props }: Props) {
    const history = useHistory();
    const handleClick = useCallback(
        e => {
            e.preventDefault();
            history.push(to);
        },
        [history, to]
    );

    return <LunarButton onClick={handleClick} href={to} {...props} />;
}
