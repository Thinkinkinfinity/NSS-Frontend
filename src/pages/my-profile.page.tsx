import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export interface IMyProfilePageProps {
}

export interface IMyProfilePageState {
}

export default class MyProfilePage extends React.Component<IMyProfilePageProps, IMyProfilePageState> {
  constructor(props: IMyProfilePageProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
            My Profile
            </Typography>
            <Card sx={{marginTop: 3, padding: 3, textAlign: "centre"}}>
                <Grid container spacing={2} sx={{textAlign: "centre", marginBottom: 3}}>
                    <Grid item xs={1} style={{textAlign: 'left'}}>
                        <Stack spacing={2}>
                            <Avatar alt="Remy Sharp" src="/image3.png" sx={{ width: 56, height: 56 }}>
                            </Avatar>
                        </Stack>
                    </Grid>
                    <Grid item xs={11} style={{textAlign: 'left'}}>
                        <Stack spacing={0}>
                            <Typography variant="body1" gutterBottom style={{fontWeight: 600}}>
                                Kumar
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                                Student
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Stack spacing={2}>
                            <TextField id="firstname" label="First Name" variant="outlined" sx={{width: "80%"}} />
                            <TextField id="institution" label="Institution Name" variant="outlined" sx={{width: "80%"}} />
                            <TextField id="email" label="Email ID" variant="outlined" sx={{width: "80%"}} />
                            <TextField id="district" label="District" variant="outlined" sx={{width: "80%"}} />
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={2}>
                            <TextField id="lastname" label="Last Name" variant="outlined" sx={{width: "80%"}} />
                            <TextField id="unitnumber" label="Unit Number" variant="outlined" sx={{width: "80%"}} />
                            <TextField id="phonenumber" label="Phone Number" variant="outlined" sx={{width: "80%"}} />
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={2}>
                            <TextField id="university" label="University Name" variant="outlined" sx={{width: "80%"}} />
                            <TextField id="programofficer" label="Program Officer" variant="outlined" sx={{width: "80%"}} />
                            <TextField id="bloodgroup" label="Blood Group" variant="outlined" sx={{width: "80%"}} />
                        </Stack>
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{backgroundColor:"#00B929", marginTop: 3}}>Save</Button>
            </Card>
        </Box>
    );
  }
}
