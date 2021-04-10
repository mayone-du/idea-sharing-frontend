import Head from "next/head";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { LayoutActivePage } from "../types/types";
import { useContext } from "react";
import { LoginUserContext } from "../contexts/LoginUserContext";

const Layout: React.FC<{ children?: React.ReactNode; metaTitle: string, activePage: LayoutActivePage, }> = ({
  children,
  metaTitle,
  activePage,
}) => {


  const {loginUser} = useContext(LoginUserContext);


  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <div>
        <header>
          <nav>
            <ul className="flex items-center justify-center m-4">
              <li className="m-2 text-blue-400">
                <Link href="/">
                  <a>
                    <Button variant={activePage === 'HOME' ? 'contained' : 'outlined'}>HOME</Button>
                  </a>
                </Link>
              </li>
              <li className="m-2 text-blue-400">
                <Link href="/auth">
                  <a>
                    <Button variant={activePage === 'AUTH' ? 'contained' : 'outlined'}>auth</Button>
                  </a>
                </Link>
              </li>
              <li className="m-2 text-blue-400">
                <Link href="/profile">
                  <a>
                    <Button variant={activePage === 'PROFILE' ? 'contained' : 'outlined'}>profile</Button>
                  </a>
                </Link>
              </li>
              <li className="m-2 text-blue-400">
                <Link href="/create">
                  <a>
                    <Button variant={activePage === 'CREATE' ? 'contained' : 'outlined'}>create</Button>
                  </a>
                </Link>
              </li>
              <li className="m-2 text-blue-400">
                <Link href="/test">
                  <a>
                    <Button variant={activePage === 'TEST' ? 'contained' : 'outlined'}>test</Button>
                  </a>
                </Link>
              </li>
              <li className='mx-4 font-bold'>
                {loginUser.username}
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
