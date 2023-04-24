import React, { Component } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

type SignupFormState = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
};

class SignupComponent extends Component<{}, SignupFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      userType: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name!]: value,
    }));
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // Use the formData object to make API call or perform other operations
    console.log(formData.get('username')); 
    console.log(Object.fromEntries(formData));
    var raw = JSON.stringify({
        "username": "rohit",
        "email": "rohit@gmail.com",
        "password": "password",
        "firstName": "rohit",
        "lastName": "g",
        "phoneNumber": "9962140087",
        "userType": "NibcidOfficers"
      });
    try {
        const response = await fetch('http://127.0.0.1:8000/auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: raw
        });
    
        const data = await response.json();
        console.log(data); // do something with the response data
      } catch (error) {
        console.error(error);
      }
    
  };

  render() {
    const { username, email, password, firstName, lastName, phoneNumber, userType } = this.state;

    return (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={username}
            size="small"
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={email}
            size="small"
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            size="small"
            value={password}
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={firstName}
            size="small"
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastName"
            value={lastName}
            size="small"
            onChange={this.handleChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            size="small"
            onChange={this.handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="userTypeLabel" size="small">User Type</InputLabel>
            <Select
              labelId="userTypeLabel"
              id="userType"
              name="userType"
              size="small"
              value={userType}
            >
              <MenuItem value="NibcidOfficers">NibcidOfficers</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" size="small" 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                margin: 'auto',
                marginTop: '1rem',
              }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
      
    );
  }
}

export default SignupComponent;