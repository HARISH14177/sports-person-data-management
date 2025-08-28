import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './event.css';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [refereesByEvent, setRefereesByEvent] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const [eventData, setEventData] = useState({
    name: '',
    location: '',
    date: '',
    time: '',
    organiserGymId: '',
    refereeName: ''
  });

  useEffect(() => {
    fetchEvents();
    fetchGyms();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/event/get');
      setEvents(res.data);
      fetchRefereesForAllEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const fetchRefereesForAllEvents = async (eventsList) => {
    const all = {};
    for (const event of eventsList) {
      try {
        const res = await axios.get(`http://localhost:5000/api/refree/by-event/${event.id}`);
        all[event.id] = res.data;
      } catch (err) {
        console.error(`Error fetching referees for event ${event.id}`);
      }
    }
    setRefereesByEvent(all);
  };

  const fetchGyms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gym/get');
      setGyms(res.data);
    } catch (err) {
      console.error('Failed to fetch gyms:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD
const handleSubmit = async () => {
  const { name, location, date, time, organiserGymId, refereeName } = eventData;
  if (!name || !location || !date || !time || !organiserGymId || !refereeName) {
    return alert('Please fill in all fields including referee');
  }

  try {
    if (isEditing) {

      await axios.put(`http://localhost:5000/api/event/update/${editEventId}`, {
        name,
        location,
        date: new Date(date),
        time,
        organiserGymId: parseInt(organiserGymId)
      });

      
      await axios.delete(`http://localhost:5000/api/refree/delete-by-event/${editEventId}`);

      await axios.post('http://localhost:5000/api/refree/create', {
        name: refereeName,
        gymId: parseInt(organiserGymId),
        eventId: editEventId
      });

      alert('Event and Referee updated successfully');
    } else {
      const eventRes = await axios.post('http://localhost:5000/api/event/create', {
        name,
        location,
        date: new Date(date),
        time,
        organiserGymId: parseInt(organiserGymId)
      });

      const newEventId = eventRes.data.id;

      await axios.post('http://localhost:5000/api/refree/create', {
        name: refereeName,
        gymId: parseInt(organiserGymId),
        eventId: newEventId
      });

      alert('Event and Referee created successfully');
    }

    // Reset form
    setEventData({ name: '', location: '', date: '', time: '', organiserGymId: '', refereeName: '' });
    setIsEditing(false);
    setEditEventId(null);
    fetchEvents();
  } catch (err) {
    console.error('Submit Error:', err);
    alert('Failed to submit event');
  }
};


  const handleSubmit = async () => {
    const { name, location, date, time, organiserGymId, refereeName } = eventData;
    if (!name || !location || !date || !time || !organiserGymId || !refereeName) {
      return alert('Please fill in all fields including referee');
    }

    try {
      if (isEditing) {
        
        await axios.put(`http://localhost:5000/api/event/update/${editEventId}`, {
          name,
          location,
          date: new Date(date),
          time,
          organiserGymId: parseInt(organiserGymId)
        });

        
        await axios.post('http://localhost:5000/api/refree/create', {
          name: refereeName,
          gymId: parseInt(organiserGymId),
          eventId: editEventId
        });

        alert('Event and Referee updated successfully');
      } else {
        
        const eventRes = await axios.post('http://localhost:5000/api/event/create', {
          name,
          location,
          date: new Date(date),
          time,
          organiserGymId: parseInt(organiserGymId)
        });

        const newEventId = eventRes.data.id;

        await axios.post('http://localhost:5000/api/refree/create', {
          name: refereeName,
          gymId: parseInt(organiserGymId),
          eventId: newEventId
        });

        alert('Event and Referee created successfully');
      }

    
      setEventData({ name: '', location: '', date: '', time: '', organiserGymId: '', refereeName: '' });
      setIsEditing(false);
      setEditEventId(null);
      fetchEvents();
    } catch (err) {
      console.error('Submit Error:', err);
      alert('Failed to submit event');
    }
  };
>>>>>>> cada83ca762c26d5306adb73e37efcfa78fc4d9b

  const handleEdit = (event) => {
    setIsEditing(true);
    setEditEventId(event.id);
    setEventData({
      name: event.name,
      location: event.location,
      date: event.date.split('T')[0],
      time: event.time,
      organiserGymId: event.organiserGymId.toString(),
      refereeName: (refereesByEvent[event.id]?.[0]?.name || '')
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/event/delete/${id}`);
        fetchEvents();
        alert('Deleted successfully');
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="event-container">
      <h2>Event Management</h2>

      <div className="event-form">
        <h3>{isEditing ? 'Edit Event' : 'Create Event'}</h3>
        <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} />
        <input type="date" name="date" value={eventData.date} onChange={handleChange} />
        <input type="text" name="time" placeholder="Time" value={eventData.time} onChange={handleChange} />
        <select name="organiserGymId" value={eventData.organiserGymId} onChange={handleChange}>
          <option value="">Select Gym</option>
          {gyms.map((gym) => (
            <option key={gym.id} value={gym.id}>{gym.name}</option>
          ))}
        </select>
        <input type="text" name="refereeName" placeholder="Referee Name" value={eventData.refereeName} onChange={handleChange} />

        <button onClick={handleSubmit}>
          {isEditing ? 'Update Event' : 'Create Event'}
        </button>
      </div>

      <table border="1" cellPadding="8" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Organizer Gym</th>
            <th>Referees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.time}</td>
              <td>{gyms.find((g) => g.id === event.organiserGymId)?.name || 'Unknown'}</td>
              <td>{(refereesByEvent[event.id] || []).map((ref) => ref.name).join(', ') || '—'}</td>
              <td>
                <button onClick={() => handleEdit(event)}>Edit</button>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventManagement;
