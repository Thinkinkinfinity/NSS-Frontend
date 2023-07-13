import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button, Link as MuiLink, SelectChangeEvent } from '@mui/material';
import { log } from 'console';
import Swal from 'sweetalert2';

interface ILoginFormProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

interface ILoginFormState {
  username: string;
  password: string;
  rememberMe: boolean;
}
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  constructor(props: ILoginFormProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
      rememberMe: false,
    };
  }

  private handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  private handleRememberMeChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    const target = event.target as HTMLInputElement;
    this.setState({ rememberMe: target.checked });
  };

  private handleLogin = () => {
    const url = BACKEND_URL+'/auth/login/';
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        
         // Check if `data.detail` is defined
      if (data.detail) {
        console.log("message", data.detail);
        var errorMsg = data.detail;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg,
        });
      }


        // If "Remember Me" checkbox is checked, store credentials in localStorage
        if (this.state.rememberMe) {
          localStorage.setItem('username', this.state.username);
          localStorage.setItem('password', this.state.password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }

        localStorage.setItem('access', data.access.toString());
        localStorage.setItem('refresh', data.refresh.toString());
        localStorage.setItem('expires_at', data.expires_at.toString());
        localStorage.setItem('userType', data.userType.toString());
        localStorage.setItem('userId', data.userId.toString());
        this.props.setIsLoggedIn(true);
      })
      .catch(error => console.error(error));
    
      
  };



  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const username = rememberMe ? localStorage.getItem('username') || '' : '';
    const password = rememberMe ? localStorage.getItem('password') || '' : '';
  
    this.setState({ rememberMe, username, password });
  }

  private handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      this.handleLogin();
    }
  };

  public render() {
    return (
      <Box
        onKeyDown={this.handleKeyPress}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          padding: '1rem',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField fullWidth label="Username" variant="outlined" sx={{ mb: 2 }} value={this.state.username} onChange={this.handleUsernameChange} onKeyDown={this.handleKeyPress} />
        <TextField fullWidth label="Password" variant="outlined" sx={{ mb: 2 }} type="password" value={this.state.password} onChange={this.handlePasswordChange} onKeyDown={this.handleKeyPress} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FormControlLabel
        control={<Checkbox />}
        label={
            <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
            Remember Me
            </Typography>
        }
        onChange={this.handleRememberMeChange}
        />
          <MuiLink href="#" underline="hover" sx={{ fontSize: 14, ml: 'auto' }}>
            Forgot Password?
          </MuiLink>
        </Box>
        <Button component={Link} to="/" variant="contained" color="error" fullWidth onClick={this.handleLogin} sx={{ mb: 2, width: '70%' }}>
          Login
        </Button>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          If you haven't registered yet. <Link to="/register">Register</Link>
        </Typography>
      </Box>
    );
  }
}

export default LoginForm;
