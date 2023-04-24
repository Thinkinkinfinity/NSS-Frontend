import * as React from 'react';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export interface IActivityUpdateFormProps {
}

export interface IActivityUpdateFormState {
    selectedFiles: Array<any>
}

export default class ActivityUpdateForm extends React.Component<IActivityUpdateFormProps, IActivityUpdateFormState> {
  constructor(props: IActivityUpdateFormProps) {
    super(props);

    this.state = {
        selectedFiles: [],
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    
  };
  handleFileChange = (event: any) => {
    console.log(event.target.files)
    const files = event.target.files;
    const fileNames = Array.from(files as FileList).map((file) => file.name);
  this.setState({ selectedFiles: fileNames });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // Use the formData object to make API call or perform other operations
    console.log(formData.get('username')); 
    
  };
  
  public render() {
    return (
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
                        label="Partcipant type"
                        name="servicehours"
                        size="small"
                        onChange={this.handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} textAlign={'center'}>
                <Grid item xs={12}>
                    <div style={{alignItems: "center"}}>
                        <input accept="image/*" style={{display: "none"}} id="icon-button-file" type="file" multiple onChange={this.handleFileChange}/>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        {this.state.selectedFiles.length > 0 && (
                        <p style={{fontSize: 7}}>Selected files: {this.state.selectedFiles.join(', ')}</p>
                        )}
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
                Update
            </Button>
        </form>
    );
  }
}
