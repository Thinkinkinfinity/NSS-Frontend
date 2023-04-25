import * as React from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

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
        <Card sx={{ minWidth: "60%", padding: 3 }}>
        <Grid container spacing={2} textAlign={"center"}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: 700, color: "#2E3192"}}>
              Register
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Signup Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Signup Type"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth />
            <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth />
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type="password" />
          </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth />
              <TextField id="outlined-basic" label="Email ID" variant="outlined" fullWidth />
              <TextField id="outlined-basic" label="User Name" variant="outlined" fullWidth />
              <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth type="password" />
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} textAlign={"center"} sx={{marginTop: 3}}>
          <Grid item xs={12}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
        </Card>
      </Box>
    );
  }
}
