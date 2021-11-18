import 'styles/global.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from 'app/store'
import Layout from 'components/layout'

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}
