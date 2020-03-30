import React, { useEffect } from 'react';
import { makeEmptyGrid, generateNext, isEmpty } from './utils';

const WIDTH = 30;
const HEIGHT = 30;
const SIMULATION_INTEVAL = 100;

function Cell(props) {
  return (
    <div
      className={props.value ? "square-active" : "square"}
      onClick={() => props.onClick(props.x, props.y)}
    >
      {props.value}
    </div>
  );
}

function Row(props) {
  return (
    props.data.map((value, i) => (
      <Cell value={value} y={props.y} x={i} key={i} onClick={props.onClick} />
    ))
  );
}

function Grid(props) {
  return (
    props.rows.map((row, i) => (
      <div className="board-row" key={i}>
        <Row y={i} data={row} onClick={props.onClick} />
      </div>
    ))
  );
}

function App() {
  const [rows, setRows] = React.useState(makeEmptyGrid(WIDTH, HEIGHT));
  const [playing, setPlaying] = React.useState(false);

  useEffect(() => {
    if (playing) {
      let timeout = setTimeout(() => {
        if (isEmpty(rows)) {
          setPlaying(false);
        }
        else {
          setRows(generateNext(rows));
        }
      }, SIMULATION_INTEVAL);
      return () => clearTimeout(timeout);
    }
  }, [playing, rows]);

  function handleClick(x, y) {
    let data = rows.map(row => row.slice());
    data[y][x] = !data[y][x];
    setRows(data);
  }

  function togglePlaying() {
    setPlaying(!playing);
  }

  function handleClear() {
    setRows(makeEmptyGrid(WIDTH, HEIGHT));
    setPlaying(false);
  }

  return (
    <div>
      <Grid rows={rows} onClick={handleClick} />
      <button onClick={togglePlaying}>
        {playing ? "Stop" : "Play"}
      </button>
      <button onClick={handleClear}>
        Clear
        </button>
    </div>
  )    
}

export default App;
