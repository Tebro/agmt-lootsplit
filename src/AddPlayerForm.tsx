import React, {useCallback, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import './AddPlayerForm.css';


interface AddPlayerFormProps {
  addNewPlayer: (name: string) => void;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({addNewPlayer}) => {
  const [value, setValue] = useState("");

  const submit = useCallback(() => {
    addNewPlayer(value);
    setValue("")
  }, [addNewPlayer, value, setValue])

  return <div className="AddPlayerForm">
    <p>Add Player</p>
    <TextField color="primary" value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Player name" />
    <Button variant="outlined" onClick={submit} color="primary">Add</Button>
  </div>

}

export default AddPlayerForm;
