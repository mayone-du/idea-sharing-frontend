import Head from "next/head";
import Link from "next/link";

const Layout: React.FC<{ children?: React.ReactNode; metaTitle: string }> = ({
  children,
  metaTitle,
}) => {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <Link href="/">
                  <a>HOME</a>
                </Link>
              </li>
              <li>
                <Link href="/auth">
                  <a>auth</a>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {children}
      </div>
    </>
  );
};

export { Layout };
