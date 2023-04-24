import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
  {
    img: '/AdobeStock_39556009782.png',
    title: 'Hatsd',
  },
  {
    img: '/AdobeStock_480498250123.png',
    title: 'Honeya',
  },
  {
    img: '/AdobeStock_4804982503123.png',
    title: 'Basketballasd',
  },
  {
    img: '/AdobeStock_3542828681321.png',
    title: 'Ferndas',
  },
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

export default class MyUploadsPage extends React.Component<IMyUploadsPageProps, IMyUploadsPageState> {
  constructor(props: IMyUploadsPageProps) {
    super(props);

    this.state = {
    }
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
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Box>
    );
  }
}
