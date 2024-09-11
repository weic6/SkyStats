// src/App.js
import React, { useEffect, useState } from "react";
import DelayTable from "./components/DelayTable";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const [delays, setDelays] = useState([]);
  const [airline, setAirline] = useState("AA");
  const [flightNumber, setFlightNumber] = useState("1000");

  const handleAirlineChange = (event) => {
    setAirline(event.target.value);
  };

  useEffect(() => {
    if (airline && flightNumber) {
      console.log(
        `http://localhost:3000/delay-history/flight/${airline}/${flightNumber}`
      );
      fetch(
        `http://localhost:3000/delay-history/flight/${airline}/${flightNumber}`
      )
        .then((response) => response.json())
        .then((data) => setDelays(data))
        .catch((error) => console.error("Error fetching data:", error));
    } //it will use the 'proxy' specify in the package.json
  }, [airline, flightNumber]); // Dependencies that trigger the effect

  return (
    <div className="App">
      <NavBar />
      {/* <NavBar
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      /> */}
      <h1>Flight Delay Dashboard</h1>
      <div className="search-and-table">
        <div className="search-box">
          <select
            id="airline_IATA"
            name="airline_IATA"
            value={airline}
            onChange={handleAirlineChange}
          >
            <option value="AA">AA-American Airlines Inc.</option>
            <option value="AS">AS-Alaska Airlines Inc.</option>
            <option value="MQ">MQ-American Eagle Airlines Inc.</option>
            <option value="B6">B6-JetBlue Airways</option>
            <option value="DL">DL-Delta Air Lines Inc.</option>
            <option value="F9">F9-Frontier Airlines Inc.</option>
            <option value="HA">HA-Hawaiian Airlines Inc.</option>
            <option value="NK">NK-Spirit Air Lines</option>
            <option value="OO">OO-Skywest Airlines Inc.</option>
            <option value="EV">EV-Atlantic Southeast Airlines</option>
            <option value="UA">UA-United Air Lines Inc.</option>
            <option value="US">US-US Airways Inc.</option>
            <option value="WN">WN-Southwest Airlines Co.</option>
            <option value="VX">VX-Virgin America</option>
          </select>
          <input
            type="text"
            placeholder="Flight Number"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </div>
        <DelayTable delays={delays} />
      </div>
    </div>
  );
}

export default App;
