import React from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import UserButton from './UserButton';

export default function Header() {
    // TODO: Find a real way to do the hasUser stuff.
    const hasUser = false;

    return (
        <Layout.Header>
            <div style={{ float: 'left', color: 'white' }}>Text Me Maybe</div>

            <div style={{ float: 'right' }}>
                {hasUser ? (
                    <UserButton />
                ) : (
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item>
                            <Link href="/auth/sign-in">
                                <a>Sign In</a>
                            </Link>
                        </Menu.Item>
                    </Menu>
                )}
            </div>
        </Layout.Header>
    );
}
