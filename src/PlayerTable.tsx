import React, {useCallback} from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {PlayerPresenceDb} from "./App";

interface PlayerTableProps {
  players: string[];
  playerPresences: PlayerPresenceDb;
  pausePlayer: (name: string) => void;
  resumePlayer: (name: string) => void;
}


const PlayerTable: React.FC<PlayerTableProps> = ({players, playerPresences, pausePlayer, resumePlayer}) => {

  const isActive = useCallback((name: string) => {
    const presences = playerPresences[name]
    return !presences[presences.length - 1].end
  }, [playerPresences])

  return <div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map(p =>
            <TableRow key={p}>
              <TableCell>{p}</TableCell>
              <TableCell>
                {isActive(p) ? <Button onClick={() => pausePlayer(p)}>Pause</Button> : <Button onClick={() => resumePlayer(p)}>Resume</Button>}
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  </div>

}

export default PlayerTable;
