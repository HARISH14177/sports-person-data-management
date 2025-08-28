import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './score.css';

const ScoreManagement = () => {
  const [data, setData] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    athleteId: '',
    disciplineId: '',
    eventId: '',
    trial1: '',
    trial2: '',
    trial3: ''
  });

  useEffect(() => {
    fetchScores();
    fetchDropdownData();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/score/get');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [athleteRes, eventRes, disciplineRes] = await Promise.all([
        axios.get('http://localhost:5000/api/athlete/get'),
        axios.get('http://localhost:5000/api/event/get'),
        axios.get('http://localhost:5000/api/discipline/get')
      ]);
      setAthletes(athleteRes.data);
      setEvents(eventRes.data);
      setDisciplines(disciplineRes.data);
    } catch (error) {
      console.error("Error loading dropdowns:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!/^\d*$/.test(value)) return; // Only allow numeric input

    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const t1 = parseFloat(formData.trial1);
    const t2 = parseFloat(formData.trial2);
    const current = parseFloat(value);

    if (name === 'trial2') {
      if (!isNaN(t1) && !isNaN(current) && current <= t1) {
        alert('Trial 2 must be greater than Trial 1');
        setFormData({ ...formData, trial2: '' });
        return;
      }
    }

    if (name === 'trial3') {
      if (!isNaN(t2) && !isNaN(current) && current <= t2) {
        alert('Trial 3 must be greater than Trial 2');
        setFormData({ ...formData, trial3: '' });
        return;
      }

      if (!isNaN(t1) && !isNaN(current) && current <= t1) {
        alert('Trial 3 must be greater than Trial 1');
        setFormData({ ...formData, trial3: '' });
        return;
      }
    }
  };

  const handleSubmit = async () => {
    const trial1 = parseFloat(formData.trial1);
    const trial2 = parseFloat(formData.trial2);
    const trial3 = parseFloat(formData.trial3);

    if (!(trial1 < trial2 && trial2 < trial3)) {
      alert('Trials must be in strictly increasing order (T1 < T2 < T3)');
      return;
    }

    const payload = {
      athleteId: parseInt(formData.athleteId),
      disciplineId: parseInt(formData.disciplineId),
      eventId: parseInt(formData.eventId),
      trial1,
      trial2,
      trial3
    };

    try {
      await axios.post('http://localhost:5000/api/score/create', payload);
      alert('Score added successfully!');
      setFormData({
        athleteId: '',
        eventId: '',
        disciplineId: '',
        trial1: '',
        trial2: '',
        trial3: ''
      });
      fetchScores();
    } catch (error) {
      console.error("Error creating score:", error);
      alert("Failed to add score.");
    }
  };

  const Delete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/score/delete/${id}`);
      alert("Deleted successfully");
      fetchScores();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="score-container">
      <h2>Score Management</h2>

      <div className="form-section">
        <h3>Add New Score</h3>

        <select name="athleteId" value={formData.athleteId} onChange={handleChange}>
          <option value="">Select Athlete</option>
          {athletes.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <select name="eventId" value={formData.eventId} onChange={handleChange}>
          <option value="">Select Event</option>
          {events.map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>

        <select name="disciplineId" value={formData.disciplineId} onChange={handleChange}>
          <option value="">Select Discipline</option>
          {disciplines.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="trial1"
          placeholder="Trial 1"
          value={formData.trial1}
          onChange={handleChange}
        />
        <input
          type="number"
          name="trial2"
          placeholder="Trial 2"
          value={formData.trial2}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="number"
          name="trial3"
          placeholder="Trial 3"
          value={formData.trial3}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="button-group">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <table className="score-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Athlete</th>
            <th>Discipline</th>
            <th>Event</th>
            <th>Trial 1</th>
            <th>Trial 2</th>
            <th>Trial 3</th>
            <th>Max Lift</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.athlete?.name || d.athleteId}</td>
              <td>{d.discipline?.name || d.disciplineId}</td>
              <td>{d.event?.name || d.eventId}</td>
              <td>{d.trial1}</td>
              <td>{d.trial2}</td>
              <td>{d.trial3}</td>
              <td>{d.maxLift}</td>
              <td>{new Date(d.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => Delete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreManagement;
