const getIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/ideas-list/`);
  const ideas = await res.json();
  await console.log(ideas)
  return ideas;
}

export { getIdeas };