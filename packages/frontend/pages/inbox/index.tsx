import { Empty } from 'antd';
import { withAuth } from '../../components/utils/auth';
import Container from '../../components/Inbox/Container';

function Inbox() {
    return (
        <Container>
            <Empty />
        </Container>
    );
}

export default withAuth(Inbox);
