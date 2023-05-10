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
import { Button } from '@mui/material';
import Modal from "@mui/material/Modal";
import EventApprovalForm from '../components/event-approval-form.component';

export interface IAppProps {
}

export interface IAppState {
  rows: GridRowsProp
  open: boolean
  objData: any,
  searchkeyword: any,
  student_name: any,
  studentId: any
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class ApprovalsPage extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      rows: [],
      open: false,
      objData: 1,
      searchkeyword: undefined,
      student_name: undefined,
      studentId: undefined
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState({searchkeyword: value})
    let url = "";
    if (value.length > 0) {
      url = BACKEND_URL+'/programOfficer/studentEventApprovalList?page=1&page_size=20&search='+value;
    }
    else{
      url = BACKEND_URL+'/programOfficer/studentEventApprovalList?page=1&page_size=20';
    }
    console.log(url)
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
        for (let i = 0; i < data.data.length; i++) {
          const element = data.data[i];
          if (element.status == "Pending") {
            const rowobj = { 
              id: i+1, 
              student_name: element.studentName,
              student_id: element.studentId,
              no_of_hrs_completed: element.noOfHrsCompleted,
              no_of_events_completed: element.noOfEventParticipated,
              status: element.status,
              api_id: element.id
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
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(BACKEND_URL+'/programOfficer/studentEventApprovalList?page=1&page_size=20', {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const rowdata:any = [];
        for (let i = 0; i < data.data.length; i++) {
          const element = data.data[i];
          if (element.status == "Pending") {
            const rowobj = { 
              id: i+1, 
              student_name: element.studentName,
              student_id: element.studentId,
              no_of_hrs_completed: element.noOfHrsCompleted,
              no_of_events_completed: element.noOfEventParticipated,
              status: element.status,
              api_id: element.id
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
    const handleClose = () => {
      this.setState({ open: false });
    }
  
    const handleOpen = (id: any, studentname: any) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
      fetch(BACKEND_URL+"/programOfficer/studentEventApproveViewList/"+id+"/", {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          // console.log(result)
          
          this.setState({ objData: result.data });
          this.setState({ open: true });
          this.setState({ student_name: studentname });
          this.setState({ studentId: id });
          
        })
        .catch(error => console.log('error', error));

    }
    
    const { rows } = this.state;
    const onPageChange = (params: any) => {
      console.log(params);
      // Handle page change here, e.g. fetch data for new page
    };
    const columns: GridColDef[] = [
      { field: 'id', headerName: '#', width: 30, headerClassName: 'super-app-theme--header' },
      { field: 'student_name', headerName: 'Student Name', width: 150, headerClassName: 'super-app-theme--header' },
      { field: 'student_id', headerName: 'Student ID', width: 150, headerClassName: 'super-app-theme--header' },
      { field: 'no_of_hrs_completed', headerName: 'Number of hrs completed', width: 200, headerClassName: 'super-app-theme--header' },
      { field: 'no_of_events_completed', headerName: 'No of events participated', width: 200, headerClassName: 'super-app-theme--header' },
      { field: 'status', headerName: 'Status', width: 150, headerClassName: 'super-app-theme--header' },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
          const { api_id } = params.row;
          const { student_name } = params.row;
          return <Button onClick={() => { handleOpen(api_id, student_name) }}>
                    <img
                      src={`/Vector(2).png`}
                      loading="lazy"
                    />
                </Button>;
        }
      },
    ];
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
            Approvals
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="outlined-basic" onChange={this.handleChange} label="Search by Student Name" variant="outlined" sx={{ width: '100%', marginBottom: 3, marginTop: 3 }} />
          </Grid>
        </Grid>
        <ListView rows={rows} columns={columns} onPageChange={onPageChange} />
        <Modal
            open={this.state.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box  sx={style}>
              <EventApprovalForm objData={this.state.objData} studentName={this.state.student_name} studentId={this.state.studentId} />
            </Box>
        </Modal>
      </Box>
    );
  }
}
