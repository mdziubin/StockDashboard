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
  const [authInfo, setAuthInfo] = useState(
    JSON.parse(localStorage.getItem('authInfo'))
  );

  const routing = useRoutes(routes);
  const routingAuth = useRoutes(authRoutes);

  const value = { authInfo, setAuthInfo };

  return (
    <authContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {authInfo ? routing : routingAuth}
      </ThemeProvider>
    </authContext.Provider>
  );
};

export default App;
