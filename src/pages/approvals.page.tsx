import * as React from 'react';
import ListView from '../components/data-grid.component';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Icon from '@mui/material/Icon';
export interface IAppProps {
}

export interface IAppState {
  rows: GridRowsProp
}

const columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 30, headerClassName: 'super-app-theme--header' },
  { field: 'student_name', headerName: 'Student Name', width: 150, headerClassName: 'super-app-theme--header' },
  { field: 'student_id', headerName: 'Student ID', width: 150, headerClassName: 'super-app-theme--header' },
  { field: 'no_of_hrs_completed', headerName: 'Number of hrs completed', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'no_of_events_completed', headerName: 'No of events participated', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'status', headerName: 'Status', width: 150, headerClassName: 'super-app-theme--header' },
];
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_TOKEN = process.env.REACT_APP_BACKEND_TOKEN;

export default class ApprovalsPage extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      rows: []
    }
  }

  public componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(BACKEND_URL+'/programOfficer/studentEventApprovalList/', {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const rowdata:any = [];
        for (let i = 0; i < data.data.length; i++) {
          const element = data.data[i];
          const rowobj = { 
                            id: i+1, 
                            student_name: element.studentName,
                            student_id: element.studentId,
                            no_of_hrs_completed: element.noOfHrsCompleted,
                            no_of_events_completed: element.noOfEventParticipated,
                            status: element.status,
                          }
          rowdata.push(rowobj);
        }
        this.setState({ rows: rowdata });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  public render() {
    const { rows } = this.state;
    const onPageChange = (params: any) => {
      console.log(params);
      // Handle page change here, e.g. fetch data for new page
    };
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
            Approvals
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: '100%', marginBottom: 3, marginTop: 3 }}
            renderInput={(params) => <TextField {...params} label="Search by Districts / Universities / Institution" />}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth sx={{ width: '100%', marginBottom: 3, marginTop: 3 }}>
              <InputLabel id="demo-simple-select-label">Report Generation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Report Generation"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <Icon sx={{ width: '50%', marginBottom: 3, marginTop: 4, height: "100%" }}>
              <img src="/pdf_icon.png" alt="My Icon" />
            </Icon>
            <Icon sx={{ width: '50%', marginBottom: 3, marginTop: 4, height: "100%" }}>
              <img src="/xls_icon.png" alt="My Icon" />
            </Icon>
          </Grid>
        </Grid>
        <ListView rows={rows} columns={columns} onPageChange={onPageChange} />
      </Box>
    );
  }
}
