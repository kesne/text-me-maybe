import { useRouter } from 'next/router';
import { withAuth } from '../../components/utils/auth';
import Container from '../../components/Inbox/Container';
import Messages from '../../components/Messages';

function InboxThread() {
    const { query } = useRouter();

    return <Container>{query.thread && <Messages id={query.thread as string} />}</Container>;
}

export default withAuth(InboxThread);
