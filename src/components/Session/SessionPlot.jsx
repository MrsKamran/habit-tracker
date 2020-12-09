import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryBar,
} from "victory";

const ChartComponent = (props) => {
  const lineData = props.sessionData;

  return (
    <>
      <div id="graph">
        {/* <VictoryChart theme={VictoryTheme.material}> */}
        <VictoryBar
          interpolation="natural"
          style={{
            data: { stroke: "green" },
          }}
          data={lineData}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel renderInPortal dy={-20} />}
        />
        {/* </VictoryChart> */}
      </div>
    </>
  );
};

const SessionPlot = (props) => {
  const [sess, setSess] = useState([
    {
      x: "",
      y: "",
    },
  ]);

  const [sumDuration, setSumDuration] = useState(0);
  const [sumDurationAll, setSumDurationAll] = useState(0);

  useEffect(() => {
    fetchAllSessions();
  }, []);
  const fetchAllSessions = () => {
    axios
      .get("http://localhost:3001/api/sessions/" + props.habitId + "/getAll")
      .then((res) => {
        const sessionsAll = res.data;
        const sessionsForPlot = [];
        let sum = 0;
        let sumAll = 0;
        const sessions = sessionsAll.slice(Math.max(sessionsAll.length - 7, 0));
        sessions.forEach((session) => {
          sessionsForPlot.push({
            x: session.date.toString(),
            y: parseInt(session.duration),
          });
          sum = sum + parseInt(session.duration);
        });
        sessionsAll.forEach((session) => {
          sumAll = sumAll + parseInt(session.duration);
        });

        setSess(sessionsForPlot);
        setSumDuration(sum);
        setSumDurationAll(sumAll);
      })
      .catch((err) => console.log(err));
  };

  const handleBarPlot = (e) => {
    e.preventDefault();

    fetchAllSessions();
  };

  return (
    <div className="habit">
      <ChartComponent sessionData={sess} />
      <button
        type="submit"
        className="btn btn-primary"
        value="Plot Sessions"
        onClick={handleBarPlot}
      >
        Plot sessions
      </button>
      <p>
        You practised <b>{sumDuration}</b> minutes of
        <b> {props.habitName}</b> this week
      </p>
      <p>
        You have practised around <b>{Math.floor(sumDurationAll / 60)}</b> hours
        of
        <b> {props.habitName} </b> till now
      </p>
    </div>
  );
};

export default SessionPlot;
