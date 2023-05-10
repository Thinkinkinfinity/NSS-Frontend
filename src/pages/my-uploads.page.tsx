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
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class MyUploadsPage extends React.Component<IMyUploadsPageProps, IMyUploadsPageState> {
  constructor(props: IMyUploadsPageProps) {
    super(props);

    this.state = {
      open: false,
      rows: undefined
    }
  }
  handleFileChange = (event: any) => {
    console.log(event.target.files)
    const files = event.target.files;
    console.log(files)
    // const fileNames = Array.from(files as FileList).map((file) => file.name);
  // this.setState({ selectedFiles: files });
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
        console.log(data.data);
        this.setState({ rows: data.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });    
  }
  uploadfunction () {
    console.log("das")  
  }
  public render() {
    const handleOpen = () => {
      this.setState({ open: true });
    }
    
    const handleClose = () => {
      this.setState({ open: false });
    }
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Typography variant="h5" gutterBottom>
              My Uploads
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" onClick={handleOpen}>Upload</Button>
          </Grid>
        </Grid>
        
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {this.state.rows && this.state.rows.map((obj:any) => (
            <div key={obj.id}>
            <Typography variant="h6" style={{fontSize: 16, fontWeight: 300}} gutterBottom>
                {obj.eventName}
            </Typography>
            <ImageList sx={{ width: "100%", height: "inherit" }} cols={4} rowHeight={164} gap={50}>
              {obj.eventImages.map((item:any) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
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
                  // value={age}
                  label="Event"
                  // onChange={handleChange}
                >
                  {this.state.rows && this.state.rows.map((obj:any) => (
                  <MenuItem value={obj.id}>{obj.eventName}</MenuItem>
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
                  </div>
              </Grid>
            </Grid>

          </Box>
        </Modal>
      </Box>
    );
  }
}
