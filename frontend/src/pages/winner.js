import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './winner.css'

const Winner = () => {
  const [scores, setScores] = useState([]);
  const [winners, setWinners] = useState([]);
  const [genderFilter, setGenderFilter] = useState('');
  const [eventFilter, setEventFilter] = useState('');
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [scoreRes, eventRes] = await Promise.all([
        axios.get('http://localhost:5000/api/score/get'),
        axios.get('http://localhost:5000/api/event/get')
      ]);
      setScores(scoreRes.data);
      setEventList(eventRes.data);
      processWinners(scoreRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const processWinners = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const key = `${item.athleteId}-${item.eventId}`;
      if (!grouped[key]) {
        grouped[key] = {
          athleteId: item.athleteId,
          eventId: item.eventId,
          total: 0,
          athlete: item.athlete
        };
      }
      grouped[key].total += item.maxLift || 0;
    });

    const topPerEvent = {};
    Object.values(grouped).forEach((entry) => {
      const { eventId, athleteId, total, athlete } = entry;
      if (!topPerEvent[eventId] || total > topPerEvent[eventId].total) {
        topPerEvent[eventId] = {
          athleteId,
          eventId,
          total,
          athlete
        };
      }
    });

    setWinners(Object.values(topPerEvent));
  };

 const filteredWinners = useMemo(() => {
  return winners.filter((w) => {
    const genderMatch = genderFilter === '' || w.athlete?.gender === genderFilter;
    const eventMatch = eventFilter === '' || w.eventId.toString() === eventFilter;
    return genderMatch && eventMatch;
  });
}, [winners, genderFilter, eventFilter]);


  return (
    <div className="winner-container">
      <h2> Event Winners</h2>

      <div className="filters">
        <label>
          Filter by Gender:
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <label>
          Filter by Event:
          <select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)}>
            <option value="">All</option>
            {eventList.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </label>
      </div>

      {filteredWinners.length === 0 ? (
        <p>No winners found for the selected filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Athlete Name</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Weight Category</th>
              <th>Total Score</th>
              <th>Event</th>
              <th>No. of Disciplines</th>
              <th>Aadhar No</th>
              <th>Win Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredWinners.map((w, i) => {
              const event = eventList.find(e => e.id === w.eventId);
              const disciplineCount = scores.filter(
                s => s.athleteId === w.athleteId && s.eventId === w.eventId
              ).length;
              const winDate = scores.find(
                s => s.athleteId === w.athleteId && s.eventId === w.eventId
              )?.createdAt;

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{w.athlete?.name || 'N/A'}</td>
                  <td>{w.athlete?.gender || 'N/A'}</td>
                  <td>{w.athlete?.weight || 'N/A'}</td>
                  <td>{w.athlete?.weightCategory || 'N/A'}</td>
                  <td>{w.total}</td>
                  <td>{event?.name || 'N/A'}</td>
                  <td>{disciplineCount}</td>
                  <td>{w.athlete?.aadharNumber || 'N/A'}</td>
                  <td>{winDate ? new Date(winDate).toLocaleDateString() : 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Winner;
