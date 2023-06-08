export const AUTH_USER = "AUTH_USER";
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const UPLOAD_PIC = "UPLOAD_PIC";
export const CURRENTUSER = "CURRENTUSER";
export const AUTH_ERROR_MESSAGE  = "AUTH_ERROR_MESSAGE"

export const actionPic = (payload) => ({ type: UPLOAD_PIC, payload });
export const authUser = (payload) => ({ type: AUTH_USER, payload });
export const currentUser = (payload) => ({ type: CURRENTUSER, payload });
export const authLoading = (payload) => ({ type: AUTH_LOADING, payload });
export const authError = (payload) => ({ type: AUTH_ERROR, payload });
export const authMessage = (payload) => ({ type: AUTH_ERROR_MESSAGE, payload });
export const authLogout = () => ({ type: LOGOUT, payload: {} });

export const authRegister = (url, user ,islogin =false) => async (dispatch) => {





  dispatch(authLoading(true));
  try {



    console.log('user Register' , user)


    let res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    let data = await res.json();

    if(islogin){
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(authUser(data));

   dispatch(CurrentUserName(user?.username));
     


    }

    dispatch(authLoading(false));

  } catch (err) {
    dispatch(authLoading(false));
    dispatch(authError(true));
    console.log(err.message);
    dispatch(authMessage(err.message));
  }
};




// -----currentuser with username---

export const CurrentUserName = (username) => async (dispatch) => {
  dispatch(authLoading(true));
  const user = JSON.parse(localStorage.getItem("userInfo")) || {};
  const url = `http://localhost:5000/api/Users/${username}`;
  try {
    let res = await fetch(url, {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },

    });
    let data = await res.json();
    dispatch(currentUser(data));

    dispatch(authLoading(false));
    //console.log('data action page CURRENT USER ⌛✈⌛✈' ,data)
  } catch (err) {
    dispatch(authLoading(false));
    dispatch(authError(true));
    console.log(err.message);
  }
};





// -----current user -----

// export const CurrentUserData = () => async (dispatch) => {
//   dispatch(authLoading(true));
//   const user = JSON.parse(localStorage.getItem("userInfo")) || {};
//   const url = `http://localhost:5000/api/currentuser`;
//   try {
//     let res = await fetch(url, {
//       method: "get",
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     let data = await res.json();
//     dispatch(currentUser(data));
//     //console.log('data action page CURRENT USER ⌛✈⌛✈' ,data)
//   } catch (err) {
//     dispatch(authLoading(false));
//     dispatch(authError(true));
//     console.log(err.message);
//   }
// };



export const uploadPic = (pic) => async (dispatch) => {
  dispatch(authLoading(true));
  try {
    const url = `https://api.cloudinary.com/v1_1/yasherosion/image/upload`;
    const profile = new FormData();
    profile.append("file", pic);
    profile.append("upload_preset", "chat-app");
    profile.append("cloud_name", "yasherosion");
    let res = await fetch(url, {
      method: "POST",
      body: profile,
    });
    let data = await res.json();
    console.log(data);
    dispatch(actionPic(data.secure_url));
  } catch (error) {
    dispatch(authLoading(false));
    dispatch(authError(true));
    console.log(error.message);
  }
};
