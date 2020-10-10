import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = props => {
  const classes = useStyles();

  const [filter, setFilter] = useState('');

  const filterChangedHandler = event => {
    setFilter(event.target.value);
  };

  const searchClickedHandler = () => {
    props.search(filter);
  };

  return (
    <div className={classes.root}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box display="flex">
              <Button
                color="primary"
                variant="contained"
                onClick={searchClickedHandler}
              >
                Search
              </Button>
              <Box maxWidth={500} ml={1} flexGrow={1}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search stocks"
                  variant="outlined"
                  onChange={filterChangedHandler}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
