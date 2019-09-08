// types
import { statesContants,  IS_REQUESTING} from "../../constants/types";
import { Request, Success, Failure } from "../../constants/action";

export const getStates = () => async (dispatch, getState, http) => {
  dispatch(Request(IS_REQUESTING, true));
  try {
    const {data : {states}} = await http.get('/states/all');

    dispatch(Success(statesContants.GET_STATES_SUCCESS, states))
    dispatch(Request(IS_REQUESTING, false));
  } catch(error) {
    console.log(error)
    dispatch(Failure(statesContants.GET_STATES_SUCCESS, error))
    dispatch(Request(IS_REQUESTING, false));

  }
}

const stateInitial = {
  data: [],
  isLoading: false
}

export const reducer = (state = stateInitial, action) => {
  switch (action.type) {
    case statesContants.GET_STATES_SUCCESS: 
      return {
        ...state,
        data: action.payload
      };
    case statesContants.GET_STATES_FAILURE:
      return {
        ...this.state,
        error: action.error
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
