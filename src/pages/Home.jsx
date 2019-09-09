import React, { Component } from "react";

// third-party library
import { connect } from "react-redux";
import { Container, Grid, CircularProgress } from "@material-ui/core";

// components
import Card from "../components/Card";
import Modal from "../components/Modal";
import Table from "../components/Table";
import TimePicker from "../components/TimePicker";
import moment from 'moment';

// actions
import {
  getFlights,
  getDepartingFlights,
  getArrivingFlights
} from "../store/modules/flights";

// utils
import { majorCities } from "../utils/getMajorCities";

// images
import images from '../utils/images';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      majorCities: [],
      isOpen: false,
      fromDate: new Date(),
      toDate: new Date(),
      flight: {},
      arrivingFlights: [],
      departingFlights: []
    };
  }

  componentDidMount() {
    this.props.getFlights();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.allStates !== prevProps.allStates) {
      const states = await majorCities(this.props.allStates);
      this.setState({
        majorCities: states
      });
    }

    if (this.props.arrivingFlights !== prevProps.arrivingFlights || this.props.departingFlights !== prevProps.departingFlights) {
      const { arrivingFlights, departingFlights } = this.props;
      this.setState({
        arrivingFlights,
        departingFlights
      })
    }
  }

  toggleModal = flight => () => {
    this.setState({ isOpen: !this.state.isOpen, flight }, async() => {
      if (this.state.isOpen) {
        await this.props.getArrivingFlights(flight);
        await this.props.getDepartingFlights(flight);
      }
    });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  handleDateChangeTo = (date) =>  {
    this.setState({
      toDate: date
    })
  }

  handleDateChangeFrom = (date) =>  {
    this.setState({
      fromDate: date
    })
  }

  filterFlights = async() => {
    const { flight, toDate, fromDate } = this.state;
    const begin = moment(fromDate).format('X');
    const end = moment(toDate).format('X');

    await this.props.getArrivingFlights(flight, begin, end);
    await this.props.getDepartingFlights(flight, begin, end);
  }

  render() {
    const { flights, loading } = this.props;
    const { arrivingFlights, departingFlights } = this.state;

    return (
      <div className="homepage">
        <div className="homepage__logo">OpenSky</div>
        <Container>
          <h3 className="homepage__title">
            Find realtime info of all flights around the world!!!
          </h3>
          <div className="homepage__cards">
            <h3>Major Cities with heavy traffic</h3>
            {loading && <CircularProgress color="secondary" />}
            <Grid container spacing={4} xs={10} className="cards">
              {flights.length >= 1 &&
                flights.map((city, index) => (
                  <Grid
                    item
                    xs={4}
                    onClick={this.toggleModal(city)}
                    key={index}
                  >
                    <Card name={city.estDepartureAirport} image={images[index]}/>
                  </Grid>
                ))}
            </Grid>
          </div>
        </Container>

        <Modal
          open={this.state.isOpen}
          handleClose={this.handleCloseModal}
          title="Flights"
        >
          <div>
            <TimePicker
              handleDateChangeTo={this.handleDateChangeTo}
              toDate={this.state.toDate}
              fromDate={this.state.fromDate}
              handleDateChangeFrom={this.handleDateChangeFrom}
              handleFilter={this.filterFlights}
              />
          </div>

          <h2 className="flight-title">Arriving Flights</h2>
          { loading
            ? <CircularProgress color="secondary" />
            : arrivingFlights.length <= 0
              ? <div> No Arriving Flight </div>
              :<Table flights={arrivingFlights} />
          }


          <h2 className="flight-title">Departing Flights</h2>
          { loading
            ? <CircularProgress color="secondary" /> 
            : departingFlights.length <= 0
              ? <div> No Departing Flight </div>
              : <Table flights={departingFlights} /> }
        </Modal>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    flights: state.flights.data,
    loading: state.flights.isLoading,
    arrivingFlights: state.flights.arrivingFlights,
    departingFlights: state.flights.departingFlights
  };
};

export const mapDispatchToProps = dispatch => ({
  getFlights: () => dispatch(getFlights()),
  getDepartingFlights: (flight, begin, end) => dispatch(getDepartingFlights(flight, begin, end)),
  getArrivingFlights: (flight, begin, end) => dispatch(getArrivingFlights(flight, begin, end))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
