import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';  
import logo from '../images/ShariaStocks-logo/logo.png'
import '../auth.css';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Link,
    Alert
  } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    //const [alert, setAlert] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login(formData);
            //setAlert({ type: 'success', message: 'Login successful!' });
            console.log(res);
            localStorage.setItem('userEmail', res.email);
            navigate('/Dashboard');  // Ensure route is defined
            setFormData({ email: '', password: '' });  // Clear form after success
        } catch (err) {
            //setAlert({ type: 'error', message: 'Login failed. Please try again.' });
            setError(err.response?.data?.msg || 'Error logging in');
            console.error(error.response.data);
        }finally {
            setLoading(false);
          }
    };

    return (
        <div>
            <div className='header-section'>
                <img src={logo} alt="logo" />
            </div>
            <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#00A86B', '&:hover': { bgcolor: '#008f5a' } }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/signup')}
                sx={{ color: '#00A86B' }}
                disabled={loading}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
        </div>
    );
};

export default Login;