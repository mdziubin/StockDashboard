import React, { Component } from 'react';
import SimpleModal from './SimpleModal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: false
    };

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: false });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: true });
          throw err;
        }
      );
    }

    componentWillUnmount() {
      console.log('Component will unmount');
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: false });
    };

    render() {
      return (
        <React.Fragment>
          <SimpleModal
            modalClosed={this.errorConfirmedHandler}
            open={this.state.error}
          />
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
