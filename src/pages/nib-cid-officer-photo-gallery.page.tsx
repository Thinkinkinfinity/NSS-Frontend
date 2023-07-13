import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export interface INibCidOfficerPhotoGalleryProps {
}

export interface INibCidOfficerPhotoGalleryState {
  events: any
}

const itemData = [
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
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
let imgarray: any = [];

export default class NibCidOfficerPhotoGallery extends React.Component<INibCidOfficerPhotoGalleryProps, INibCidOfficerPhotoGalleryState> {
  constructor(props: INibCidOfficerPhotoGalleryProps) {
    super(props);

    this.state = {
      events: []
    }
  }
  componentDidMount(): void {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    let url = BACKEND_URL+'/nibcidOfficer/eventList?page=1&page_size=20';
    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        let combinedArray = []
        combinedArray = data.data.CompletedEvents.concat(data.data.upcomingEvents)
        this.setState({events: combinedArray})
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  public render() {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Gallery
        </Typography>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {this.state.events && this.state.events.map((obj:any) => (
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
      </div>
    );
  }
}
