import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export interface ICertificatePageProps {
}

export interface ICertificatePageState {
}

export default class CertificatePage extends React.Component<ICertificatePageProps, ICertificatePageState> {
  constructor(props: ICertificatePageProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Certificate
            </Typography>
            <Card sx={{ minWidth: 275, textAlign: 'center' }}>
            <CardContent>
                <img
                    src={`/334415521.png`}
                    alt='SAD'
                    loading="lazy"
                    />
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        </Box>
    );
  }
}
