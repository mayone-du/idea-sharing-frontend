const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/users-list/`);
  const users = await res.json();
  return {
    props: {
      users,
    },
    revalidate: 10,
  };
}


export { getUsers };