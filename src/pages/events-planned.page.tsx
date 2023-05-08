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
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Icon from '@mui/material/Icon';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddEventForm from '../components/add-event.component';

export interface IAppProps {
}

export interface IAppState {
    open: boolean,  
    rows: GridRowsProp
}

const columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 30, headerClassName: 'super-app-theme--header' },
  { field: 'event_name', headerName: 'Event Name', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'event_date', headerName: 'Event Date', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'event_type', headerName: 'Event Type', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'event_description', headerName: 'Event Description', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'location', headerName: 'Location', width: 200, headerClassName: 'super-app-theme--header' },
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
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class EventsPlannedPage extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
        open: false,
        rows: []
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const userType = localStorage.getItem('userType');
    let url = "";
    if (userType == "ProgramOfficers") {
      if (value.length > 0) {
        url = BACKEND_URL+'/programOfficer/event?page=1&page_size=20&search='+value;
      }
      else{
        url = BACKEND_URL+'/programOfficer/event?page=1&page_size=20';
      }
    }
    else if (userType == "NibcidOfficers") {
      if (value.length > 0) {
        url = BACKEND_URL+'/nibcidOfficer/eventList?page=1&page_size=20&search='+value;
      }
      else{
        url = BACKEND_URL+'/nibcidOfficer/eventList?page=1&page_size=20';
      }
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const rowdata:any = [];
        if(data.data.upcomingEvents){
          for (let i = 0; i < data.data.upcomingEvents.length; i++) {
            const element = data.data.upcomingEvents[i];
            const rowobj = { 
                            id: i+1, 
                            event_name: element.eventName, 
                            event_date: element.eventDate,  
                            event_type: element.eventType,  
                            event_description: element.eventDescription,
                            location: element.eventLocation
                            }
            rowdata.push(rowobj);
          }
        }
        this.setState({ rows: rowdata });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  public componentDidMount() {
    const userType = localStorage.getItem('userType');
    let url = "";
    if (userType == "ProgramOfficers") {
      url = BACKEND_URL+'/programOfficer/event?page=1&page_size=20';
    }
    else if (userType == "NibcidOfficers") {
      url = BACKEND_URL+'/nibcidOfficer/eventList?page=1&page_size=20';
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('access'));
    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const rowdata:any = [];
        for (let i = 0; i < data.data.upcomingEvents.length; i++) {
          const element = data.data.upcomingEvents[i];
          const rowobj = { 
                            id: i+1, 
                            event_name: element.eventName, 
                            event_date: element.eventDate,  
                            event_type: element.eventType,  
                            event_description: element.eventDescription,
                            location: element.eventLocation
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
    const handleOpen = () => {
        this.setState({ open: true });
    }

    const handleClose = () => {
        this.setState({ open: false });
    }
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Upcoming Events
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={11}>
          <TextField id="outlined-basic" onChange={this.handleChange} label="Search by Event Name" variant="outlined" sx={{ width: '100%', marginBottom: 3, marginTop: 3 }} />
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
        <Button variant="outlined" style={{marginBottom: 10}} onClick={() => {
          handleOpen()
        }}>Add Event</Button>
        <ListView rows={rows} columns={columns} onPageChange={onPageChange} />
        <Modal
            open={this.state.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box  sx={style}>
                <AddEventForm/>
            </Box>
        </Modal>
      </Box>
    );
  }
}
