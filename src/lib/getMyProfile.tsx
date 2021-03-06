const getMyProfile = async (setStateFn: Function, cookieInstance: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/my-profile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookieInstance.get("access_token")}`,
        },
      }
    );
    if (res.ok) {
      const profile = await res.json();
      setStateFn(profile);
      return profile;
    } else if (res.status === 401) {
      alert("認証情報が含まれていないか、期限が切れています。");
      return;
    }
  } catch (err) {
    alert("ログインされていないか、認証が切れています。");
  }
};

export { getMyProfile };