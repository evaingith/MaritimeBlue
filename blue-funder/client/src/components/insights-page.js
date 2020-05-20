import React from "react";
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
    return entry.name + '($' + entry.value + 'M)';
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
                268
              </Typography>
            </div>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Total Volume
            </Typography>
            <div style={{ lineHeight: '75px', height: '130px'}}>
              <Typography style={{fontWeight: 'bold', color: '#0074D9'}} variant="h5" component="span">
                $427.525M
              </Typography>
            </div>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              New Listings This Month
            </Typography>
            <div style={{ lineHeight: '75px', height: '130px'}}>
              <Typography style={{fontWeight: 'bold', color: '#0074D9'}} variant="h4" component="span">
                32
              </Typography>
            </div>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Total Users
            </Typography>
            <div style={{ lineHeight: '75px', height: '130px'}}>
              <Typography style={{fontWeight: 'bold', color: '#0074D9'}} variant="h4" component="span">
                46
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
            <Pie data={data01} label={renderCustomizedLabel} dataKey="value" cx={280} cy={250} outerRadius={120} fill="#74BBFB" />
            <Pie data={data02} dataKey="value" cx={280} cy={250} innerRadius={140} outerRadius={180} fill="#0074D9" label={renderLabel} />
          </PieChart>
        </div>
        <div>
          <h1 style={{color: "#043464"}}>Listing Distribution</h1>
          <BarChart
            width={550}
            height={500}
            data={data03}
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
