import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

export interface INibCidOfficerPhotoGalleryProps {
}

export interface INibCidOfficerPhotoGalleryState {
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
        for (let i = 0; i < data.data.CompletedEvents.length; i++) {
          const element = data.data.CompletedEvents[i];
          imgarray.push(element.eventImages);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  public render() {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Completed Events
        </Typography>
        <ImageList sx={{ width: "100%", height: "100%" }} cols={4}>
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
      </div>
    );
  }
}
