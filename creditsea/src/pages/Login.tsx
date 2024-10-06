import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

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

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      login(response.data.token);
      navigate(`/${response.data.role}`);
    } catch (error) {
      console.error('Login failed', error);
      // TODO: Add error handling, perhaps with a snackbar or alert
    }
  };

  return (
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
          width: '100%',
          maxWidth: '800px',
          height: '400px',
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
            Login into CreditSea.
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleLogin}
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
            Login
          </Typography>
          <WhiteTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <GreenButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
          >
            LOGIN
          </GreenButton>
          <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
            No account? <Link to="/signup" style={{ textDecoration: 'none', color: '#4CAF50', fontWeight: 'bold' }}>Please sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
