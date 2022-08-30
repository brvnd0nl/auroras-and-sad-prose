import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({children}) => {
    return(
        <>
        <Head>
            <title>Auroras And Sad Prose</title>
        </Head>
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-grow'>
                {children}
            </main>
            <Footer />
        </div>
    </>
    );
};

export default Layout;