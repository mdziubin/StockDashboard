import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import authRoutes from 'src/authRoutes';

import authContext from 'src/context/authContext';

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const routing = useRoutes(routes);
  const routingAuth = useRoutes(authRoutes);

  const value = { token, setToken };

  return (
    <authContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {token ? routing : routingAuth}
      </ThemeProvider>
    </authContext.Provider>
  );
};

export default App;
