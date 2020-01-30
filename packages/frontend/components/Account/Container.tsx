import Link from 'next/link';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';

type Props = {
    selected: string;
    children: React.ReactNode;
};

const LayoutStyled = styled(Layout)`
    background: #fff;
`;

const SiderStyled = styled(Layout.Sider)`
    background: #fff;
`;

export default function Container({ selected, children }: Props) {
    return (
        <Layout.Content>
            <LayoutStyled>
                <SiderStyled width={200}>
                    <Menu mode="inline" selectedKeys={[selected]} style={{ height: '100%' }}>
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
