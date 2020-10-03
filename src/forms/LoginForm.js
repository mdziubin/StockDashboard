import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import Authservice from '../services/auth-service';
import withErrorHandler from 'src/components/withErrorHandler';
import axios from '../axios-backend';

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: 'test@test.com',
        password: 'password'
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string()
          .max(255)
          .required('Password is required')
      })}
      onSubmit={async (values, { setFieldError }) => {
        try {
          await Authservice.login(values.email, values.password);
          navigate('/app/dashboard', { replace: true });
        } catch (error) {
          if (error.response) {
            setFieldError('authentication', error.response.data.message);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              Sign in
            </Typography>
          </Box>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box my={2}>
            {errors.authentication && (
              <FormHelperText error>{errors.authentication}</FormHelperText>
            )}
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign in now
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/register" variant="h6">
              Sign up
            </Link>
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default withErrorHandler(LoginForm, axios);
