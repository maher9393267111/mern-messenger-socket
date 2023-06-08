import {
  ADD_MESSAGE,
  MESSAGE_ERROR,
  MESSAGE_LOADING,
  SELECT_CHAT,
  SEND_MESSAGE,
} from "./action";

const initState = {
  chatting: {},
  messages: [],
  loading: false,
  error: false,
};
export const chattingReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case SELECT_CHAT:
      return {
        ...store,
        chatting: payload,
        loading: false,
        error: false,
      };
    case SEND_MESSAGE:

    const item = payload;

    const existItem = store.messages.find((x) => x._id === item._id);

    //console.log("EXIST-------" , existItem);

    if (existItem) {
      return {
        ...store,
        messages: store.messages.map((x) =>
          x._id === existItem._id 
          ? item : x
        ),
      };
    } else {
      return {
        ...store,
        messages: [...store.messages, payload],
        loading: false,
         error: false,
      };
    }




//       return {
//         ...store,
//       //  messages: [...store.messages, payload],
//       messages: [...store.messages, store.messages.filter((message)=>{

// payload.map((item))

//       })],
//         loading: false,
//         error: false,
//       };



    case ADD_MESSAGE:
      return { ...store, messages: payload, loading: false, error: false };
    case MESSAGE_LOADING:
      return { ...store, loading: payload };
    case MESSAGE_ERROR:
      return { ...store, error: payload };
    default:
      return store;
  }
};
