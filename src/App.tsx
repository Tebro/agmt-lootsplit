import React, {useCallback, useState} from 'react';
import './App.css';
import AddPlayerForm from "./AddPlayerForm";
import PlayerTable from "./PlayerTable";
import {Button} from "@material-ui/core";
import EndResult from "./EndResult";

export interface Presence {
  start: Date;
  end?: Date;
}

export interface PlayerPresenceDb {
  [key: string]: Presence[];
}

export const startNewPresence = (): Presence => ({start: new Date()});

function App() {

  const [players, setPlayers] = useState<string[]>([])
  const [presences, setPresences] = useState<PlayerPresenceDb>({})
  const [running, setRunning] = useState(true)

  const addNewPlayer = useCallback((name: string) => {
    if (players.indexOf(name) >= 0) {
      alert("Player already added");
      return;
    }
    setPlayers(players => [...players, name])
    setPresences(old => ({...old, [name]: [startNewPresence()]}))
  }, [players, setPlayers, setPresences])

  const endSession = useCallback(() => {
    const now = new Date()

    players.forEach(name => {
      setPresences(old => ({
        ...old,
        [name]: old[name].map(p => {
          if (!p.end) {
            p.end = now
          }
          return p
        })
      }))
    })

    setRunning(false)
  }, [players, setRunning, setPresences])

  const pausePlayer = useCallback((name: string) => {
    const data = presences[name]
    data[data.length - 1].end = new Date();
    setPresences(old => ({...old, [name]: data}))
  }, [setPresences, presences])

  const resumePlayer = useCallback((name: string) => {
    const newData = [...presences[name], startNewPresence()]
    setPresences(old => ({...old, [name]: newData}))
  }, [presences, setPresences])

  return (
    <div className="App">
      <header className="App-header">
        <h1>AGMT - Loot split</h1>
      </header>
      <div className="ContentWrapper">
        {running && <>
          <AddPlayerForm addNewPlayer={addNewPlayer} />
          <PlayerTable players={players} playerPresences={presences} pausePlayer={pausePlayer} resumePlayer={resumePlayer} />
          <Button color="primary" onClick={endSession}>End session</Button>
        </>}
        {!running && <EndResult players={players} playerPresences={presences} />}
      </div>
    </div>
  );
}

export default App;
