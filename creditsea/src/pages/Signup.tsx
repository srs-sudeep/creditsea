import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const WhiteTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#BDBDBD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4CAF50',
    },
  },
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const role = localStorage.getItem('role');
      if (role === 'admin') navigate('/admin');
      else if (role === 'verifier') navigate('/verifier');
      else if (role === 'user') navigate('/user');
      else navigate('/');
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, values);
        toast.success('Signup successful! Please login.');
        navigate('/login');
      } catch (error) {
        console.error('Signup failed', error);
        toast.error('Signup failed. Please try again.');
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <Container component="main" sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            bgcolor: '#F5F5F5',
            borderRadius: 1,
            overflow: 'hidden',
            boxShadow: 3,
            width: '90%', // Adjusted width
            maxWidth: '90vw',
            height: '75vh', // Adjusted height
          }}
        >
          <Box
            sx={{
              flex: 1,
              bgcolor: '#4CAF50',
              color: 'white',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom fontWeight="bold">
              CREDIT SEA
            </Typography>
            <Typography variant="body1">
              Register for CreditSea.
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              flex: 1,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography component="h2" variant="h5" gutterBottom fontWeight="bold">
              Signup
            </Typography>
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <GreenButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.5 }}
            >
              SIGNUP
            </GreenButton>
            <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
              Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#4CAF50', fontWeight: 'bold' }}>Please Login</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
