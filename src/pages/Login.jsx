import React, { Component } from "react";

// third party library
import { connect } from "react-redux";

//actions
import { login } from "../store/modules/auth";

// material ui
import { Container, Card, CardHeader, CardContent, TextField, Button } from "@material-ui/core";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state)
  }

  render() {
    const { error, loading } = this.props;
    return (
      <div className="login">
        <div className="login__img"></div>
        <Container fluid className="login__container">
          <Card className="login__card">
            <form onSubmit={this.handleSubmit}>
            <CardHeader title="Welcome to OpenSky" subheader="Please Login" />
            { this.props.error && <div className="error">{this.props.error}</div>}
            <CardContent>
              <TextField
                id="outlined-full-width"
                label="Username"
                placeholder="Enter Your Username"
                fullWidth
                variant="outlined"
                name="username"
                onChange={this.handleChange}
              />
              <TextField
                id="outlined-full-width"
                label="Password"
                placeholder="Enter Your Password"
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                name="password"
                onChange={this.handleChange}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                color="primary"
                className="login__button"
                type="submit"
              >
                { loading ? 'Submitting...' : 'Login'}
              </Button>
            </CardContent>
            </form>
          </Card>
        </Container>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    loading: state.auth.isLoading,
    error: state.auth.error
  }
};

export const mapDispatchToProps = dispatch => ({
  login: (userDetails) => dispatch(login(userDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);