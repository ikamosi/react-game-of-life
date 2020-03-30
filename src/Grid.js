import React, { useEffect } from 'react';
import { makeGrid, generateNext, isEmpty } from './Util';

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

function Grid() {
  const [rows, setRows] = React.useState(makeGrid(WIDTH, HEIGHT));
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

  function togglePlaying() {
    setPlaying(!playing);
  }

  function handleClick(x, y) {
    let data = rows.map(row => row.slice());
    data[y][x] = !data[y][x];
    setRows(data);
  }

  function handleClear() {
    setRows(makeGrid(WIDTH, HEIGHT));
    setPlaying(false);
  }

  return (
    <div>
      {rows.map((row, i) => (
        <div className="board-row" key={i}>
          <Row y={i} data={row} onClick={handleClick} />
        </div>
      ))}
      <button onClick={togglePlaying}>
        {playing ? "Stop" : "Play"}
      </button>
      <button onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}

export default Grid;
