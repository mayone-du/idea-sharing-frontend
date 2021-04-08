import Head from "next/head";
import Link from "next/link";
import { LoginUser } from '../types/types';


const Layout: React.FC<{ children?: React.ReactNode; metaTitle: string, loginUser?: LoginUser }> = ({
  children,
  metaTitle,
  loginUser,
}) => {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <div>
        <header>
          <nav>
            <ul className='flex items-center justify-center m-4'>
              <li className='m-2 text-blue-400'>
                <Link href="/">
                  <a>HOME</a>
                </Link>
              </li>
              <li className='m-2 text-blue-400'>
                <Link href="/auth">
                  <a>auth</a>
                </Link>
              </li>
              <li className='m-2 text-blue-400'>
                <Link href="/profile">
                  <a>profile</a>
                </Link>
              </li>
              <li className='m-2 text-blue-400'>
                <Link href="/create">
                  <a>create</a>
                </Link>
              </li>
              <li className='m-2 text-blue-400'>
                <Link href="/test">
                  <a>test</a>
                </Link>
              </li>
              <li>
                {loginUser ? loginUser.id : 0}
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
