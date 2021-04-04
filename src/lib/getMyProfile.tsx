const getMyProfile = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/my-profile/`);
  const profile = await res.json();
  return profile;
}

export { getMyProfile };