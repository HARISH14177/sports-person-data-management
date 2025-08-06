import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './athlete.css';

// 👉 Utility functions for auto calculation
const getCategoryByAge = (age) => {
  if (age <= 14) return "Sub Junior";
  if (age <= 18) return "Junior";
  if (age <= 39) return "Senior";
  if (age <= 49) return "Master 1";
  if (age <= 59) return "Master 2";
  if (age <= 69) return "Master 3";
  if (age <= 79) return "Master 4";
  return "Master 5";
};

const getWeightCategory = (weight) => {
  if (weight <= 59) return "Light";
  if (weight <= 74) return "Middle";
  if (weight <= 90) return "Heavy";
  return "Super Heavy";
};

const AthleteReg = () => {
  const [getdata, setgetdata] = useState([]);
  const [view, setview] = useState({
    name: '',
    dob: '',
    age: '',
    gender: '',
    weight: '',
    weightCategory: '',
    category: '',
    aadharNumber: '',
    mobile: '',
    eventId: '',
    gymId: ''
  });

  const [photo, setphoto] = useState(null);
  const [aadhar, setaadhar] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/athlete/get');
      setgetdata(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...view, [name]: value };

    if (name === "age" && value) {
      updated.category = getCategoryByAge(parseInt(value));
    }

    if (name === "weight" && value) {
      updated.weightCategory = getWeightCategory(parseFloat(value));
    }

    setview(updated);
  };

  const handleEdit = (athlete) => {
    setview({
      name: athlete.name,
      dob: athlete.dob.split("T")[0],
      age: athlete.age,
      gender: athlete.gender,
      weight: athlete.weight,
      weightCategory: athlete.weightCategory,
      category: athlete.category,
      aadharNumber: athlete.aadharNumber,
      mobile: athlete.mobile,
      eventId: athlete.eventId,
      gymId: athlete.gymId
    });
    setIsEdit(true);
    setEditId(athlete.id);
    setphoto(null);
    setaadhar(null);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(view).forEach((key) => {
      data.append(key, view[key]);
    });
    if (photo) data.append("photo", photo);
    if (aadhar) data.append("aadhar", aadhar);

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/athlete/update/${editId}`, data);
        alert("Athlete Updated Successfully");
      } else {
        await axios.post('http://localhost:5000/api/athlete/create', data);
        alert("Athlete Registered Successfully");
      }

      setIsEdit(false);
      setEditId(null);
      setview({
        name: '',
        dob: '',
        age: '',
        gender: '',
        weight: '',
        weightCategory: '',
        category: '',
        aadharNumber: '',
        mobile: '',
        eventId: '',
        gymId: ''
      });
      setphoto(null);
      setaadhar(null);
      fetchData();
    } catch (error) {
      console.error("Error submitting form", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Error saving athlete");
      }
    }
  };

  const Delete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/athlete/delete/${id}`);
      alert("Deleted successfully");
      fetchData();
    } catch (error) {
      alert("Error deleting athlete");
    }
  };

  return (
    <div className="athlete-container">
      <h2>{isEdit ? 'Edit Athlete' : 'Athlete Registration'}</h2>

      <form onSubmit={handlesubmit} className="athlete-form">
        <label>
          Name
          <input type="text" name="name" value={view.name} onChange={handleChange} required />
        </label>
        <label>
          DOB
          <input type="date" name="dob" value={view.dob} onChange={handleChange} required />
        </label>
        <label>
          Age
          <input type="number" name="age" value={view.age} onChange={handleChange} required />
        </label>
        <label>
          Gender
          <select name="gender" value={view.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Weight
          <input type="number" name="weight" value={view.weight} onChange={handleChange} required />
        </label>
        <label>
          Weight Category
          <input type="text" name="weightCategory" value={view.weightCategory} readOnly style={{ backgroundColor: "#f0f0f0" }} />
        </label>
        <label>
          Category
          <input type="text" name="category" value={view.category} readOnly style={{ backgroundColor: "#f0f0f0" }} />
        </label>
        <label>
          Aadhar Number
          <input type="text" name="aadharNumber" value={view.aadharNumber} onChange={handleChange} required />
        </label>
        <label>
          Mobile
          <input type="text" name="mobile" value={view.mobile} onChange={handleChange} required />
        </label>
        <label>
          Event ID
          <input type="number" name="eventId" value={view.eventId} onChange={handleChange} required />
        </label>
        <label>
          Gym ID
          <input type="number" name="gymId" value={view.gymId} onChange={handleChange} required />
        </label>
        <label>
          Photo
          <input type="file" onChange={(e) => setphoto(e.target.files[0])} />
        </label>
        <label>
          Aadhar
          <input type="file" onChange={(e) => setaadhar(e.target.files[0])} />
        </label>
        <button type="submit">{isEdit ? 'Update' : 'Submit'}</button>
      </form>

      <table className="athlete-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Weight</th>
            <th>Category</th>
            <th>Weight Category</th>
            <th>Mobile</th>
            <th>Photo</th>
            <th>Aadhar</th>
            <th>Event ID</th>
            <th>Gym ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {getdata.map((data) => (
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{new Date(data.dob).toLocaleDateString()}</td>
              <td>{data.age}</td>
              <td>{data.gender}</td>
              <td>{data.weight}</td>
              <td>{data.category}</td>
              <td>{data.weightCategory}</td>
              <td>{data.mobile}</td>
              <td>
                <img src={`http://localhost:5000/uploads/${data.photoUrl}`} alt="photo" width="50" />
              </td>
              <td>
                <img src={`http://localhost:5000/uploads/${data.aadharUrl}`} alt="aadhar" width="50" />
              </td>
              <td>{data.eventId}</td>
              <td>{data.gymId}</td>
              <td>
                <button onClick={() => handleEdit(data)}>Edit</button>
              </td>
              <td>
                <button onClick={() => Delete(data.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AthleteReg;
