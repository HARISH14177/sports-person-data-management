import React, { useState } from "react";
import "./Dashboard.css";
import Gym from "./GymPage";
import Event from "./EventPage";
import Athlete from "./AthletePage";
import Score from "./ScorePage";
import Winner from "./winner";
const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const cards = [
    { title: "Gym Management", component: "gym" },
    { title: "Event management", component: "event" },
    { title: "Athlete Registration", component: "athlete" },
    { title: "Score management", component: "score" },
    {title:"Final Resut",component:"Result"}
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case "gym":
        return <Gym />;
      case "event":
        return <Event />;
      case "athlete":
        return <Athlete/>;
      case "score":
        return <Score/>;
        case "Result":
          return <Winner/>
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Sports Event Management</h1>
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.title}
            className="card"
            onClick={() => setSelectedSection(card.component)}
          >
            {card.title}
          </div>
        ))}
      </div>

      <div className="section-container">
        {renderSection()}
      </div>
    </div>
  );
};

export default Dashboard;
