const getIdeaDetail = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/idea-detail/${id}`)
  const idea = await res.json();
  return {idea};
}

export { getIdeaDetail };