import React from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';

const FormSelect = props => {
  return (
    <FormControl>
      <Select value={props.value} onChange={props.onSelect}>
        {props.values.map(el => {
          return (
            <MenuItem value={el} key={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
