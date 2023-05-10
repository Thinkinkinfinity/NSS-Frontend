import * as React from 'react';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
export interface IEventApprovalFormProps {
    objData: any,
    studentName: any,
    studentId: any
}

export interface IEventApprovalFormState {
    comments: any,
    eventId: any,
    noOfHrsCompleted: any,
    studentId: any
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class EventApprovalForm extends React.Component<IEventApprovalFormProps, IEventApprovalFormState> {
  constructor(props: IEventApprovalFormProps) {
    super(props);
    this.state = {
        comments: undefined,
        eventId: undefined,
        noOfHrsCompleted: undefined,
        studentId: undefined
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  }
  handleFileChange = (event: any) => {
  };
  handleSubmit = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    
    var raw = JSON.stringify({
        "eventId": this.props.objData[0].id,
        "studentId": [
          {
            "id": this.props.studentId
          }
        ],
        "status": "Approved",
        "comments": this.state.comments,
        "noOfHrsCompleted": parseInt(this.state.noOfHrsCompleted)
      });
      
    fetch(BACKEND_URL+'/programOfficer/eventApproval/', {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      })
      .then(response => response.text())
      .then(result => {
        window.location.reload()
        })
      .catch(error => console.log('error', error));
};
  componentDidMount(): void {
  }
  public render() {
    return (
        <div>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src="/1.jpeg"/>
                    <Stack spacing={0}>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.props.studentName}
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            {this.props.objData[0].eventDate}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={0}>
                    <Grid container spacing={1}>
                        <Grid item md={12} >
                            <Typography variant="subtitle1" gutterBottom>
                                Activity Type
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                {this.props.objData[0].eventType}
                            </Typography>
                        </Grid>
                        <Grid item md={12} >
                            <Typography variant="subtitle1" gutterBottom>
                                Event Name
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                {this.props.objData[0].eventName}
                            </Typography>
                        </Grid>
                        <Grid item md={12} >
                            <Typography variant="subtitle1" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                {this.props.objData[0].eventDescription}
                            </Typography>
                        </Grid>
                        <Grid item md={12} >
                            
                        </Grid>
                        <Grid item md={12} >
                            <TextField id="noOfHrsCompleted" label="Service Hours Rewarded" variant="outlined" fullWidth onChange={this.handleChange} />
                        </Grid>
                        <Grid item md={12} >
                        </Grid>
                        <Grid item md={12} >
                            <TextField id="comments" label="Comments" variant="outlined" fullWidth multiline rows={4} onChange={this.handleChange} />
                        </Grid>
                        <Grid item md={12} >
                        </Grid>
                        <Grid item md={12} textAlign={"center"}>
                            <Button variant="contained" color="success" onClick={this.handleSubmit}>Approve</Button>
                        </Grid>
                    </Grid> 
                </Stack>
            </Stack>

        </div>
    );
  }
}
