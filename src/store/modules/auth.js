// types
import { userContants,  IS_REQUESTING} from "../../constants/types";
import { Request, Success, Failure } from "../../constants/action";
import history from "../../utils/history";

/**
 * @description login
 *
 * @param {object} - users details
 *
 * @returns {object} action type and payload
 */
export const login = userDetails => async (dispatch) => {
  try {
    dispatch(Request(IS_REQUESTING, true));

    const { username, password } = userDetails;
    if (username === "demo" && password === "demo") {
      localStorage.setItem("isAuthenticated", true);

      dispatch(Success(userContants.LOGIN_SUCCESS, "Successfully Login"));
      dispatch(Request(IS_REQUESTING, false))
      history.push("/open-sky");
      return;
    }

    throw new Error("Invalid Credentials");
  } catch ({message: error}) {
    dispatch(Request(IS_REQUESTING, false));
    dispatch(Failure(userContants.LOGIN_FAILURE, error))
  }
};

const isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'))

// auth initial state
const authInitialState = {
  isAuthenticated,
  isLoading: false,
};

export const reducer = (state = authInitialState, action) => {
  switch (action.type) {
    case userContants.LOGIN_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isAuthenticated: true
      };
    case userContants.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        isAuthenticated: false
      };
    case IS_REQUESTING:
      return {
        ...state,
        isLoading: action.bool
      }
    default:
      return state;
  }
};

export default reducer;
