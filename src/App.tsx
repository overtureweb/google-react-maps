import React, {useState} from 'react';
import {Button, Container} from '@material-ui/core'
import GoogleMap from "./GoogleMap";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
  },
});

const App: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [coords, setCoords] = useState();
  const [wasClicked, setWasClicked] = useState(false);
  const getLocation = () =>
      navigator.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
            setCoords({lat, lng});
            setWasClicked(true);
          },
          () => console.log("Location Permissions Error"));
  return (
      <Container className={classes.root}>
        <Button
            disabled={wasClicked}
            onClick={getLocation}
            variant="contained"
            style={{marginBottom: 100}}
            color="primary">Click Here to Show Location
        </Button>
        {coords && <GoogleMap {...coords}/>}
      </Container>
  );
}

export default App;
