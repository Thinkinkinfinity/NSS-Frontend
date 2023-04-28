import * as React from 'react';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
export interface IEventApprovalFormProps {
    objData: any
}

export interface IEventApprovalFormState {
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class EventApprovalForm extends React.Component<IEventApprovalFormProps, IEventApprovalFormState> {
  constructor(props: IEventApprovalFormProps) {
    super(props);
    this.state = {
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
  };
  handleFileChange = (event: any) => {
  };
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  };
  componentDidMount(): void {
    console.log(this.props)
  }
  public render() {
    return (
        <div>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src="/1.jpeg"/>
                    <Stack spacing={0}>
                        <Typography variant="subtitle1" gutterBottom>
                            Akshaya
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            ID NO : 00010170155318
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={0}>
                    <Grid container spacing={1}>
                        <Grid item md={12} >
                            <Typography variant="subtitle1" gutterBottom>
                                Activity Type
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                Tree plantation is the process of planting trees
                            </Typography>
                        </Grid>
                        <Grid item md={12} >
                            <Typography variant="subtitle1" gutterBottom>
                                Event Name
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                Tree plantation is the process of planting trees
                            </Typography>
                        </Grid>
                        <Grid item md={12} >
                            <Typography variant="subtitle1" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                Tree plantation is the process of planting trees in a designated area to improve the environment, promote ecological balance, and mitigate the effects of climate change. The process involves selecting appropriate species of trees, preparing the land, and planting the trees in a strategic manner. 
                            </Typography>
                        </Grid>
                        <Grid item md={12} >
                            
                        </Grid>
                        <Grid item md={12} >
                            <TextField id="service_hours_rewarded" label="Service Hours Rewarded" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item md={12} >
                        </Grid>
                        <Grid item md={12} >
                            <TextField id="comments" label="Comments" variant="outlined" fullWidth multiline rows={4} />
                        </Grid>
                        <Grid item md={12} >
                        </Grid>
                        <Grid item md={12} textAlign={"center"}>
                            <Button variant="contained" color="success">Approve</Button>
                        </Grid>
                    </Grid> 
                </Stack>
            </Stack>

        </div>
    );
  }
}
