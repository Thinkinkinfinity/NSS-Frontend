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

export interface IStudentRegisterPageProps {}

export interface IStudentRegisterPageState {
    username: any,
    email: any,
    password: any,
    firstName: any,
    lastName: any,
    phoneNumber: any,
    institutionId: any,
    unitId: any,
    programOfficerId: any,
    userType: any
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_TOKEN = process.env.REACT_APP_BACKEND_TOKEN;

export default class StudentRegisterPage extends React.Component<
  IStudentRegisterPageProps,
  IStudentRegisterPageState
> {
  constructor(props: IStudentRegisterPageProps) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      institutionId: "",
      unitId: "",
      programOfficerId: "",
      userType: "Students"
    };
  }

  public render() {
    const handleChange = (event: SelectChangeEvent) => {
      if (event.target.value != "Students") {
        window.location.href = "/sign-up"
      }
    };
    const handleChangeOthers = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      this.setState((prevState) => ({
        ...prevState,
        [id]: value
      }));
    }
    const handleSubmit = () => {
      console.log("handleSubmit")

      const url = BACKEND_URL+'/auth/register/';
      const data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        institutionId: this.state.institutionId,
        unitId: this.state.unitId,
        programOfficerId:this.state.programOfficerId,
        userType: this.state.userType
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
          alert("success")
          window.location.href = "/login"
        })
        .catch(error => console.error(error));
    }
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
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="signup-type">Signup Type</InputLabel>
              <Select
                labelId="userType"
                id="userType"
                label="Signup Type"
                onChange={handleChange}
                defaultValue={"Students"}
                value={this.state.userType}
              >
                <MenuItem value={"ProgramOfficers"}>Program Officers</MenuItem>
                <MenuItem value={"Students"}>Student</MenuItem>
                <MenuItem value={"NibcidOfficers"}>Nibcid Officers</MenuItem>
                <MenuItem value={"NssCoordinators"}>Nss Co-ordinators</MenuItem>
              </Select>
            </FormControl>
            <TextField id="institutionId" label="Institution ID" variant="outlined" onChange={handleChangeOthers} fullWidth value={this.state.institutionId} />
            <TextField id="email" label="Email ID" variant="outlined" fullWidth value={this.state.email} onChange={handleChangeOthers}/>
            <TextField id="username" label="username" variant="outlined" fullWidth value={this.state.username} onChange={handleChangeOthers}/>
          </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2}>
              <TextField id="firstName" label="First Name" variant="outlined" fullWidth value={this.state.firstName} onChange={handleChangeOthers} />
              <TextField id="unitId" label="Unit ID" variant="outlined" fullWidth value={this.state.unitId} onChange={handleChangeOthers} />
              <TextField id="phoneNumber" label="Phone Number" variant="outlined" fullWidth value={this.state.phoneNumber} onChange={handleChangeOthers} />
              <TextField id="password" label="Password" variant="outlined" fullWidth type="password" value={this.state.password} onChange={handleChangeOthers} />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2}>
              <TextField id="lastName" label="Last Name" variant="outlined" fullWidth value={this.state.lastName} onChange={handleChangeOthers} />
              <TextField id="programOfficerId" label="Program Officer ID" variant="outlined" fullWidth value={this.state.programOfficerId} onChange={handleChangeOthers} />
              <TextField id="bloodGroup" label="Blood Group" variant="outlined" fullWidth onChange={handleChangeOthers} />
              <TextField id="studentId" label="Student ID" variant="outlined" fullWidth onChange={handleChangeOthers} />
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} textAlign={"center"} sx={{marginTop: 3}}>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
        </Card>
      </Box>
    );
  }
}
