import * as React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export interface IAddEventFormProps {
}

export interface IAddEventFormState {
}

export default class AddEventForm extends React.Component<IAddEventFormProps, IAddEventFormState> {
  constructor(props: IAddEventFormProps) {
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
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Event Name"
                        name="eventname"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Event Date"
                        name="eventdate"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Event Description"
                        name="eventdescription"
                        size="small"
                        multiline
                        rows={4}
                        onChange={this.handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Location"
                        name="eventname"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Event Type"
                        name="eventtype"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Service Hours"
                        name="servicehours"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Partcipant Type"
                        name="partcipanttype"
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
