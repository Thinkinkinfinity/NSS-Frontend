import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import LineChartComponent from './line-graph.component';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import LinearWithValueLabel from './progress-bar.component';

const itemData = [
  {
    img: '/AdobeStock_35428286821.png',
    title: 'Breakfast',
  },
  {
    img: '/AdobeStock_39556009731.png',
    title: 'Burger',
  },
  {
    img: '/AdobeStock_39556009741.png',
    title: 'Camera',
  },
  {
    img: '/AdobeStock_39556009724.png',
    title: 'Coffee',
  },
];
const itemData1 = [
  {
    img: '/AdobeStock_39556009782.png',
    title: 'Hats',
  },
  {
    img: '/AdobeStock_480498250123.png',
    title: 'Honey',
  },
  {
    img: '/AdobeStock_4804982503123.png',
    title: 'Basketball',
  },
  {
    img: '/AdobeStock_3542828681321.png',
    title: 'Fern',
  },
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export interface IStudentsDashboardProps {
}

export interface IStudentsDashboardState {
}

export default class StudentsDashboard extends React.Component<IStudentsDashboardProps, IStudentsDashboardState> {
  constructor(props: IStudentsDashboardProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={1}>
          <Grid item md={7}>
              <Item style={{height:300, width:"100%", display: "flex", alignItems: "center" }}>
                <LinearWithValueLabel/>          
              </Item>
          </Grid>
          <Grid item md={5}>
            <Stack spacing={2}>
              <Item style={{height:142}}>
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
                      <ListItemText primary="Number of Events" />
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
                    </ListItemButton>
                  </ListItem>
                </List>
              </Item>
              <Item style={{height:142}}>
                <Typography variant="h6" gutterBottom>
                  25 Hrs / 30 Hrs 
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Total Hours Completed
                </Typography>
              </Item>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom sx={{marginTop: 1}}>
          Latest Preview 
        </Typography>
        <Grid container spacing={1}>
          <Grid item md={12}>
              <Item sx={{height: 365, textAlign: "start"}}>
                <Typography variant="button" gutterBottom>
                  Tree Plantation Drive 2023 - 10/04/2023
                </Typography>
                <ImageList sx={{ width: "100%", height: "37%" }} cols={4} rowHeight={164} gap={50}>
                  {itemData.map((item) => (
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
                <Typography variant="button" gutterBottom>
                  Tree Plantation Drive 2023 - 10/04/2023
                </Typography>
                <ImageList sx={{ width: "100%", height: "37%" }} cols={4} rowHeight={164} gap={50}>
                  {itemData1.map((item) => (
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
              </Item>
          </Grid>
        </Grid>        
      </Box>
    );
  }
}
