import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button, Link as MuiLink, SelectChangeEvent } from '@mui/material';

interface ILoginFormProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

interface ILoginFormState {
  loginType: string;
  username: string;
  password: string;
  rememberMe: boolean;
}
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  constructor(props: ILoginFormProps) {
    super(props);

    this.state = {
      loginType: '',
      username: '',
      password: '',
      rememberMe: false,
    };
  }

  private handleLoginTypeChange = (event: SelectChangeEvent<unknown>) => {
    this.setState({ loginType: event.target.value as string });
  };

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
        localStorage.setItem('access', data.access.toString());
        localStorage.setItem('refresh', data.refresh.toString());
        localStorage.setItem('userType', data.userType.toString());
        localStorage.setItem('userId', data.userId.toString());
        this.props.setIsLoggedIn(true);
      })
      .catch(error => console.error(error));
  };
  
  public render() {
    return (
      <Box
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
          Login As
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="login-type-label">Login Type</InputLabel>
          <Select
            labelId="login-type-label"
            id="login-type-select"
            label="Login Type"
            onChange={this.handleLoginTypeChange}
            value={this.state.loginType}
          >
            <MenuItem value="ProgramOfficers">Program Officers</MenuItem>
            <MenuItem value="Students">Student</MenuItem>
            <MenuItem value="NibcidOfficers">Nibcid Officers</MenuItem>
            <MenuItem value="NssCoordinators">Nss Co-ordinators</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Username" variant="outlined" sx={{ mb: 2 }} value={this.state.username} onChange={this.handleUsernameChange} />
        <TextField fullWidth label="Password" variant="outlined" sx={{ mb: 2 }} type="password" value={this.state.password} onChange={this.handlePasswordChange} />
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
