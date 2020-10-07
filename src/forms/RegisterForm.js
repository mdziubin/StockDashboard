import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Authservice from '../services/auth-service';
import withErrorHandlerModal from 'src/components/withErrorHandlerModal';
import axios from '../axios-backend';

const RegisterForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: 'test@test.com',
        name: 'Matt',
        password: 'password'
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(255)
          .required('Name is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string()
          .min(5, 'Password must be at least 5 characters')
          .max(255)
          .required('Password is required')
      })}
      onSubmit={async (values, { setFieldError }) => {
        try {
          await Authservice.register(
            values.name,
            values.email,
            values.password
          );
          navigate('/login', { replace: true });
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
              Create new account
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Use your email to create new account
            </Typography>
          </Box>
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Name"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
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
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>{errors.policy}</FormHelperText>
          )}
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
              Sign up now
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Have an account?{' '}
            <Link component={RouterLink} to="/login" variant="h6">
              Sign in
            </Link>
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default withErrorHandlerModal(RegisterForm, axios);
