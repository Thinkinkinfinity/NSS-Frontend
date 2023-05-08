
import * as React from 'react';
import ListView from '../components/data-grid.component';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Icon from '@mui/material/Icon';

export interface IEventsCompletedPageProps {
}

export interface IEventsCompletedPageState {
  searchkeyword: string
  rows: GridRowsProp
}
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 30, headerClassName: 'super-app-theme--header' },
  { field: 'event_name', headerName: 'Event Name', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'event_date', headerName: 'Event Date', width: 150, headerClassName: 'super-app-theme--header' },
  { field: 'event_type', headerName: 'Event Type', width: 150, headerClassName: 'super-app-theme--header' },
  { field: 'event_location', headerName: 'Event Location', width: 150, headerClassName: 'super-app-theme--header' },
  { field: 'event_description', headerName: 'Event Description', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'event_service_hours', headerName: 'Service Hours', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'attend_count', headerName: 'Attendee Count', width: 200, headerClassName: 'super-app-theme--header' },
];

export default class EventsCompletedPage extends React.Component<IEventsCompletedPageProps, IEventsCompletedPageState> {
  constructor(props: IEventsCompletedPageProps) {
    super(props);

    this.state = {
      rows: [],
      searchkeyword: ""
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState({searchkeyword: value})
    const userType = localStorage.getItem('userType');
    let url = "";
    if (userType == "ProgramOfficers") {
      if (value.length > 0) {
        url = BACKEND_URL+'/programOfficer/event?page=1&page_size=20&search='+value;
      }
      else{
        url = BACKEND_URL+'/programOfficer/event?page=1&page_size=20';
      }
    }
    else if (userType == "NibcidOfficers") {
      if (value.length > 0) {
        url = BACKEND_URL+'/nibcidOfficer/eventList?page=1&page_size=20&search='+value;
      }
      else{
        url = BACKEND_URL+'/nibcidOfficer/eventList?page=1&page_size=20';
      }
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const rowdata:any = [];
        for (let i = 0; i < data.data.CompletedEvents.length; i++) {
          const element = data.data.CompletedEvents[i];
          const rowobj = { 
                            id: i+1, 
                            event_name: element.eventName,
                            event_date: element.eventDate,
                            event_type: element.eventType,
                            event_location: element.eventLocation,
                            event_description: element.eventDescription,
                          }
          rowdata.push(rowobj);
        }
        this.setState({ rows: rowdata });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  public componentDidMount() {
    const userType = localStorage.getItem('userType');
    let url = "";
    if (userType == "ProgramOfficers") {
      if (this.state.searchkeyword.length > 0) {
        url = BACKEND_URL+'/programOfficer/event?page=1&page_size=20';
      }
      else{
        url = BACKEND_URL+'/programOfficer/event?page=1&page_size=20';
      }
    }
    else if (userType == "NibcidOfficers") {
      url = BACKEND_URL+'/nibcidOfficer/eventList?page=1&page_size=20';
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const rowdata:any = [];
        for (let i = 0; i < data.data.CompletedEvents.length; i++) {
          const element = data.data.CompletedEvents[i];
          const rowobj = { 
                            id: i+1, 
                            event_name: element.eventName,
                            event_date: element.eventDate,
                            event_type: element.eventType,
                            event_location: element.eventLocation,
                            event_description: element.eventDescription,
                          }
          rowdata.push(rowobj);
        }
        this.setState({ rows: rowdata });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  public render() {
    const { rows } = this.state;
    const onPageChange = (params: any) => {
      console.log(params);
      // Handle page change here, e.g. fetch data for new page
    };
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Completed Events
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <TextField id="outlined-basic" onChange={this.handleChange} label="Search by Event Name" variant="outlined" sx={{ width: '100%', marginBottom: 3, marginTop: 3 }} />
          </Grid>
          <Grid item xs={1}>
            <Icon sx={{ width: '50%', marginBottom: 3, marginTop: 4, height: "100%" }}>
              <img src="/pdf_icon.png" alt="My Icon" />
            </Icon>
            <Icon sx={{ width: '50%', marginBottom: 3, marginTop: 4, height: "100%" }}>
              <img src="/xls_icon.png" alt="My Icon" />
            </Icon>
          </Grid>
        </Grid>
        <ListView rows={rows} columns={columns} onPageChange={onPageChange} />
      </Box>
    );
  }
}
