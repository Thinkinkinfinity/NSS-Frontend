import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PieChartComponent from './pie-chart.component';
import BarChartComponent from './bar-chart.component';
import BasicExampleDataGrid from './grid-table.component';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import Avatar from '@mui/material/Avatar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
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
export interface IProgramOfficerDashboardProps {
}

export interface IProgramOfficerDashboardState {
  open: boolean,
}

export default class ProgramOfficerDashboard extends React.Component<IProgramOfficerDashboardProps, IProgramOfficerDashboardState> {
  constructor(props: IProgramOfficerDashboardProps) {
    super(props);

    this.state = {
      open: false,
    }
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
      <Grid container spacing={1}>
        <Grid item md={10} >
          <Typography variant="h6" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Button variant="text" onClick={handleOpen}>Registration Approvals</Button>
        </Grid>
      </Grid> 
      <Grid container spacing={1}>
        <Grid item md={7} >
            <Grid container spacing={1}>
                <Grid item md={12} sx={{height: 350}}>
                    <PieChartComponent/>
                </Grid>
                <Grid item md={12} sx={{height: 350}}>
                    <BarChartComponent/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item md={5}>
            <Grid container spacing={1}>
                <Grid item md={12}>
                  <List>
                  <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon>
                            <img
                              src={`/image70.png`}
                              loading="lazy"
                            />
                          </Icon>
                        </ListItemIcon>
                        <ListItemText primary="Number of students" />
                        <ListItemText primary="100" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon>
                            <img
                              src={`/image70.png`}
                              loading="lazy"
                            />
                          </Icon>
                        </ListItemIcon>
                        <ListItemText primary="Number of Events" />
                        <ListItemText primary="50" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon>
                            <img
                              src={`/image70.png`}
                              loading="lazy"
                            />
                          </Icon>
                        </ListItemIcon>
                        <ListItemText primary="Name of the institution" />
                        <ListItemText primary="Anna University" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon>
                            <img
                              src={`/image70.png`}
                              loading="lazy"
                            />
                          </Icon>
                        </ListItemIcon>
                        <ListItemText primary="Number of students entrolled" />
                        <ListItemText primary="576854" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={12}>
                    <BasicExampleDataGrid/>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
      <Modal
            open={this.state.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box  sx={style}>
              <Typography variant="h6" gutterBottom>
                Registration Approvals
              </Typography>
              <List>
              {Array.from({ length: 5 }).map((_, index) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar alt="Remy Sharp" src="/1.jpeg" />
                    </ListItemIcon>
                    <ListItemText primary="AKSHAYA" />
                    <ListItemIcon>
                    <Button variant="contained" color="success" sx={{marginRight: 2}}>
                      Approve
                    </Button>
                    <Button variant="outlined" color="error">
                      Decline
                    </Button>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))}  
              </List>
            </Box>
      </Modal>
    </Box>
    );
  }
}
