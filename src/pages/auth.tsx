import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Cookie from 'universal-cookie';

const cookie = new Cookie();

const Auth: React.VFC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameChange = (e: any) => {
    setUsername(e.target.value);
  }

  const passwordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const login = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
    {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 401) {
        throw new Error('non_fields_error');
      } else if (res.ok) {
        return res.json();
      }
    }).then((data) => {
      const accessOptions = { path: '/' };
      const refreshOptions = { path: '/', maxAge: 60 * 60 * 24 * 7};
      // const refreshOptions = { path: '/', expires: new Date(Date.now() + 1) };
      cookie.set('access_token', data.access, accessOptions );
      cookie.set('refresh_token', data.refresh, refreshOptions );
      console.log(cookie.getAll())
    })
  }

  return (
    <>
      <div>
        <div className='m-10'>
          <p>username</p>
          <TextField type='text' variant="outlined" onChange={usernameChange} />
        </div>
        <div className='m-10'>
          <p>password</p>
          <TextField type='password' variant="outlined" onChange={passwordChange} />
        </div>

        <div>
          <Button onClick={login} variant='contained'>button</Button>
        </div>
      </div>
    </>
  );
};

export default Auth;
