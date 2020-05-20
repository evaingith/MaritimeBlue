import React, { useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
    minWidth: 180,
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

  submit: {
    backgroundColor: "#006088",
    color: "white",
    verticalAlign: "top",
    marginTop: "15px",
  },

  label: {

  },
}));

const valuetext = (value) => {
  return `${value}°C`;
}

const ListingPage = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    capitalType: '',
    geographicFocus: '',
    industryFocus: '',
    sort: '',
  });

  const inputLabel = React.useRef(null);

  const [value, setValue] = React.useState([0, 100]);
  const [value2, setValue2] = React.useState([0, 15]);
  const [listings, setListings] = React.useState([]);
  const [full, setFull] = React.useState([]);
  const [cTypes, setCTypes] = React.useState([])
  const [gTypes, setGTypes] = React.useState([])
  const [iTypes, setITypes] = React.useState([])
  const [search, setSearch] = React.useState('');
  const [temp, setTemp] = React.useState('');
  const handleSearchOnChange = (event) => {
    setListings(temp);
    setSearch(event.target.value);
    if (event.target.value !== '') {
      let filtered = Array.from(listings);
      filtered = filtered.filter(function(a) {
          return a['opportunityName'].includes(event.target.value);
      });
      setListings(filtered);
    }
  }

  const handleUpdate2 = (event, newValue) => {
    setValue2(newValue);
    let filtered = Array.from(listings);
    filtered = filtered.filter(function(a) {
        return parseInt(a['investmentTerm']) <= newValue[1] && parseInt(a['investmentTerm']) >= newValue[0];
    });
    setListings(filtered);
    setTemp(filtered);
  };

  const resetList = () => {
    setListings(full);
    setTemp(full);
    setSearch('');
    setState({
      capitalType: '',
      geographicFocus: '',
      industryFocus: '',
      sort: '',
    });
  }

  const getTypes = (oppList) => {
    let cSet = new Set();
    let gSet = new Set();
    let iSet = new Set();
    for (let i = 0; i < oppList.length; i++) {
      let cType = oppList[i].capitalType;
      let gType = oppList[i].geographicFocus;
      let iType = oppList[i].industryFocus;
      if (!cSet.has(cType)) {
        cSet.add(cType);
      }
      if (!gSet.has(gType)) {
        gSet.add(gType);
      }
      if (!iSet.has(iType)) {
        iSet.add(iType);
      }
    }
    setCTypes([...cSet]);
    setGTypes([...gSet]);
    setITypes([...iSet]);
  }

  const handleChange = name => event => {
    console.log(name);
    console.log(event.target.value);
    if (event.target.value !== '') {
        let filtered = Array.from(listings);
        if (name === 'sort') {
           if (event.target.value === 'a-z') {
             filtered.sort(function(a, b) {
               if(a.opportunityName < b.opportunityName) { return -1; }
               if(a.opportunityName > b.opportunityName) { return 1; }
               return 0;
             });
           } else if (event.target.value === 'z-a') {
             filtered.sort(function(a, b) {
               if(a.opportunityName < b.opportunityName) { return 1; }
               if(a.opportunityName > b.opportunityName) { return -1; }
               return 0;
             });
           } else if (event.target.value === 'size') {
             filtered.sort(function(a, b) {
               return parseInt(a['investmentSize']) - parseInt(b['investmentSize']);
             });
           } else if (event.target.value === 'term') {
             filtered.sort(function(a, b) {
               return parseInt(a['investmentTerm']) - parseInt(b['investmentTerm']);
             });
           }
        } else if (name === 'capitalType') {
            filtered = filtered.filter(function(a) {
              return a.capitalType == event.target.value;
            });

        } else if (name === 'industryFocus') {
            filtered = filtered.filter(function(a) {
              return a.industryFocus == event.target.value;
            });
        } else if (name === 'geographicFocus') {
            filtered = filtered.filter(function(a) {
              return a.geographicFocus == event.target.value;
            });
        }
        setListings(filtered);
        setTemp(filtered);
    }
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const fetchData = () => {
    const GET_LISTINGS = `
          query {
            allListings {
              id
              investmentSize
              investmentTerm
              capitalType
              geographicFocus
              industryFocus
              opportunityName
          }
        }`;
      fetch('/admin/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: GET_LISTINGS})
      }).then(response => {
           if (response.ok) {
             return response.json();
           } else {
             throw new Error('Something went wrong ...');
          }
      })
      .then(data => {setTemp(data.data.allListings); getTypes(data.data.allListings); setFull(data.data.allListings); setListings(data.data.allListings)})
      .catch(error => {console.log(error)});
  }
  useEffect(() => {
    fetchData();
  }, []);

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
          value={search}
          onChange={(e) => handleSearchOnChange(e)}
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
            {cTypes.map(name => (
            <option value={name}>{name}</option>
            ))}
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
            {gTypes.map(name => (
            <option value={name}>{name}</option>
            ))}
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
            {iTypes.map(name => (
            <option value={name}>{name}</option>
            ))}
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
            <option value={'a-z'}>Name (A-Z)</option>
            <option value={'z-a'}>Name (Z-A)</option>
            <option value={'size'}>Investment Size</option>
            <option value={'term'}>Investment Term</option>
          </Select>
        </FormControl>
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
        <Button
              onClick={() => resetList()}
              variant="contained"
              className={classes.submit}
             >
              Reset
        </Button>
      </div>
      <TableList key={listings} oppList={listings} viewDetail={props.viewDetail}/>
    </div>
  )
}

export default ListingPage;
