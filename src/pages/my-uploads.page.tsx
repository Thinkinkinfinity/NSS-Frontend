import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const itemData: any = [
  
];

export interface IMyUploadsPageProps {
}

export interface IMyUploadsPageState {
}
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class MyUploadsPage extends React.Component<IMyUploadsPageProps, IMyUploadsPageState> {
  constructor(props: IMyUploadsPageProps) {
    super(props);

    this.state = {
    }
  }
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
        for (let i = 0; i < data.data.length; i++) {
          const element = data.data[i];
          for (let j = 0; j < element.eventImages.length; j++) {
            const rowdata = element.eventImages[j];
            const rowobj = {
              img: BACKEND_URL+rowdata.eventImage,
              title: rowdata.id,
            }
            itemData.push(rowobj);
          }
        }
        this.setState({ rows: itemData });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });    
  }
  public render() {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          My Uploads
        </Typography>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <ImageList sx={{ width: "100%", height: "inherit" }} cols={4} rowHeight={164} gap={50}>
              {itemData.map((item:any) => (
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
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Box>
    );
  }
}
