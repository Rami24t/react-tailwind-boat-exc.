import React from 'react';
import { useReducer, useEffect } from 'react';
import './App.css';

export default function App() {
  useEffect(() => {
    const time = setInterval(() => {
      dispatch({ type: 'distancePerSecond' });
    }, 1000);
    return () => clearInterval(time);
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'distancePerSecond':
        return {
          ...state,
          distance: state.distance + Math.abs(state.speed),
        };
      case 'on/off':
        if (!state.started) {
          if (Math.random() < 0.5) return { ...state, started: true };
          else alert('Try again!');
          return state;
        } else {
          return { ...state, started: false, gear: 0 };
        }
      case 'gas':
        if (state.started && state.gear != 0)
          return {
            ...state,
            speed: state.speed + 10 * state.gear,
          };
        return state;
      case 'speedDown':
        if (state.started && state.gear != 0)
          return {
            ...state,
            speed:
              state.speed <= 0 && state.gear < 0
                ? state.speed - 10 * state.gear >= 0
                  ? 0
                  : state.speed - 10 * state.gear
                : state.speed - 10 * state.gear <= 0
                ? 0
                : state.speed - 10 * state.gear,
          };
        return state;
      case 'gearUp':
        if (state.started)
          return { ...state, gear: state.gear >= 5 ? 5 : state.gear + 1 };
        return state;
      case 'gearDown':
        if (state.started)
          return { ...state, gear: state.gear <= -2 ? -2 : state.gear - 1 };
        return state;
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, {
    started: false,
    speed: 0,
    gear: 0,
    distance: 0,
  });

  return (
    <div
      className="container flex gap-5 flex-col p-1 items-center justify-center h-screen"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/random/" +
          window.innerWidth +
          'x' +
          window.innerHeight +
          "?boat')",
      }}
    >
      <div className="flex justify-center items-center w-[100%] bg-gray-100 gap-4">
        <label>
          <input disabled value={state.started ? 'ON' : 'OFF'} />
        </label>
        <label>
          Speed
          <input disabled value={Math.abs(state.speed)} />
        </label>
        <label>
          Direction
          <input disabled value={state.speed >= 0 ? 'Forward' : 'Backward'} />
        </label>
        <label>
          Gear
          <input disabled value={state.gear} />
        </label>
        <label>
          Distance travelled
          <input disabled value={state.distance} />
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
          <button onClick={() => dispatch({ type: 'speedDown' })}>
            speedDown
          </button>
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
