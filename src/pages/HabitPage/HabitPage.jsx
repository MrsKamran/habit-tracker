import "./Habitpage.css";
import React from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Habit from "../../components/Habit/Habit";

const HabitPage = (props) => {
  const history = useHistory();
  return (
    <div className="HabitPage">
      <NavBar user={props.user} handleLogout={props.handleLogout} />
      <div className="">
        <Habit
          habit={history.location.params.habit}
          deleteHabit={history.location.params.deleteHabit}
          user={history.location.params.user}
        />
      </div>
    </div>
  );
};

export default HabitPage;
