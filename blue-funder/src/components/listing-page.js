import React, { useState } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import TableList from './table-list.js';

const useStyles = makeStyles(theme => ({
  inputLabel: {
    color: '#006088 !important',
    fontWeight: 'bold',
    fontSize: '11pt',
  },

  formControl: {
    minWidth: 150,
    marginRight: '20px',
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  content: {
    padding: '80px',
    paddingBottom: '40px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '70px',
      paddingTop: '30px',
    },
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  search: {
    marginLeft: '60px',
    marginRight: '300px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
      marginTop: '20px',
    },
  },

  controls: {
    paddingTop: '40px',
    marginBottom: '40px',
   [theme.breakpoints.down('sm')]: {
      paddingTop: '20px',
      marginBottom: '20px',
    },
  },

  sliders: {
    width: '160px',
    display: 'inline-block',
    marginRight: '20px',
  },

  label: {

  },
}));

const valuetext = (value) => {
  return `${value}°C`;
}

const ListingPage = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    capitalType: '',
    geographicFocus: '',
    industryFocus: '',
    sort: '',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [value, setValue] = React.useState([0, 100]);
  const [value2, setValue2] = React.useState([0, 15]);

  const handleUpdate = (event, newValue) => {
    setValue(newValue);
  };
  const handleUpdate2 = (event, newValue) => {
    setValue2(newValue);
  };

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.content}>
      <div className={classes.title}>
        <h1 style={{color: "#043464"}}>Portal</h1>
        <TextField
          fullWidth
          className={classes.search}
          label="Search"
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="primary"/>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={classes.controls}>
        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
          <InputLabel className={classes.inputLabel} ref={inputLabel}>
            Capital Type
          </InputLabel>
          <Select
            native
            value={state.capitalType}
            onChange={handleChange('capitalType')}
            labelWidth={90}
            inputProps={{
              name: 'Capital Type',
            }}
          >
            <option value="" />
            <option value={10}>Venture Capital</option>
            <option value={20}>Grants</option>
            <option value={30}>Angel</option>
          </Select>
        </FormControl>
        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
          <InputLabel className={classes.inputLabel} ref={inputLabel}>
            Geographic Focus
          </InputLabel>
          <Select
            native
            value={state.geographicFocus}
            onChange={handleChange('geographicFocus')}
            labelWidth={130}
            inputProps={{
              name: 'Geographic Focus',
            }}
          >
            <option value="" />
            <option value={10}>Washington</option>
            <option value={20}>Pacific Northwest</option>
            <option value={30}>Seattle</option>
          </Select>
        </FormControl>
        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
          <InputLabel className={classes.inputLabel} ref={inputLabel}>
            Industry Focus
          </InputLabel>
          <Select
            native
            value={state.industryFocus}
            onChange={handleChange('industryFocus')}
            labelWidth={110}
            inputProps={{
              name: 'Industry Focus',
            }}
          >
            <option value="" />
            <option value={10}>Boating</option>
            <option value={20}>Energy</option>
            <option value={30}>Rehabilitation</option>
          </Select>
        </FormControl>
        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
          <InputLabel className={classes.inputLabel} ref={inputLabel}>
            Sort
          </InputLabel>
          <Select
            native
            value={state.sort}
            onChange={handleChange('sort')}
            labelWidth={40}
            inputProps={{
              name: 'Sort',
            }}
          >
            <option value="" />
            <option value={10}>Name (A-Z)</option>
            <option value={20}>Name (Z-A)</option>
            <option value={30}>Investment Size</option>
          </Select>
        </FormControl>
        <div className={classes.sliders}>
          <Typography style={{color: '#006088'}} id="range-slider" variant="caption" gutterBottom>
            Investment Size (0 - 100M)
          </Typography>
          <Slider
            value={value}
            max={1000}
            step={10}
            onChange={handleUpdate}
            style={{color: '#006088'}}
            valueLabelDisplay="auto"
            valueLabelFormat={x => x + 'k'}
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
        <div className={classes.sliders}>
          <Typography style={{color: '#006088'}} id="range-slider" variant="caption" gutterBottom>
            Investment Term (0 - 15yr)
          </Typography>
          <Slider
            value={value2}
            max={15}
            onChange={handleUpdate2}
            style={{color: '#006088'}}
            valueLabelDisplay="auto"
            valueLabelFormat={x => x + 'yr'}
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
      </div>
      <TableList />
    </div>
  )
}

export default ListingPage;
