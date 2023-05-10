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
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Icon from '@mui/material/Icon';

export interface IAppProps {
}

export interface IAppState {
  rows: GridRowsProp,
  searchkeyword: any
}
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 30, headerClassName: 'super-app-theme--header' },
  { field: 'institution_name', headerName: 'Institution Name', width: 250, headerClassName: 'super-app-theme--header' },
  { field: 'no_of_program_officers', headerName: 'Number Of Program Officers', width: 250, headerClassName: 'super-app-theme--header' },
  { field: 'no_of_nss_volunteers', headerName: 'No Of NSS Volunteers', width: 250, headerClassName: 'super-app-theme--header' },
  { field: 'no_of_events_organized', headerName: 'No Of Events Organized', width: 250, headerClassName: 'super-app-theme--header' },
];

export default class InstitutionPage extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      rows: [],
      searchkeyword: undefined
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState({searchkeyword: value})
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    let url = "";
    if (value.length > 0) {
      url = BACKEND_URL+'/nibcidOfficer/institutionList?page=1&page_size=20&search='+value;
    }
    else{
      url = BACKEND_URL+'/nibcidOfficer/institutionList?page=1&page_size=20';
    }
    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        const rowdata:any = [];
        for (let i = 0; i < data.data.length; i++) {
          const element = data.data[i];
          const rowobj = { 
                            id: i+1, 
                            institution_name: element.institutionName, 
                            no_of_program_officers: element.noOfProgramOfficers,  
                            no_of_nss_volunteers: element.noOfVolunteers,  
                            no_of_events_organized: element.eventList 
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
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(BACKEND_URL+'/nibcidOfficer/institutionList?page=1&page_size=20&search=', {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        const rowdata:any = [];
        for (let i = 0; i < data.data.length; i++) {
          const element = data.data[i];
          const rowobj = { 
                            id: i+1, 
                            institution_name: element.institutionName, 
                            no_of_program_officers: element.noOfProgramOfficers,  
                            no_of_nss_volunteers: element.noOfVolunteers,  
                            no_of_events_organized: element.eventList 
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
      // Handle page change here, e.g. fetch data for new page
    };
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Institutions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="outlined-basic" onChange={this.handleChange} label="Search by Institution Name" variant="outlined" sx={{ width: '100%', marginBottom: 3, marginTop: 3 }} />
          </Grid>
          {/* <Grid item xs={1}>
            <Icon sx={{ width: '50%', marginBottom: 3, marginTop: 4, height: "100%" }}>
              <img src="/pdf_icon.png" alt="My Icon" />
            </Icon>
            <Icon sx={{ width: '50%', marginBottom: 3, marginTop: 4, height: "100%" }}>
              <img src="/xls_icon.png" alt="My Icon" />
            </Icon>
          </Grid> */}
        </Grid>
        
        <ListView rows={rows} columns={columns} onPageChange={onPageChange} />
      </Box>
    );
  }
}
