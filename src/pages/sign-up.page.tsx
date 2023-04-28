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
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
  institutionId: string
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
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      userType: 'NibcidOfficers',
      institutionId: ''
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement | { id?: string; value: unknown }>) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [id!]: value,
    }));
  };
  handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Students") {
      window.location.href = "/register"
    }
  };
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.userType == "ProgramOfficers") {
      var raw = JSON.stringify({
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "phoneNumber": this.state.phoneNumber,
        "userType": this.state.userType,
        "institutionId": this.state.institutionId
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
        const response = await fetch(BACKEND_URL+'/auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: raw
        });
    
        const data = await response.json();
        console.log(data); // do something with the response data
        window.location.reload();
      } catch (error) {
        alert(error);
      }
    
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
            <TextField id="firstName" label="First Name" variant="outlined" fullWidth onChange={this.handleChange} />
            <TextField id="phoneNumber" label="Phone Number" variant="outlined" fullWidth onChange={this.handleChange} />
            <TextField id="password" label="Password" variant="outlined" fullWidth onChange={this.handleChange} type="password" />
            <TextField id="institutionId" label="Institution Id" variant="outlined" fullWidth onChange={this.handleChange} />
          </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField id="email" label="Email ID" variant="outlined" fullWidth onChange={this.handleChange} />
              <TextField id="lastName" label="Last Name" variant="outlined" fullWidth onChange={this.handleChange} />
              <TextField id="username" label="User Name" variant="outlined" fullWidth onChange={this.handleChange} />
              <TextField id="confirmPassword" label="Confirm Password" variant="outlined" fullWidth onChange={this.handleChange} type="password" />
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
