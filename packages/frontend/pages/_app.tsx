import 'antd/dist/antd.min.css';
import Layout from '../components/Layout';

// TODO: Type this:

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: any) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
