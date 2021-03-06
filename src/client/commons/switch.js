import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function OnOff(props) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div>
      <Switch
        checked={props.value}
        onChange={props.onChange()}
        value="checkedA"
        inputProps={{ 'aria-label': 'primary checkbox' }}/>
    </div>
  );
}
