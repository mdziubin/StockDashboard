import React from 'react';

const authContext = React.createContext({
  authInfo: { token: null, userId: null, name: null, perm: null },
  setInfo: () => {}
});

export default authContext;
