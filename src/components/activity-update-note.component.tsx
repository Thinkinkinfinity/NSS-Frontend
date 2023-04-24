import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export interface IActivityUpdateNoteProps {
}

export interface IActivityUpdateNoteState {
}

export default class ActivityUpdateNote extends React.Component<IActivityUpdateNoteProps, IActivityUpdateNoteState> {
  constructor(props: IActivityUpdateNoteProps) {
    super(props);

    this.state = {
    }
  }
 
  
  public render() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" style={{fontSize: 20, fontWeight: 600}} gutterBottom>
                    Tree Plantation Drive 2023
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="caption" gutterBottom>
                Tree plantation is the process of planting trees in a designated area to improve the environment, promote ecological balance, and mitigate the effects of climate change. The process involves selecting appropriate species of trees, preparing the land, and planting the trees in a strategic manner. <br></br>                               
Tree plantation has numerous benefits, such as reducing greenhouse gas emissions by absorbing carbon dioxide, providing oxygen, preventing soil erosion, improving air quality, and enhancing biodiversity. Additionally, planting trees can also provide economic benefits such as wood for fuel, timber for construction, and fruits or nuts for consumption.
                </Typography>
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
                <Typography variant="caption" style={{fontWeight: 700}} gutterBottom>
                    Reviewed by Ananthan Program Officer
                </Typography>
            </Grid>
        </Grid>
    );
  }
}
