import React, { useEffect, useState }from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';

function createData(name, capital, size, term, geofocus, industry, oppName, postDate, endDate) {
  return {
           'name': name,
           'capitalType': capital,
           'invSize': size,
           'term': term,
           'geoFocus': geofocus,
           'industry': industry,
           'opportunityName': oppName,
           'postedDate': postDate,
           'endDate': endDate,
         };
}

const rows = [
  createData('PSE Grant Association', 'Grant', '100k', '1yr', 'Washington', 'Energy', 'NRCS Conservation Innovation Grant', '11/07/2019', '04/24/2020'),
  createData('Wells Fargo Bank', 'Debt', '20k', '4yr', 'West Coast', 'Workforce', 'Wells Fargo Workforce Loan', '10/24/2018', '05/22/2020'),
  createData('Ferry ASC NW', 'Equity (Private)', '500k', '2yr', 'Pacific Northwest', 'Boating', 'ASC Commerce Equity Grant', '10/24/2018', '04/30/2020'),
  createData('World Bank', 'Venture Capital', '100M', '5yr', 'Nationwide', 'Transportation', 'World Bank Prime Tech Investment', '01/05/2020', '06/20/2020'),
  createData('University of WA', 'Equity (Public)', '10k', '0yr', 'Washington', 'Education', 'UW Commerce Education Fund', '03/07/2019', '07/21/2020'),
  createData('Query Investors', 'Angel', '300k', '3yr', 'Washington', 'Maritime Tech', 'Query Tech Accelorator Funding', '04/11/2018', '07/01/2020'),
  createData('Antarctic Research Grant', 'Grant', '10k', '1yr', 'Washington', 'Research', 'Arctic Sustainability Research Grant', '07/13/2019', '06/02/2020'),
  createData('National Institutes of Health', 'Grant', '20k', '4yr', 'West Coast', 'Public Health', 'NIH Health Reform Grant', '05/06/2019', '06/20/2020'),
  createData('PNW Commerce Associates', 'Loan', '1k', '2yr', 'Pacific Northwest', 'Conservation', 'PNW Conservation Loan', '06/05/2018', '06/30/2020'),
  createData('Capital Bank', 'Venture Capital', '100k', '5yr', 'Nationwide', 'Biological Tech', 'Capital Bank Investors Group', '11/11/2019', '08/24/2020'),
  createData('University of WA', 'Grant', '10k', '0yr', 'Washington', 'Research', 'UW Maritime Research Grant', '12/13/2019', '09/01/2020'),
  createData('Maritime Investor Group', 'Angel', '30k', '3yr', 'Washington', 'Renewable Tech', 'Washington Renewable Resource Funding', '01/22/2017', '04/04/2020'),
];

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    padding: '30px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  heading: {
    paddingLeft: '80px',
    paddingRight: '80px',
    display: 'flex',
  },
  stats: {
    paddingLeft: '80px',
    paddingRight: '80px',
    display: 'flex',
    flexDirection: 'column',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    marginBottom: '30px',
  },
  image: {
    width: '100px',
    height: '100px',

  },
  headingText: {
    paddingLeft: '40px',

  },
  orgDetail:  {
    paddingRight: '70px',
    color: '#919195',
  },
  overview: {
    width: '580px',
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
    color: '#919195',
    marginTop: '20px',
  },
  services: {
    width: '580px',
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
    color: '#919195',
    marginTop: '20px',
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
  statColumn: {
    width: '175px',
    height: '260px',
    border: '2px solid #e0e0e0',
    borderTop: '3px solid #006088',
    borderRadius: '10px',
    boxShadow: '0px 3px #e0e0e0',
    textAlign: 'center',
    color: '#006088',
  },
  statDouble: {
    width: '470px',
    height: '100px',
    border: '2px solid #e0e0e0',
    borderTop: '3px solid #006088',
    borderRadius: '10px',
    boxShadow: '0px 3px #e0e0e0',
    paddingRight: '25px',
    paddingLeft: '25px',
    textAlign: 'center',
    color: '#006088',
    display: 'flex',
    justifyContent: 'space-between',
  },
  statTriple: {
    width: '760px',
    height: '100px',
    border: '2px solid #e0e0e0',
    borderTop: '3px solid #006088',
    borderRadius: '10px',
    boxShadow: '0px 3px #e0e0e0',
    paddingRight: '25px',
    paddingLeft: '25px',
    marginBottom: '60px',
    textAlign: 'center',
    color: '#006088',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const DetailPage = (props) => {
  const classes = useStyles();
  const [detail, setDetail] = useState({opportunityName: '', postedDate: '', endDate: '', description: '', investmentSize: '', investmentTerm: '', capitalType: '', geographicFocus: '', industryFocus: '', contact: ''});
  const fetchData = (id) => {
    const GET_LISTING = `
          query GetUserById($id: ID!) {
            Listing(where: { id: $id }) {
              id
              contact
              postedDate
              endDate
              description
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
        body: JSON.stringify({query: GET_LISTING, variables: {id: id}})
      }).then(response => {
           if (response.ok) {
             return response.json();
           } else {
             throw new Error('Something went wrong ...');
          }
      })
      .then(data => setDetail(data.data.Listing))
      .catch(error => {console.log(error)});
  }
  useEffect(() => {
    fetchData(props.detail);
  }, []);

  return(
    <div className={classes.content}>
      <div className={classes.controls}>
        <IconButton onClick={() => props.setView('listing')}>
          <ArrowBackIosIcon style={{color: '#006088'}} />
        </IconButton>
        <Button onClick={() => props.viewConnect(detail['contact'], detail['opportunityName'])} style={{backgroundColor: '#006088',
                        marginRight: "80px",
                        height: '40px',
                        width: '140px',
                        color: 'white',
                        borderRadius: '10px'}} variant="contained">
          Connect
        </Button>
      </div>
      <div className={classes.heading}>
        <div className={classes.image}>
          <img 
            src="https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"
            alt="company logo"
            style={{maxWidth: '100%', maxHeight: '100%', borderRadius: '50%'}}/>
        </div>
        <div className={classes.headingText}>
          <Typography variant="h5" style={{color: '#006088', fontWeight: 'bold', textDecoration: 'underline'}}>
            {detail['opportunityName']}
          </Typography>
          <div style={{paddingTop: '20px', paddingBottom: '10px'}}>
            <Typography className={classes.orgDetail} variant="caption">
              Date Posted:
            </Typography>
            <Typography className={classes.orgDetail} style={{display: 'inline', paddingRight: '25px'}}>
              {new Date(detail['postedDate']).toDateString()}
            </Typography>
            <Typography className={classes.orgDetail} variant="caption">
              Date Ending:
            </Typography>
            <Typography className={classes.orgDetail} style={{display: 'inline', paddingRight: '25px'}}>
              {new Date(detail['endDate']).toDateString()}
            </Typography>
          </div>
            <Typography className={classes.orgDetail} variant="caption">
              Oppurtunity Description:
            </Typography>
            <div style={{display: 'block'}}>
            <Typography variant="body">
              {detail['description']}
            </Typography>
            </div>
        </div>
      </div>
      <hr style={{width: '100%', marginBottom: '20px', marginTop: '40px', backgroundColor: '#e0e0e0'}}/>
      <div className={classes.stats}>
        <div className={classes.statRow}>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Type of Capital
            </Typography>
            <Typography style={{fontWeight: 'bold', color: '#919195', marginTop: '10px'}} variant="h6" >
              {detail['capitalType']}
            </Typography>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Investment Size
            </Typography>
            <Typography style={{fontWeight: 'bold', color: '#919195', marginTop: '10px'}} variant="h6" >
              {detail['investmentSize']}
            </Typography>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Geographical Focus
            </Typography>
            <Typography style={{fontWeight: 'bold', color: '#919195', marginTop: '10px'}} variant="h6" >
              {detail['geographicFocus']}
            </Typography>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Industry Type
            </Typography>
            <Typography style={{fontWeight: 'bold', color: '#919195', marginTop: '10px'}} variant="h6" >
              {detail['industryFocus']}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

        /*<div className={classes.statRow}>
          <div className={classes.statDouble}>
            <div>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Target Business Stage
            </Typography>
            </div>
            <div>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Target Business Size
            </Typography>
            </div>
          </div>
          <div className={classes.statDouble}>
            <div>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Financial Return Expectation
            </Typography>
            </div>
            <div>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Underwriting Criteria
            </Typography>
            </div>
          </div>
        </div>
        <div className={classes.statRow}>
          <div>
            <div className={classes.statTriple}>
              <div>
                <Typography style={{fontWeight: 'bold'}} variant="caption">
                  Eligible Uses of Investment
                </Typography>
              </div>
              <div>
                <Typography style={{fontWeight: 'bold'}} variant="caption">
                  Investment Terms
                </Typography>
              </div>
              <div>
                <Typography style={{fontWeight: 'bold'}} variant="caption">
                  Size of Investment
                </Typography>
              </div>
            </div>
            <div className={classes.statDouble}>
              <div>
                <Typography style={{fontWeight: 'bold'}} variant="caption">
                  Target Business Stage
                </Typography>
              </div>
              <div>
                <Typography style={{fontWeight: 'bold'}} variant="caption">
                  Target Business Size
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.statColumn}>
            <div>
             <Typography style={{fontWeight: 'bold'}} variant="caption">
               Investment within Core Maritime
             </Typography>
            </div>
            <div style={{ lineHeight: '90px', height: '100px'}}>
              <Typography style={{fontWeight: 'bold', color: '#919195'}} variant="h5" component="span">
                Yes
              </Typography>
            </div>
            <div>
              <Typography style={{fontWeight: 'bold'}} variant="caption">
                Investment in Non- Core Maritime
              </Typography>
            </div>
            <div style={{ lineHeight: '65px', height: '130px'}}>
              <Typography style={{fontWeight: 'bold', color: '#919195'}} variant="h5" component="span">
                No
              </Typography>
            </div>
          </div>
        </div> */

export default DetailPage;
