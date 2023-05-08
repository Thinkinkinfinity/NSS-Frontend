import * as React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
export interface IAddEventFormProps {
}

export interface IAddEventFormState {
    eventType: any,
    eventName: any,
    eventDate: any,
    eventLocation: any,
    eventDescription: any,
    eventParticipantType: any
}
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export default class AddEventForm extends React.Component<IAddEventFormProps, IAddEventFormState> {
  constructor(props: IAddEventFormProps) {
    super(props);

    this.state = {
        eventType: "",
        eventName: "",
        eventDate: "",
        eventLocation: "",
        eventDescription: "",
        eventParticipantType: ""
    }
  }
  handleSelectChange = (event: SelectChangeEvent) => {
    const  value = event.target.value;
    this.setState((prevState) => ({
        ...prevState,
        ["eventType"]: value
    }));
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  }
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    
    var formdata = new FormData();
    formdata.append("eventType", this.state.eventType);
    formdata.append("eventName", this.state.eventName);
    formdata.append("eventDate", this.state.eventDate);
    formdata.append("eventLocation", this.state.eventLocation);
    formdata.append("eventDescription", this.state.eventDescription);
    
    fetch(BACKEND_URL+'/programOfficer/event/', {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
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
        Add Event
        </Typography>
        <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Event Name"
                        name="eventName"
                        id='eventName'
                        required
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker 
                            defaultValue={dayjs(new Date())} 
                            disablePast 
                            sx={{width: "100%", marginTop: "15px"}} 
                            onChange={(newValue) => {
                                console.log(newValue?.format("YYYY-MM-DD"));
                                this.setState({ eventDate: newValue?.format("YYYY-MM-DD") });
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Event Description"
                        name="eventdescription"
                        id='eventDescription'
                        multiline
                        rows={4}
                        required
                        onChange={this.handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Location"
                        name="eventLocation"
                        id='eventLocation'
                        required
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{marginTop: "15px"}}>
                        <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.eventType}
                            label="Event Type"
                            onChange={this.handleSelectChange}
                        >
                            <MenuItem value={"Individual"}>Individual</MenuItem>
                            <MenuItem value={"Group"}>Group</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit"
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
