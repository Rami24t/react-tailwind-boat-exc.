import React from 'react';
import { useReducer } from 'react';
import './App.css';

export default function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'on/off':
        return { ...state, started: !state.started };
      case 'gas':
        return { ...state, speed: state.speed + 50 };
      case 'brake':
        return { ...state, speed: state.speed - 50 };
      case 'gearUp':
        return { ...state, gear: state.gear + 1 };
      case 'gearDown':
        return { ...state, gear: state.gear - 1 };
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    started: false,
    speed: 0,
    gear: 1,
  });

  return (
    <div className="flex flex-col p-1 items-center justify-center h-screen">
      <div className="flex justify-center items-center w-[100%] bg-gray-100 gap-5">
        <label>
          ON/OFF
          <input disabled value={state.started} />
        </label>
        <label>
          Gas
          <input disabled value={state.speed} />
        </label>
        <label>
          Brake
          <input disabled value={state.speed} />
        </label>
        <label>
          Gear-Up
          <input disabled value={state.gear} />
        </label>
        <label>
          Gear-Down
          <input disabled value={state.gear} />
        </label>
      </div>
      <div className="flex justify-center items-center w-[100%] bg-gray-100 gap-5">
        <div>
          <button onClick={() => dispatch({ type: 'on/off' })}> ON/OFF </button>
        </div>
        <div>
          <button onClick={() => dispatch({ type: 'gas' })}>Gas</button>
        </div>
        <div>
          <button onClick={() => dispatch({ type: 'brake' })}>Brake</button>
        </div>
        <div>
          <button onClick={() => dispatch({ type: 'gearUp' })}>Gear-UP</button>
        </div>
        <div>
          <button onClick={() => dispatch({ type: 'gearDown' })}>
            Gear-Down
          </button>
        </div>
      </div>
    </div>
  );
}
