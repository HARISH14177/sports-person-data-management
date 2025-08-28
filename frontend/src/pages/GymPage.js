import React, { useEffect, useState } from "react";
import './gym.css'
import axios from 'axios';

const GymManagement = () => {
  const [gymData, setGymData] = useState({
    name: "",
    ownerName: "",
    coachName: "",
    address: "",
    pincode: "",
    phone: "",
  });

  const [gymList, setGymList] = useState([]);

  useEffect(()=>{
    fetchGyms()
  },[])
  
    const fetchGyms=async ()=>{
      try{
      const response=await axios.get('http://localhost:5000/api/gym/get')
      setGymList(response.data)
      }catch(error){
        console.error("error")
      }
    }
    
  const handleChange = (e) => {
    setGymData({ ...gymData, [e.target.name]: e.target.value });
  };

  const handleAddGym = async () => {
    if (
      gymData.name &&
      gymData.ownerName &&
      gymData.coachName &&
      gymData.address &&
      gymData.pincode &&
      gymData.phone
    ) {
      try {
        const response = await axios.post('http://localhost:5000/api/gym/create', gymData);

        setGymList([...gymList, response.data]);
        setGymData({
          name: "",
          ownerName: "",
          coachName: "",
          address: "",
          pincode: "",
          phone: "",
        });

        alert("Gym added successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to add gym");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleClear = () => {
    setGymData({
      name: "",
      ownerName: "",
      coachName: "",
      address: "",
      pincode: "",
      phone: "",
    });
  };

  const Delete=async (id)=>{
    try{
    await axios.delete(`http://localhost:5000/api/gym/delete/${id}`)
    alert("deleted success")
    fetchGyms()
    }catch(errro){
    alert("error")
    }
  }

  const[editmode,seteditmode]=useState(false)
  const [editid,seteditid]=useState(null)

  const Edit=(gym)=>{
    setGymData(gym)
    seteditmode(true)
    seteditid(gym.id)
  }

  const Update=async()=>{
    try{
    await axios.put(`http://localhost:5000/api/gym/update/${editid}`,gymData)
    alert("Update succesfully")
    seteditmode(false)
    seteditid(null)
    setGymData({
      name: "",
      ownerName: "",
      coachName: "",
      address: "",
      pincode: "",
      phone: "",
    })
    fetchGyms()
    }catch(error){
     alert('errror')
    }
  }

  return (
    <div className="gym-container">
      <h2>Gym Management</h2>

      <div className="form-section">
        <h3>{editmode?"Edit gym":"Add new gym"}</h3>
        <input type="text" name="name" placeholder="Gym Name" value={gymData.name} onChange={handleChange} />
        <input type="text" name="ownerName" placeholder="Owner Name" value={gymData.ownerName} onChange={handleChange} />
        <input type="text" name="coachName" placeholder="Coach Name" value={gymData.coachName} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={gymData.address} onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" value={gymData.pincode} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={gymData.phone} onChange={handleChange} />
        <div className="button-group">
          {editmode?(
            <button onClick={Update}>update gym</button>
          ):(
            <button onClick={handleAddGym}>Add gym</button>
          )}
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>

      
          <table>
            <thead>
              <tr>
                <th>Gym Name</th>
                <th>Owner Name</th>
                <th>Coach Name</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Phone</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {gymList.map((gym, index) => (
                <tr key={index}>
                  <td>{gym.name}</td>
                  <td>{gym.ownerName}</td>
                  <td>{gym.coachName}</td>
                  <td>{gym.address}</td>
                  <td>{gym.pincode}</td>
                  <td>{gym.phone}</td>
                  <td>
                    <button onClick={()=>Edit(gym)}>Edit</button>{""}
                    <button onClick={()=>Delete(gym.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>
    
  );
};

export default GymManagement;
