import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    height: 'auto',
    width: 'auto',
    padding: '20px',
    overflow: 'auto',
    marginBottom: '20px',
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

const InputForm = props => {
  const { classes, form, index, handleFormUpdate } = props;
  const formData = typeof form[index] === 'undefined' ? {} : form[index];
  const onoff = typeof formData.onoff === 'undefined' ? false : formData.onoff

  return (
    <List component="div" disablePadding>
      <ListItem>
        <ListItemIcon>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText primary="On/Off" />

        <Switch
          checked={onoff}
          onChange={handleFormUpdate(index,'onoff','')}
        />
      </ListItem>
    </List>
  );
};

const DefaultList = props => {
  const { classes, handleClick, open, index, form } = props;
  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() => {
          handleClick(index);
        }}
      >
        <ListItemText primary={index} />
        <ExpandMore
          className={classnames(classes.expand, {
            [classes.expandOpen]: open.indexOf(index) !== -1,
          })}
        />
      </ListItem>
      <Collapse in={open.indexOf(index) !== -1} timeout="auto" unmountOnExit>
        <InputForm {...props} />
      </Collapse>
    </React.Fragment>
  );
};

const generateListItems = props => {
  return _.map(_.range(3), i => {
    const index = i === 0 ? 'CO2' : i === 1 ? 'Nutrient' : 'Water';
    return <DefaultList key={i} index={index} {...props} />;
  });
};

const InputList = props => {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.paper} key={1}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Input Control</ListSubheader>}
        >
          {generateListItems(props)}
        </List>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(InputList);
