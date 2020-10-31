import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from 'src/components/GlobalStyles';
import routes from 'src/routes';
import authRoutes from 'src/authRoutes';

import authContext from 'src/context/authContext';
import CustomThemeProvider from 'src/theme/CustomThemeProvider';

const App = () => {
  const [authInfo, setAuthInfo] = useState(
    JSON.parse(localStorage.getItem('authInfo'))
  );

  const routing = useRoutes(routes);
  const routingAuth = useRoutes(authRoutes);

  const value = { authInfo, setAuthInfo };

  return (
    <authContext.Provider value={value}>
      <CustomThemeProvider>
        <GlobalStyles />
        {authInfo ? routing : routingAuth}
      </CustomThemeProvider>
    </authContext.Provider>
  );
};

export default App;
