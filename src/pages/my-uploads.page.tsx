import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
const itemData: any = [
  
];

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
export interface IMyUploadsPageProps {
}

export interface IMyUploadsPageState {
  rows: any,
  open: boolean,
  selected_event: string,
  selectedFiles: any,
  selectedfilestext: string
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class MyUploadsPage extends React.Component<IMyUploadsPageProps, IMyUploadsPageState> {
  constructor(props: IMyUploadsPageProps) {
    super(props);

    this.state = {
      open: false,
      rows: undefined,
      selected_event: '',
      selectedFiles: [],
      selectedfilestext: ''
    }
  }
  handleSelectChange = (event: SelectChangeEvent) => {
    const  value = event.target.value;
    this.setState((prevState) => ({
        ...prevState,
        ["selected_event"]: value
    }));
  };
  handleFileChange = (event: any) => {
    const fileNames = [...event.target.files].map(file => file.name).join(', ');
    const files = event.target.files;
    this.setState({ selectedFiles: files })
    this.setState({selectedfilestext: fileNames})
  };
  public componentDidMount(): void {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(BACKEND_URL+'/student/eventList/', {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ rows: data.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });    
  }
  
  public render() {
    const handleOpen = () => {
      this.setState({ open: true });
    }
    
    const handleClose = () => {
      this.setState({ open: false });
    }

    const handleUpload = () => {
      const userid = localStorage.getItem('userId')
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
      
      var formdata = new FormData();
      // Loop through the selected files and append them to the FormData object
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
          formdata.append('eventImages', this.state.selectedFiles[i], this.state.selectedFiles[i].name);
      }
  
      // Add other form data values to the FormData object
      formdata.append('userId', userid ? userid : '');
      formdata.append('eventId', this.state.selected_event);
      console.log(formdata.get('eventImages'))
      fetch(BACKEND_URL+"/student/studentEvent/", {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        })
        .then(response => response.text())
        .then(result => {
          window.location.reload();
          })
        .catch(error => console.log('error', error));  
    }

    
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" gutterBottom>
              My Uploads
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleOpen}>Upload</Button>
          </Grid>
        </Grid>
        
        <Card sx={{ minWidth: 275 }}>
        {/* <Card sx={{ minWidth: 275 }}> */}
          <CardContent>
            {this.state.rows && this.state.rows.map((obj:any) => (
            <div key={obj.id}>
            <Typography variant="h6" style={{fontSize: 16, fontWeight: 300}} gutterBottom>
                {obj.eventName}
            </Typography>
            <ImageList sx={{ width: "100%"}} cols={4} gap={50}>
              {obj.eventImages.map((item:any) => (
                <ImageListItem key={item.eventImage} sx={{ height: '200px' }}>
                  <img
                    src={BACKEND_URL+`${item.eventImage}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={BACKEND_URL+`${item.eventImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.eventImage}
                    style={{ width: '100%',minHeight:'177px',maxHeight:'177px', objectFit: 'contain' }}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
            </div>
            ))}
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
        <Modal
            open={this.state.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box  sx={style}>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Event</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.selected_event}
                  label="Event"
                  onChange={this.handleSelectChange}
                >
                  {this.state.rows && this.state.rows.map((obj:any) => (
                  <MenuItem key={obj.id} value={obj.id}>{obj.eventName}</MenuItem>
                  ))}
                </Select>
              </FormControl>


              </Grid>
              <Grid item xs={12} sx={{textAlign: "center"}}>
                  <div style={{alignItems: "center"}}>
                      <input accept="image/*" style={{display: "none"}} id="icon-button-file" type="file" multiple onChange={this.handleFileChange}/>
                      <label htmlFor="icon-button-file">
                          <IconButton color="primary" aria-label="upload picture" component="span">
                              <PhotoCamera />
                          </IconButton>
                      </label>
                      <p style={{fontSize: 15}}>Selected files: {this.state.selectedfilestext}</p>
                  </div>
              </Grid>
              <Grid item xs={12} sx={{textAlign: "center"}}>
                <Button variant="contained" onClick={handleUpload}>Upload</Button>
              </Grid>
            </Grid>

          </Box>
        </Modal>
      </Box>
    );
  }
}
