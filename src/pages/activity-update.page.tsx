import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ActivityUpdateForm from "../components/activity-update-form.component";
import ActivityUpdateNote from "../components/activity-update-note.component";
export interface IActivityUpdatePageProps {}

export interface IActivityUpdatePageState {
    open: boolean,
    open2: boolean,
    upcoming_activity: any,
    completed_activity: any,
    current_obj: any
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
}));
const datalistlength = 10;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class ActivityUpdatePage extends React.Component<
  IActivityUpdatePageProps,
  IActivityUpdatePageState
> {
  constructor(props: IActivityUpdatePageProps) {
    super(props);

    this.state = {
        open: false,
        open2: false,
        upcoming_activity: [],
        completed_activity: [],
        current_obj: {}
    };
  }

  public componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(BACKEND_URL+'/student/upcomingEventList/?userId='+localStorage.getItem('userId'), {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ upcoming_activity: data.data.upcomingEvent });
        this.setState({ completed_activity: data.data.completedEvent });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  public render() {
    const handleOpen = (obj:any) => {
        this.setState({ open: true });
        this.setState({ current_obj: obj });
    }
    
    const handlemodel2Open = () => {
        this.setState({ open2: true });
    }

    const handleClose = () => {
        this.setState({ open: false });
    }

    const handlemodel2Close = () => {
        this.setState({ open2: false });
    }
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Activity Update
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {this.state.upcoming_activity.map((item:any) => (
                  <ListItem disablePadding key={item.id}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="/image3.png" />
                      </ListItemIcon>
                      <ListItemText primary={item.eventName} />
                      <ListItemText primary={item.eventDate} />
                      <Button variant="contained" size="small" onClick={() => handleOpen(item)}>
                        Attend
                      </Button>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography variant="h6" gutterBottom>
                Completed Events
              </Typography>
              <List>
              {this.state.completed_activity.map((item:any) => (
                  <ListItem disablePadding key={item.id}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="/image3.png" />
                      </ListItemIcon>
                      <ListItemText primary={item.eventName} />
                      <ListItemText primary={item.eventDate} />
                      <Button
                        variant="contained"
                        size="small"
                        style={{ backgroundColor: "#00B929" }}
                        onClick={handlemodel2Open}
                      >
                        Reviewed
                      </Button>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Item>
          </Grid>
        </Grid>
        <Modal
            open={this.state.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box  sx={style}>
                <ActivityUpdateForm objData={this.state.current_obj}/>
            </Box>
        </Modal>
        <Modal
            open={this.state.open2}
            onClose={handlemodel2Close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box  sx={style}>
                <ActivityUpdateNote/>
            </Box>
        </Modal>
      </Box>
    );
  }
}
