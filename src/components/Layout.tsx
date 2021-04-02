import Head from 'next/head';

const Layout: React.FC<{ children?: React.ReactNode, title: string, }> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        {children}
      </div>
    </>
  );
};

export { Layout };