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
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddStudentForm from '../components/add-student.component';

export interface IAppProps {
}

export interface IAppState {
  rows: GridRowsProp,
  open: boolean,
  searchkeyword: any
}

const columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 30, headerClassName: 'super-app-theme--header' },
  { field: 'student_name', headerName: 'Student Name', width: 150, headerClassName: 'super-app-theme--header' },
  { field: 'student_id', headerName: 'Student ID', width: 150, headerClassName: 'super-app-theme--header' },
  { field: 'institution_name', headerName: 'Institution Name', width: 150, headerClassName: 'super-app-theme--header' },
  { field: 'no_of_hrs_completed', headerName: 'Number of hrs completed', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'no_of_events_completed', headerName: 'No of events participated', width: 200, headerClassName: 'super-app-theme--header' },
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class StudentPage extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      open: false,
      rows: [],
      searchkeyword: undefined
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState({searchkeyword: value})
    const userType = localStorage.getItem('userType');
    let url = "";
    if (userType == "ProgramOfficers") {
      if (value.length > 0) {
        url = BACKEND_URL+'/programOfficer/studentList?page=1&page_size=20&search='+value;
      }
      else{
        url = BACKEND_URL+'/programOfficer/studentList?page=1&page_size=20';
      }
    }
    else if (userType == "NibcidOfficers") {
      if (value.length > 0) {
        url = BACKEND_URL+'/nibcidOfficer/studentList?page=1&page_size=20&search='+value;
      }
      else{
        url = BACKEND_URL+'/nibcidOfficer/studentList?page=1&page_size=20';
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
        const rowdata:any = [];
        for (let i = 0; i < data.data.length; i++) {
          const element = data.data[i];
          if (userType == "ProgramOfficers") {
            const rowobj = { 
              id: i+1, 
              student_name: element.firstName+" "+element.lastName,
              student_id: element.studentId,
              institution_name: element.institution.institutionName,
              no_of_hrs_completed: element.noOfHrsCompleted,
              no_of_events_completed: element.noOfEventParticipated,
            }
            rowdata.push(rowobj);
          }
          else if (userType == "NibcidOfficers") {
            const rowobj = { 
              id: i+1, 
              student_name: element.studentName,
              student_id: element.studentId,
              institution_name: element.instutionName,
              no_of_hrs_completed: element.noOfHrsCompleted,
              no_of_events_completed: element.noOfEventParticipated,
            }
            rowdata.push(rowobj);
          }
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
      url = BACKEND_URL+'/programOfficer/studentList?page=1&page_size=20';
    }
    else if (userType == "NibcidOfficers") {
      url = BACKEND_URL+'/nibcidOfficer/studentList?page=1&page_size=20';
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data)
        const rowdata:any = [];
        for (let i = 0; i < data.data.length; i++) {
          const element = data.data[i];
          if (userType == "ProgramOfficers") {
            const rowobj = { 
              id: i+1, 
              student_name: element.firstName+" "+element.lastName,
              student_id: element.id,
              institution_name: element.institution.institutionName,
              no_of_hrs_completed: element.noOfHrsCompleted,
              no_of_events_completed: element.noOfEventParticipated,
            }
            rowdata.push(rowobj);
          }
          else if (userType == "NibcidOfficers") {
            const rowobj = { 
              id: i+1, 
              student_name: element.studentName,
              student_id: element.studentId,
              institution_name: element.instutionName,
              no_of_hrs_completed: element.noOfHrsCompleted,
              no_of_events_completed: element.noOfEventParticipated,
            }
            rowdata.push(rowobj);
          }
        }
        this.setState({ rows: rowdata });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  public render() {
    const userType = localStorage.getItem('userType');
    const { rows } = this.state;
    const onPageChange = (params: any) => {
      // Handle page change here, e.g. fetch data for new page
    };

    const handleOpen = () => {
      this.setState({ open: true });
    }

    const handleClose = () => {
      this.setState({ open: false });
    }
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Students
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="outlined-basic" onChange={this.handleChange} label="Search by Student Name" variant="outlined" sx={{ width: '100%', marginBottom: 3, marginTop: 3 }} />
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
        {userType === 'ProgramOfficers' &&
        <Button variant="outlined" style={{marginBottom: 10}} onClick={() => {
          handleOpen()
        }}>Add Student</Button>
        }
        <ListView rows={rows} columns={columns} onPageChange={onPageChange} />
        <Modal
        open={this.state.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddStudentForm/>
        </Box>
      </Modal>
      </Box>
    );
  }
}
