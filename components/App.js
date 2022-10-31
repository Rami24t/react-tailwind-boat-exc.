import React from 'react';
import { useReducer, useEffect } from 'react';
import './App.css';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-speedometer';

export default function App() {
  let intervalAction = null;
  function startAction(cb) {
    console.log('started');
    intervalAction = setInterval(() => cb, 100);
  }
  function startAction() {
    console.log('stopped');
    clearInterval(intervalAction);
  }

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
          speed: state.speed > 0 ? state.speed - 1 : state.speed + 1,
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
            speed:
              state.gear > 0 &&
              state.speed > 10 &&
              state.speed + 1 * state.gear >= 120
                ? 120
                : state.gear < 0 &&
                  state.speed < 10 &&
                  state.speed + 1 * state.gear <= -120
                ? -120
                : state.speed + 1 * state.gear,
          };
        return state;
      case 'speedDown':
        if (state.started && state.gear != 0 && state.speed != 0)
          return {
            ...state,
            speed: state.speed >= 0 ? state.speed - 1 : state.speed + 1,
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
      <h1>React Boat ~^~^~ Oct 2022 &copy; Rami Al-Saadi</h1>
      <Speedometer
        value={Math.abs(state.speed)}
        fontFamily="squada-one"
        max={120}
      >
        <Background />
        <Arc />
        <Needle />
        <Progress />
        <Marks />
        <Indicator />
      </Speedometer>
      <div className="flex justify-center items-center w-[10%] gap-4 p-2 text-gray-400 rounded border border-gray-800">
        <label>
          {' '}
          Engine
          <input
            disabled
            value={state.started ? 'ON' : 'OFF'}
            className={
              'border-2 w-min-[20%] rounded bg-black text-' +
              (state.started ? 'green' : 'red') +
              '-400 mb-1'
            }
          />
        </label>
        {/*
        <label>
          Speed
         <input
            className={'border-2 w-min-[20%] rounded bg-black text-yellow-300 p-1'}
            disabled
            value={Math.abs(state.speed)}
          />
        </label>
         */}
        <label>
          Direction
          <input
            className={
              'border-2 w-min-[20%] rounded bg-black text-' +
              (state.speed >= 0 ? 'yellow' : 'red') +
              '-300 p-1 px-2'
            }
            disabled
            value={state.speed >= 0 ? 'Forward' : 'Reverse'}
          />
        </label>
        <label>
          Gear
          <input
            className={
              'border-2 w-min-[20%] rounded bg-black text-yellow-300 p-1'
            }
            disabled
            value={
              state.gear == 0
                ? 'N'
                : state.gear > 0
                ? 'F' + state.gear
                : 'R' + state.gear
            }
          />
        </label>
        <label>
          Distance
          <input
            className={
              'border-2 w-min-[20%] rounded bg-black text-yellow-300 mb-1'
            }
            disabled
            value={state.distance}
          />
        </label>
      </div>
      <div className="flex justify-center items-center w-[10%] bg-gray-10 gap-5">
        <div>
          <button onClick={() => dispatch({ type: 'on/off' })}>
            {state.started ? 'Turn Off' : 'Start'}
          </button>
        </div>
        <div>
          <button
            onMouseLeave={() => stopAction()}
            onMouseUp={() => stopAction()}
            onMouseDown={startAction(() => dispatch({ type: 'gas' }))}
          >
            Gas
          </button>
        </div>
        <div>
          <button
            onMouseLeave={() => stopAction()}
            onMouseUp={() => stopAction()}
            onMouseDown={startAction(() => dispatch({ type: 'speedDown' }))}
          >
            Slow Down
          </button>
        </div>
        <div>
          <button onClick={() => dispatch({ type: 'gearUp' })}>Shift UP</button>
        </div>
        <div>
          <button onClick={() => dispatch({ type: 'gearDown' })}>
            Shift Down
          </button>
        </div>
      </div>
    </div>
  );
}
