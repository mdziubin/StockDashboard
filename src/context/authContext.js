import React from 'react';

const authContext = React.createContext({ token: null, setToken: () => {} });

export default authContext;
