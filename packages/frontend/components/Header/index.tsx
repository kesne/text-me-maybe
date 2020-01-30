import Link from 'next/link';
import { Layout, Menu } from 'antd';
import UserButton from './UserButton';
import { useHasUser } from '../utils/user';

export default function Header() {
    const hasUser = useHasUser();

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
