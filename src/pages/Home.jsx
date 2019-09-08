import React, { Component } from "react";

// third-party library
import { connect } from "react-redux";
import { Container, Grid, CircularProgress } from "@material-ui/core";

// components
import Card from "../components/Card";
import Modal from "../components/Modal";
import Table from "../components/Table";
import TimePicker from "../components/TimePicker";

// actions
import {
  getFlights,
  getDepartingFlights,
  getArrivingFlights
} from "../store/modules/flights";

// utils
import { majorCities } from "../utils/getMajorCities";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      majorCities: [],
      isOpen: false
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
  }

  toggleModal = city => () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen) {
        this.props.getArrivingFlights(city);
        this.props.getDepartingFlights(city);
      }
    });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { flights, arrivingFlights, departingFlights } = this.props;

    return (
      <div className="homepage">
        <div className="homepage__logo">OpenSky</div>
        <Container>
          <h3 className="homepage__title">
            Find realtime info of all flights around the world!!!
          </h3>
          <div className="homepage__cards">
            <h3>Major Cities with heavy traffic</h3>
            {this.props.loading && <CircularProgress color="secondary" />}
            <Grid container spacing={4} xs={10} className="cards">
              {flights.length >= 1 &&
                flights.map((city, index) => (
                  <Grid
                    item
                    xs={4}
                    onClick={this.toggleModal(city)}
                    key={index}
                  >
                    <Card name={city.estDepartureAirport} />
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
            <TimePicker />
          </div>

          <h2>Arriving Flights</h2>
          <Table flights={arrivingFlights} />

          <h2>Departing Flights</h2>
          <Table flights={departingFlights} />
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
  getDepartingFlights: flight => dispatch(getDepartingFlights(flight)),
  getArrivingFlights: flight => dispatch(getArrivingFlights(flight))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
