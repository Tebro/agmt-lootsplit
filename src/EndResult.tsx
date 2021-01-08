import React, {useState} from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import {PlayerPresenceDb, Presence} from "./App";
import './EndResult.css';

interface EndResultProps {
  players: string[];
  playerPresences: PlayerPresenceDb;
}

const sumSeconds = (presences: Presence[]): number =>
   presences
     .map(p => p.end!.getTime() - p.start.getTime())
     .map(numMs => Math.floor(numMs/1000))
     .reduce((a, b) => a + b, 0);

const EndResult: React.FC<EndResultProps> = ({players, playerPresences}) => {
  const [value, setValue] = useState(0);
  const [tax, setTax] = useState(0)

  const playerSeconds: {[key: string]: number} = players.reduce((obj, name) => ({...obj, [name]: sumSeconds(playerPresences[name])}), {});
  const allSeconds = Object.keys(playerSeconds).reduce((sum, name) => sum + playerSeconds[name], 0);

  const taxTotal = value * (tax/100);
  const restValue = value - taxTotal;

  return <div>
    <div className="ValueAndTax">
      <TextField label="Total value" value={value} onChange={e => setValue(parseInt(e.target.value))} type="number"/>
      <TextField label="Tax %" value={tax} onChange={e => setTax(parseInt(e.target.value))} type="number"/>
    </div>

    <p>Tax total: {taxTotal}</p>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell>Minutes present</TableCell>
            <TableCell>Cut</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map(p =>
            <TableRow key={p}>
              <TableCell>{p}</TableCell>
              <TableCell>{Math.floor(playerSeconds[p] / 60)}</TableCell>
              <TableCell>{Math.floor((playerSeconds[p] / allSeconds) * restValue)}</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
}

export default EndResult;
