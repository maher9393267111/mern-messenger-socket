export const SEARCH_LOADING = "SEARCH_LOADING";
export const SEARCH_ERROR = "SEARCH_ERROR";
export const SEARCH_RESULT = "SEARCH_RESULT";

export const searhcLoding = (payload) => ({ type: SEARCH_LOADING, payload });
export const searchError = (payload) => ({ type: SEARCH_ERROR, payload });
export const searchResult = (payload) => ({ type: SEARCH_RESULT, payload });

export const makeSearchApi = (search) => async (dispatch) => {
  searhcLoding(true);
  const user = JSON.parse(localStorage.getItem("userInfo")) || {};
  const url = `http://localhost:5000/auth?search=${search}`;
  try {
    let res = await fetch(url, {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    let data = await res.json();
    dispatch(searchResult(data));
  } catch (err) {
    dispatch(searchError(true));
    console.log(err.message);
  }
};




export const makeSearchName = (userName) => async (dispatch) => {
  searhcLoding(true);
  const user = JSON.parse(localStorage.getItem("userInfo")) || {};
  //${userName}
  //?search=${search}
  const url = `http://localhost:5000/api?search=${userName}`;
  try {
    let res = await fetch(url, {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    let data = await res.json();
    dispatch(searchResult(data));
  } catch (err) {
    dispatch(searchError(true));
    console.log(err.message);
  }
};
