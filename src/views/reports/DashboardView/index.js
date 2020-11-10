import React, { useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import FavTable from './FavTable';
import GraphContainer from './Graph/GraphContainer';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const [symbol, setSymbol] = useState(null);
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3} justify="center">
          <Grid item lg={10} xs={12}>
            {symbol && <GraphContainer symbol={symbol} />}
          </Grid>
          <Grid item lg={10} xs={12}>
            <FavTable setSymbol={setSymbol} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
