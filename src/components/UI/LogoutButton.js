import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputIcon from '@material-ui/icons/Input';
import { IconButton, Tooltip } from '@material-ui/core';
import authContext from 'src/context/authContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setAuthInfo } = useContext(authContext);

  const logoutClickedHandler = () => {
    localStorage.clear('authInfo');
    navigate('/login');
    setAuthInfo(null);
  };

  return (
    <Tooltip title="Logout">
      <IconButton color="inherit" onClick={logoutClickedHandler}>
        <InputIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
