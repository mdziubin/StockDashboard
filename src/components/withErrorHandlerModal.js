import React, { Component } from 'react';
import SimpleModal from './SimpleModal';

const withErrorHandlerModal = (WrappedComponent, axios) => {
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
          if (!err.response) {
            this.setState({ error: true });
          }
          throw err;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: false });
    };

    render() {
      return (
        <>
          <SimpleModal
            modalClosed={this.errorConfirmedHandler}
            open={this.state.error}
          />
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandlerModal;
