import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  PieChart, Pie, Sector, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data01 = [
  { name: 'Private', value: 400 }, { name: 'Public', value: 250 },
  { name: 'Other', value: 250 },
];
const data02 = [
  { name: 'Grants', value: 30 },
  { name: 'Series A', value: 100 },
  { name: 'Debt', value: 25 },
  { name: 'Angel', value: 21 },
  { name: 'Venture', value: 12 },
  { name: 'Credit', value: 5.25 },
  { name: 'Equity', value: 15.1 },
  { name: 'Series C', value: 30.7 },
  { name: 'Series B', value: 60 },
  { name: 'Bonds', value: 10.5 },
  { name: 'Series D', value: 20 },
];

const data03 = [
  {
    name: 'Grants', total: 53,
  },
  {
    name: 'Series A', total: 120,
  },
  {
    name: 'Debt', total: 23,
  },
  {
    name: 'Angel', total: 21,
  },
  {
    name: 'Venture', total: 42,
  },
  {
    name: 'Credit', total: 55,
  },
  {
    name: 'Equity', total: 11,
  },
  {
    name: 'Series C', total: 35,
  },
  {
    name: 'Series B', total: 60,
  },
  {
    name: 'Bonds', total: 10,
  },
  {
    name: 'Series D', total: 20,
  },
];

const RADIAN = Math.PI / 180;

const renderLabel = (entry) => {
    return entry.name + '($' + entry.value + 'K)';
}

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name}`}
    </text>
  );
};

const useStyles = makeStyles(theme => ({
  content: {
    padding: '80px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '70px',
      paddingTop: '30px',
    },
  },
  stats: {
    paddingLeft: '80px',
    paddingRight: '80px',
    paddingTop: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    marginBottom: '30px',
  },
  statBox: {
    width: '175px',
    height: '100px',
    border: '2px solid #e0e0e0',
    borderTop: '3px solid #006088',
    borderRadius: '10px',
    boxShadow: '0px 3px #e0e0e0',
    textAlign: 'center',
    color: '#006088',
  },
  viz: {
    display: 'flex',
  },
}));

const InsightPage = () => {
  const [listings, setListings] = React.useState([]);
  const [totalList, setTotalList] = React.useState(0);
  const [totalVol, setTotalVol] = React.useState('');
  const [totalUser, setTotalUser] = React.useState(0);
  const [newMonth, setNewMonth] = React.useState(0);
  const [pieData, setPieData] = React.useState({});
  const [barData, setBarData] = React.useState({});
  const parseData = (data) => {
    const currDate = new Date().toISOString();
    let currMonth = currDate.substring(5, 6);
    let currYear = currDate.substring(0, 3);
    setListings(data);
    setTotalList(data.length);
    let totalVol = 0;
    let newThisMonth = 0;
    let fundDist = {};
    let listDist= {};
    let fundData = [];
    let listData= [];
    for (let i = 0; i < data.length; i++) {
      let listMonth = data[i]['postedDate'].substring(5, 6);
      let listYear = data[i]['postedDate'].substring(0, 3);
      totalVol += parseInt(data[i]['investmentSize']);
      if (listMonth === currMonth && listYear == currYear) {
        newThisMonth++;
      }
      let amount = parseInt(data[i]['investmentSize']);
      if (!(data[i]['capitalType'] in fundDist)) {
        fundDist[data[i]['capitalType']] = amount;
        listDist[data[i]['capitalType']] = 1;
      } else {
        fundDist[data[i]['capitalType']] += amount;
        listDist[data[i]['capitalType']] += 1;
      }
    }
    for (let type in fundDist) {
      fundData.push({name: type, value: fundDist[type]})
    }
    for (let type in listDist) {
      listData.push({name: type, value: listDist[type]})
    }
    setTotalVol("$" + totalVol + "K");
    setNewMonth(newThisMonth);
    setPieData(fundData);
    setBarData(listData);
  }
  const fetchData = () => {
    const GET_LISTINGS = `
          query {
            allListings {
              investmentSize
              capitalType
              postedDate
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
      .then(data => {parseData(data.data.allListings)})
      .catch(error => {console.log(error)});
  }
  const fetchUserData = () => {
    const GET_USER_META = `
          query {
            _allUsersMeta {
              count
          }
        }`;
      fetch('/admin/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: GET_USER_META})
      }).then(response => {
           if (response.ok) {
             return response.json();
           } else {
             throw new Error('Something went wrong ...');
          }
      })
      .then(data => {setTotalUser(data.data._allUsersMeta.count)})
      .catch(error => {console.log(error)});
  }
  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.heading}>
        <h1 style={{color: "#043464"}}>Current Funding Data Overview</h1>
      </div>
      <div className={classes.stats}>
        <div className={classes.statRow}>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Total Listings
            </Typography>
            <div style={{ lineHeight: '75px', height: '130px'}}>
              <Typography style={{fontWeight: 'bold', color: '#0074D9'}} variant="h4" component="span">
                {totalList}
              </Typography>
            </div>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Total Volume
            </Typography>
            <div style={{ lineHeight: '75px', height: '130px'}}>
              <Typography style={{fontWeight: 'bold', color: '#0074D9'}} variant="h5" component="span">
                {totalVol}
              </Typography>
            </div>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              New Listings This Month
            </Typography>
            <div style={{ lineHeight: '75px', height: '130px'}}>
              <Typography style={{fontWeight: 'bold', color: '#0074D9'}} variant="h4" component="span">
                {newMonth}
              </Typography>
            </div>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Total Users
            </Typography>
            <div style={{ lineHeight: '75px', height: '130px'}}>
              <Typography style={{fontWeight: 'bold', color: '#0074D9'}} variant="h4" component="span">
                {totalUser}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <hr style={{width: '100%', marginBottom: '60px', marginTop: '40px', backgroundColor: '#e0e0e0'}}/>
      <div className={classes.viz}>
        <div>
          <h1 style={{color: "#043464"}}>Funding Breakdown</h1>
          <PieChart width={600} height={500}>
            <Pie data={pieData} dataKey="value" cx={280} cy={250} innerRadius={140} outerRadius={180} fill="#0074D9" label={renderLabel} />
          </PieChart>
        </div>
        <div>
          <h1 style={{color: "#043464"}}>Listing Distribution</h1>
          <BarChart
            width={550}
            height={500}
            data={barData}
            margin={{
              top: 50, right: 30, left: 0, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#1261A0" />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

export default InsightPage;
