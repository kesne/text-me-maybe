import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';

type Props = {
    children: React.ReactNode;
};

const LayoutStyled = styled(Layout)`
    background: #fff;
`;

const SiderStyled = styled(Layout.Sider)`
    background: #fff;
`;

export default function Container({ children }: Props) {
    const { asPath } = useRouter();

    const selectedKeys = [asPath.split('/')[2] ?? 'account'];

    return (
        <Layout.Content>
            <LayoutStyled>
                <SiderStyled width={200}>
                    <Menu mode="inline" selectedKeys={selectedKeys} style={{ height: '100%' }}>
                        <Menu.Item key="account">
                            <Link href="/account">
                                <a>Account</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="security">
                            <Link href="/account/security">
                                <a>Security</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="billing">
                            <Link href="/account/billing">
                                <a>Billing</a>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </SiderStyled>
                <Layout.Content>{children}</Layout.Content>
            </LayoutStyled>
        </Layout.Content>
    );
}
