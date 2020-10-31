import React from 'react';

const authContext = React.createContext({
  authInfo: { token: null, userId: null, name: null, perm: null },
  setAuthInfo: () => {}
});

export default authContext;
