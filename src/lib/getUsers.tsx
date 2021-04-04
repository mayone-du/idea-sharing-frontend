// import Cookie from 'universal-cookie';

// const cookie = new Cookie();

const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/users-list/`
    // {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //      Authorization: `JWT ${cookie.get('access_token')}`,
    //   }
    // }
  );
  const users = await res.json();
  console.log(users)
  return {
    props: {
      users,
    },
    revalidate: 10,
  };
}


export { getUsers };