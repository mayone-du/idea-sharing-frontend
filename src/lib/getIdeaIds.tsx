const getIdeaIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/ideas-list/`
  );
  const ideas = await res.json();
  return ideas.map((idea: any) => {
    return {
      params: {
        id: String(idea.id),
      },
    };
  });
};

export { getIdeaIds };
