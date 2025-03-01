import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    //const [salary, setSalary] = useState("");
    const [cost, setCost] = useState("");
    const [shipment, setShipment] = useState("");
    const [AdressCustomer, setAdressCustomer] = useState("");
    const [message, setMessage] = useState("");
    const [CustomerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !lastname || !cost || !shipment || !AdressCustomer || !CustomerPhoneNumber) {
            setMessage("Please fill in all fields.");
            return;
        }
    
        if (isNaN(cost)) {
            setMessage("Cost must be numeric.");
            return;
        }
    
        const userData = { 
            name, 
            lastname, 
            cost: parseFloat(cost), 
            shipment, 
            AdressCustomer, 
            CustomerPhoneNumber 
        };
    
        console.log("Sending data:", userData);
    
        try {
            await axios.post("http://localhost:5000/create-user", userData, {
                headers: { "Content-Type": "application/json" } 
            });
            navigate('/');
        } catch (error) {
            setMessage(error.response?.data?.message || "Error creating user, please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <h1>Create User</h1>
            {message && <p className="text-danger">{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3 w-25">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 w-25">
                    <label className="form-label">Lastname:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div><div className="w-25 mb-3">
                    <label className="form-label">AdressCustomer:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={AdressCustomer}
                        onChange={(e) => setAdressCustomer(e.target.value)}
                        required
                    />
                </div>

                <div className="w-25 mb-3">
                    <label className="form-label">CustomerPhoneNumber:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={CustomerPhoneNumber}
                        onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 w-25">
                    <label className="form-label">Cost:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>

                <div className="w-25 mb-3">
                    <label className="form-label">Shipment:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={shipment}
                        onChange={(e) => setShipment(e.target.value)}
                        required
                    />
                </div>

                
                

                <div className="mb-3">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;
