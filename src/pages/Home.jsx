import React, { Component } from "react";

// third-party library
import { connect } from "react-redux";
import { Container, Grid, CircularProgress } from "@material-ui/core";

// components
import Card from "../components/Card";
import Modal from "../components/Modal";
import Table from '../components/Table';

// actions
import { getStates } from '../store/modules/states';

// utils
import { majorCities } from '../utils/getMajorCities';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      majorCities: [],
      isOpen: false,
    }
  }

  componentDidMount() {
    this.props.getStates();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.allStates !== prevProps.allStates) {
      const states = await majorCities(this.props.allStates);
      this.setState({
        majorCities: states
      })
    }
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleCloseModal = () => {
    this.setState({ isOpen: false })
  }

  render() {
    console.log(this.state)
    const { majorCities } = this.state;

    return (
      <div className="homepage">
      <div className="homepage__logo">OpenSky</div>
      <Container>
        <h3 className="homepage__title">
          Find realtime info of all flights around the world!!!
        </h3>
        <div className="homepage__cards">
          <h3>Major Cities with heavy traffic</h3>
          { this.props.loading && <CircularProgress color="secondary" /> }
          <Grid container spacing={4} xs={10} className="cards">
            { majorCities.length >= 1 && majorCities.map(city => (
              <Grid item xs={4} onClick={this.toggleModal}>
                <Card name={city}/>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>

      <Modal
        open={ this.state.isOpen }
        handleClose={ this.handleCloseModal }
        title="Title"
      >
        <h2>Departing Flights</h2>
        <Table />

        <h2>Arriving Flights</h2>
        <Table />
      </Modal>
    </div>
    )
  }
}

export const mapStateToProps = state => {
  return {
    allStates: state.states.data,
    loading: state.states.isLoading,
    // error: state.auth.error
  }
};

export const mapDispatchToProps = dispatch => ({
  getStates: () => dispatch(getStates())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);