import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import GridLayout from './GridLayout';
import classnames from 'classnames';

import InputList from './InputList';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100vw',
    marginTop: '50px',
  },
  paper: {
    height: 'auto',
    width: 'auto',
    padding: '20px',
    overflow: 'auto',
    marginBottom: '20px',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

export class Dashboard extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: [],
      form: {},
    };
  }

  handleFormUpdate = (index, subject, data) => event => {
    const { form } = this.state;
    const newForm = { ...form };

    const obj = form[index];
    const newObj = typeof obj !== 'undefined' ? { ...obj } : {};
    console.log(newObj)

    newObj[subject] = 
      subject !== 'onoff' ? data : typeof newObj[subject] !== 'undefined' ? !newObj[subject] : true;

    newForm[index] = newObj;
    this.setState({ form: newForm });
  };

  handleClick = index => {
    const { open } = this.state;
    const currentIndex = open.indexOf(index);
    const newOpen = [...open];

    if (currentIndex === -1) {
      newOpen.push(index);
    } else {
      newOpen.splice(currentIndex, 1);
    }

    this.setState({
      open: newOpen,
    });
  };

  render() {
    const { classes } = this.props;
    const { open, form } = this.state;

    return (
      <div className="dashboard-dashboard">
        <Grid container className={classes.root} spacing={16}>
          <Grid xs={12} item>
            <Grid container className={classes.demo} justify="space-around" spacing={0}>
              <Grid sm={5} xs={11} item>
                <InputList open={open} form={form} handleClick={this.handleClick} handleFormUpdate={this.handleFormUpdate} />
              </Grid>
              <Grid direction="column" sm={5} xs={11} item>
                <Paper className={classes.paper} key={2}>
                  <Grid item>
                    <Typography variant="h6">CO2</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">Nutrition</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">Water</Typography>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Dashboard));
