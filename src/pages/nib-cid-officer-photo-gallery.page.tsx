import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
export default class NibCidOfficerPhotoGallery extends React.Component<INibCidOfficerPhotoGalleryProps, INibCidOfficerPhotoGalleryState> {
  constructor(props: INibCidOfficerPhotoGalleryProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
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
    );
  }
}
