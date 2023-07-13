import * as React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export interface IAddStudentFormProps {
}

export interface IAddStudentFormState {
    username: any,
    email: any,
    password: any,
    firstName: any,
    lastName: any,
    phoneNumber: any, 
    institutionId: any,
    unitId: any,
    userType: any,
    officerId: any
}
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class AddStudentForm extends React.Component<IAddStudentFormProps, IAddStudentFormState> {
  constructor(props: IAddStudentFormProps) {
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
      userType: "Students",
      officerId: localStorage.getItem('userId')
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    
    var raw = JSON.stringify({
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "phoneNumber": this.state.phoneNumber,
        "institutionId": this.state.institutionId,
        "unitId": this.state.unitId,
        "userType": this.state.userType,
        "officerId": this.state.officerId
      });
      
    fetch(BACKEND_URL+'/programOfficer/addStudent/', {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        window.location.reload()
        })
      .catch(error => console.log('error', error));
    
  };

  public render() {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
        Add Student
        </Typography>
        <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name"
                        name="firstname"
                        size="small"
                        id='firstName'
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Unit Number"
                        name="unitnumber"
                        size="small"
                        id='unitId'
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Phone Number"
                        name="phonenumber"
                        size="small"
                        id='phoneNumber'
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        id='password'
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        name="lastname"
                        size="small"
                        id='lastName'
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Program Officer ID"
                        name="programofficer"
                        size="small"
                        id='officerId'
                        value={this.state.officerId}
                        InputProps={{
                            readOnly: true,
                        }}
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="User Name"
                        name="username"
                        size="small"
                        id='username'
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Institution ID"
                        name="institutionname"
                        size="small"
                        id='institutionId'
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email ID"
                        name="emailid"
                        size="small"
                        id='email'
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Blood Group"
                        name="bloodgroup"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit" size="small" 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '8%',
                    margin: 'auto',
                    marginTop: '1rem',
                    fontWeight:'bolder',
                }}
            >
                Save
            </Button>
        </form>
      </div>
    );
  }
}
