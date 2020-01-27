import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { useMeQuery } from '../../queries';

export default function UserButton() {
    const { data, loading } = useMeQuery();

    // TODO: We can implement this better probably:
    function signOut() {
        Router.push('/');
    }

    if (loading || !data || !data.me) {
        return null;
    }

    return (
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.SubMenu title={data.me.name}>
                <Menu.Item>
                    <Link href="/account">
                        <a>My account</a>
                    </Link>
                </Menu.Item>
                <Menu.Item onClick={signOut}>Sign out</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
}
