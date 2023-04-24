import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SignupComponent from "../components/signup.component";

export interface ISignupPageProps {}

export interface ISignupPageState {}

export default class SignupPage extends React.Component<
  ISignupPageProps,
  ISignupPageState
> {
  constructor(props: ISignupPageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // center horizontally
          alignItems: "center", // center vertically
          height: "100vh", // make the container full height
          backgroundImage: `url('/background.png')`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 900,
              height: 500,
            },
          }}
        >
            <Paper elevation={3} sx={{maxHeight: 'inherit', width: '100%'}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Carousel showThumbs={false}>
                        <div>
                            <img src="/carousalpic1.png" alt="carousel 1" style={{ objectFit: 'cover', maxHeight: 500 }} />
                        </div>
                        <div>
                            <img src="/carousalpic2.png" alt="carousel 2" style={{ objectFit: 'cover', maxHeight: 500 }} />
                        </div>
                        <div>
                        <img src="/carousalpic3.png" alt="carousel 3" style={{ objectFit: 'cover', maxHeight: 500 }} />
                        </div>
                    </Carousel>                 
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SignupComponent/>
                </Grid>
            </Grid>
            </Paper>
        </Box>
      </Box>
    );
  }
}
