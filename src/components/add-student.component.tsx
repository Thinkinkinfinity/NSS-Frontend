import * as React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export interface IAddStudentFormProps {
}

export interface IAddStudentFormState {
}

export default class AddStudentForm extends React.Component<IAddStudentFormProps, IAddStudentFormState> {
  constructor(props: IAddStudentFormProps) {
    super(props);

    this.state = {
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // Use the formData object to make API call or perform other operations
    console.log(formData.get('username')); 
    
  };

  public render() {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
        Add Student
        </Typography>
        <form>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="First Name"
                        name="firstname"
                        size="small"
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Unit Number"
                        name="unitnumber"
                        size="small"
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Phone Number"
                        name="phonenumber"
                        size="small"
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        name="lastname"
                        size="small"
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Program Officer"
                        name="programofficer"
                        size="small"
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Student ID"
                        name="studentid"
                        size="small"
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Institution Name"
                        name="institutionname"
                        size="small"
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Email ID"
                        name="emailid"
                        size="small"
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
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
                    width: '50%',
                    margin: 'auto',
                    marginTop: '1rem',
                }}
            >
                Save
            </Button>
        </form>
      </div>
    );
  }
}
