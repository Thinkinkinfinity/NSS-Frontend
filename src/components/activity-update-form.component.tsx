import * as React from 'react';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export interface IActivityUpdateFormProps {
    objData: any
}

export interface IActivityUpdateFormState {
    selectedFiles: Array<any>,
    objData: any
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class ActivityUpdateForm extends React.Component<IActivityUpdateFormProps, IActivityUpdateFormState> {
  constructor(props: IActivityUpdateFormProps) {
    super(props);

    this.state = {
        selectedFiles: [],
        objData: {}
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    
  };
  handleFileChange = (event: any) => {
    console.log(event.target.files)
    const files = event.target.files;
    // const fileNames = Array.from(files as FileList).map((file) => file.name);
  this.setState({ selectedFiles: files });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userid = localStorage.getItem('userId')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    
    var formdata = new FormData();
    // Loop through the selected files and append them to the FormData object
    for (let i = 0; i < this.state.selectedFiles.length; i++) {
        formdata.append('eventImages', this.state.selectedFiles[i]);
    }

    // Add other form data values to the FormData object
    formdata.append('userId', userid ? userid : '');
    formdata.append('eventId', this.props.objData.id);

    fetch(BACKEND_URL+"/student/studentEvent/", {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result);
        window.location.reload();
        })
      .catch(error => console.log('error', error));    
  };
  componentDidMount(): void {
    //   console.log(this.props.objData)
  }
  public render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Event Name"
                        name="eventname"
                        size="small"
                        disabled
                        value={this.props.objData.eventName}
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
                        disabled
                        value={this.props.objData.eventDate}
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
                        disabled
                        value={this.props.objData.eventDescription}
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
                        disabled
                        value={this.props.objData.eventLocation}
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
                        disabled
                        value={this.props.objData.eventType}
                        onChange={this.handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} textAlign={'center'} style={{display: "none"}}>
                <Grid item xs={12}>
                    <div style={{alignItems: "center"}}>
                        <input accept="image/*" style={{display: "none"}} id="icon-button-file" type="file" multiple onChange={this.handleFileChange}/>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        {/* {this.state.selectedFiles.length > 0 && (
                        <p style={{fontSize: 7}}>Selected files: {this.state.selectedFiles.join(', ')}</p>
                        )} */}
                    </div>
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
                Attend
            </Button>
        </form>
    );
  }
}
