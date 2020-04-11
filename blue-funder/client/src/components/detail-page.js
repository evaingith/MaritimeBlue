import React from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';

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
  return(
    <div className={classes.content}>
      <div className={classes.controls}>
        <IconButton onClick={() => props.setView('listing')}>
          <ArrowBackIosIcon style={{color: '#006088'}} />
        </IconButton>
        <Button style={{backgroundColor: '#006088',
                        marginRight: "80px",
                        height: '40px',
                        width: '140px',
                        color: 'white',
                        borderRadius: '10px'}} variant="contained">
          Apply
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
            Company Name {props.detail}
          </Typography>
          <div style={{paddingTop: '20px', paddingBottom: '10px'}}>
            <Typography className={classes.orgDetail} variant="caption">
              HQ City, State
            </Typography>
            <Typography className={classes.orgDetail} variant="caption">
              Organization Type
            </Typography>
            <Typography className={classes.orgDetail} variant="caption">
              Legal Status
            </Typography>
            <Typography className={classes.orgDetail} variant="caption">
              Industry
            </Typography>
          </div>
          <div className={classes.overview}>
            <Typography variant="caption">
              Organizational Overview
            </Typography>
          </div>
          <div className={classes.services}>
            <Typography variant="caption">
              Other Services Provided
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
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Product Name/Family
            </Typography>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Total AUM
            </Typography>
          </div>
          <div className={classes.statBox}>
            <Typography style={{fontWeight: 'bold'}} variant="caption">
              Maritime Portfolio AUM
            </Typography>
          </div>
        </div>
        <div className={classes.statRow}>
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
        </div>
      </div>
    </div>
  )
}

export default DetailPage;
