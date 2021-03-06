const getComments = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comments-list/`);
  const comments = await res.json();
  return comments;
}

export { getComments };