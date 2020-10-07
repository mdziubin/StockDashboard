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
          const status = err.response.status;
          if (status !== 401 && status !== 422) {
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

export default withErrorHandlerModal;
