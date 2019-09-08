import { flightsContants, IS_REQUESTING } from '../../constants/types';
import { Request, Success, Failure } from "../../constants/action";
import { latestFlight } from '../../utils/getLatestFlights';

export const getFlights = () => async (dispatch, getState, http) => {
  dispatch(Request(IS_REQUESTING, true));

  try {
    const flights = await http.get(`/flights/all?begin=1517227200&end=1517230800`)
    const getLatestFlight = await latestFlight(flights.data);

    dispatch(Success(flightsContants.GET_FLIGHTS_SUCCESS, getLatestFlight))
    dispatch(Request(IS_REQUESTING, false));
  } catch ({message: error}) {
    dispatch(Failure(flightsContants.GET_FLIGHT_FAILURE, error))
    dispatch(Request(IS_REQUESTING, false));
  }
}

export const getDepartingFlights = (flight) => async (dispatch, getState, http) => {
  dispatch(Request(IS_REQUESTING, true));

  try {
    const departingFlights = await http.get(`flights/departure?airport=${flight.estDepartureAirport}&begin=1517227200&end=1517230800`);

    dispatch(Success(flightsContants.GET_DEPARTING_FLIGHT_SUCCESS, departingFlights.data))
    dispatch(Request(IS_REQUESTING, false));
  } catch ({message: error}) {

    dispatch(Failure(flightsContants.GET_FLIGHT_FAILURE, error))
    dispatch(Request(IS_REQUESTING, false));
  }
}

export const getArrivingFlights = (flight) => async (dispatch, getState, http) => {
  dispatch(Request(IS_REQUESTING, true));

  try {

    const arrivalFlights = await http.get(`flights/departure?airport=${flight.estArrivalAirport}&begin=1517227200&end=1517230800`);

    dispatch(Success(flightsContants.GET_ARRIVING_FLIGHT_SUCCESS, arrivalFlights.data))
    dispatch(Request(IS_REQUESTING, false));
  } catch ({message: error}) {
    dispatch(Failure(flightsContants.GET_FLIGHT_FAILURE, error))
    dispatch(Request(IS_REQUESTING, false));
  }
}

const flightInitialState = {
  data: [],
  arrivingFlights: [],
  departingFlights: [],
  isLoading: false
}

export const reducer = (state = flightInitialState, action) => {
  switch (action.type) {
    case flightsContants.GET_FLIGHTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case flightsContants.GET_ARRIVING_FLIGHT_SUCCESS:
      return {
        ...state,
        arrivingFlights: action.payload,
      };
    case flightsContants.GET_DEPARTING_FLIGHT_SUCCESS:
      return {
        ...state,
        departingFlights: action.payload,
      };
    case flightsContants.GET_FLIGHT_FAILURE:
      return {
        ...state,
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