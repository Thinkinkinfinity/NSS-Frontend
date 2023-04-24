import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import BarChartComponent from './bar-chart.component';
import PieChartComponent from './pie-chart.component';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export interface INibCidOfficersDashboardProps {
}

export interface INibCidOfficersDashboardState {
}

export default class NibCidOfficersDashboard extends React.Component<INibCidOfficersDashboardProps, INibCidOfficersDashboardState> {
  constructor(props: INibCidOfficersDashboardProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item md={7}>
          <img
            src={`/tamilnadu-map.png`}
            loading="lazy"
          />
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
                <ListItemText primary="State Universities / Institutions" />
                <ListItemText primary="70" />
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
                <ListItemText primary="State Colleges" />
                <ListItemText primary="3200" />
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
                <ListItemText primary="Universities Colleges Officers" />
                <ListItemText primary="1783" />
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
                <ListItemText primary="Students / Volunteers" />
                <ListItemText primary="576854" />
              </ListItemButton>
            </ListItem>
          </List>
          </Grid>
          <Grid item md={12} sx={{height: 300}}>
            <BarChartComponent/>
          </Grid>
          <Grid item md={12} sx={{height: 300}}>
            <PieChartComponent/>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </Box>
    );
  }
}
