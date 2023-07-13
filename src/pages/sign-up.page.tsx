import * as React from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

export interface ISignupPageProps {}

export interface ISignupPageState {
  username: string;
  usernameError: string;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  confirmPassword: string;
  confirmPasswordError: string;
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
  phoneNumber: string;
  phoneNumberError: string;
  userType: string;
  institutionId: string;
  institutionIdError: string;
  unitId: string
  unitIdError: string
}
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class SignupPage extends React.Component<
  ISignupPageProps,
  ISignupPageState
> {
  constructor(props: ISignupPageProps) {
    super(props);

    this.state = {
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirmPassword:'',
      confirmPasswordError:'',
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      phoneNumber: '',
      phoneNumberError: '',
      userType: 'NibcidOfficers',
      institutionId: '',
      institutionIdError: '',
      unitId: '',
      unitIdError: ''
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement | { id?: string; value: string }>) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [id!]: value,
    }));
  
    // Validate the field
    if (id === 'firstName') {
      if (value.trim() === '') {
        this.setState({ firstNameError: 'First name is required' });
      } else {
        this.setState({ firstNameError: '' });
      }
    }else  if (id === 'lastName') {
      if (value.trim() === '') {
        this.setState({ lastNameError: 'email is required' });
      } else {
        this.setState({ lastNameError: '' });
      }
    }else  if (id === 'email') {
      if (value.trim() === '') {
        this.setState({ emailError: 'email is required' });
      } else {
        this.setState({ emailError: '' });
      }
    }else if (id === 'password') {
      if (value.trim() === '') {
        this.setState({ passwordError: 'Password is required' });
      } else {
        this.setState({ passwordError: '' });
      }
    }else if (id === 'phoneNumber') {
      if (value.trim() === '') {
        this.setState({ phoneNumberError: 'Phone number is required' });
      } else {
        this.setState({ phoneNumberError: '' });
      }
    }else if (id === 'institutionId') {
      if (value.trim() === '') {
        this.setState({ institutionIdError: 'Institution number is required' });
      } else {
        this.setState({ institutionIdError: '' });
      }
    }else if (id === 'unitId') {
      if (value.trim() === '') {
        this.setState({ unitIdError: 'Unit number is required' });
      } else {
        this.setState({ unitIdError: '' });
      }
    }else if (id === 'username') {
      if (value.trim() === '') {
        this.setState({ usernameError: 'Username is required' });
      } else {
        this.setState({ usernameError: '' });
      }
    }else if (id === 'confirmPassword') {
      if (value.trim() === '') {
        this.setState({ confirmPasswordError: 'Confirm password is required' });
      } else {
        this.setState({ confirmPasswordError: '' });
      }
    }
  
    // Add validation for other fields
  };
  handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Students") {
      window.location.href = "/register"
    }
    else{
      this.setState({userType: event.target.value})
    }
  };
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!this.validateForm()) {
      return; // Stop form submission if validation fails
    }
    if (this.state.userType == "ProgramOfficers") {
      var raw = JSON.stringify({
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "phoneNumber": this.state.phoneNumber,
        "userType": this.state.userType,
        "institutionId": this.state.institutionId,
        "unitId": this.state.unitId
      });
    } else {
      var raw = JSON.stringify({
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "phoneNumber": this.state.phoneNumber,
        "userType": this.state.userType
      });
    }
    
    try {
      console.log("raw",raw);
      
        const response = await fetch(BACKEND_URL+'/auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: raw
        });
    
        const data = await response.json();
        console.log(data); // do something with the response data
        // window.location.reload();
      } catch (error) {
        alert(error);
      }
    
  };

  validateForm = () => {
    const { username, email, password, firstName, lastName, phoneNumber, institutionId, unitId, confirmPassword } = this.state;
    let isValid = true;
  
    // Perform validation for each field
    if (firstName.trim() === '') {
      this.setState({ firstNameError: 'First name is required' });
      isValid = false;
    } else {
      this.setState({ firstNameError: '' });
    }

    if (lastName.trim() === '') {
      this.setState({ lastNameError: 'Last name is required' });
      isValid = false;
    } else {
      this.setState({ lastNameError: '' });
    }

    if (username.trim() === '') {
      this.setState({ usernameError: 'Username is required' });
      isValid = false;
    } else {
      this.setState({ usernameError: '' });
    }

    if (email.trim() === '') {
      this.setState({ emailError: 'email is required' });
    } else {
      this.setState({ emailError: '' });
    }

    if (password.trim() === '') {
      this.setState({ passwordError: 'Password is required' });
    } else {
      this.setState({ passwordError: '' });
    }

    if (phoneNumber.trim() === '') {
      this.setState({ phoneNumberError: 'Phone number is required' });
    } else {
      this.setState({ phoneNumberError: '' });
    }

    if (institutionId.trim() === '') {
      this.setState({ institutionIdError: 'Institution number is required' });
    } else {
      this.setState({ institutionIdError: '' });
    }

    if (unitId.trim() === '') {
      this.setState({ unitIdError: 'Unit number is required' });
    } else {
      this.setState({ unitIdError: '' });
    }

    if (confirmPassword.trim() === '') {
      this.setState({ confirmPasswordError: 'Confirm Password is required' });
    } else {
      this.setState({ confirmPasswordError: '' });
    }
  
    // Add validation for other fields
  
    return isValid;
  };

  public render() {
    const { username, email, password, firstName, lastName, phoneNumber, userType } = this.state;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // center horizontally
          alignItems: "center", // center vertically
          height: "100vh", // make the container full height
          backgroundImage: `url('/background.png')`,
        }}
      >
        <Card sx={{ minWidth: "60%", padding: 3 }}>
        <Grid container spacing={2} textAlign={"center"}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: 700, color: "#2E3192"}}>
              Register
            </Typography>
          </Grid>
        </Grid>
        <form onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="signup-type">Signup Type</InputLabel>
              <Select
                labelId="userType"
                id="userType"
                label="Signup Type"
                defaultValue={"NibcidOfficers"}
                onChange={this.handleSelectChange}
                value={userType}
              >
                <MenuItem value={"ProgramOfficers"}>Program Officers</MenuItem>
                <MenuItem value={"Students"}>Student</MenuItem>
                <MenuItem value={"NibcidOfficers"}>Nibcid Officers</MenuItem>
                <MenuItem value={"NssCoordinators"}>Nss Co-ordinators</MenuItem>
              </Select>
            </FormControl>
            <TextField id="firstName" label="First Name" variant="outlined" fullWidth onChange={this.handleChange} error={!!this.state.firstNameError}
  helperText={this.state.firstNameError}/>
            <TextField id="phoneNumber" label="Phone Number" variant="outlined" fullWidth onChange={this.handleChange} error={!!this.state.phoneNumberError}
  helperText={this.state.phoneNumberError}/>
            <TextField id="password" label="Password" variant="outlined" fullWidth onChange={this.handleChange} type="password" error={!!this.state.passwordError}
  helperText={this.state.passwordError}/>
            <TextField id="institutionId" label="Institution Id" variant="outlined" fullWidth onChange={this.handleChange} error={!!this.state.institutionIdError}
  helperText={this.state.institutionIdError}/>
          </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField id="email" label="Email ID" variant="outlined" fullWidth onChange={this.handleChange} error={!!this.state.emailError}
  helperText={this.state.emailError}/>
              <TextField id="lastName" label="Last Name" variant="outlined" fullWidth onChange={this.handleChange} error={!!this.state.lastNameError}
  helperText={this.state.lastNameError}/>
              <TextField id="username" label="User Name" variant="outlined" fullWidth onChange={this.handleChange} error={!!this.state.usernameError}
  helperText={this.state.usernameError}/>
              <TextField id="confirmPassword" label="Confirm Password" variant="outlined" fullWidth onChange={this.handleChange} type="password" error={!!this.state.confirmPasswordError}
  helperText={this.state.confirmPasswordError}/>
              <TextField id="unitId" label="Unit ID" variant="outlined" fullWidth onChange={this.handleChange} error={!!this.state.unitIdError}
  helperText={this.state.unitIdError}/>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} textAlign={"center"} sx={{marginTop: 3}}>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">Submit</Button>
          </Grid>
        </Grid>
        </form>
        </Card>
      </Box>
    );
  }
}
