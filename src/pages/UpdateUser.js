import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [CustomerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [cost, setCost] = useState("");
    const [shipment, setShipment] = useState("");
    const [AdressCustomer, setAdressCustomer] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/${id}`);
                setName(res.data.name);
                setLastname(res.data.lastname);
                setAdressCustomer(res.data.AdressCustomer);
                setCost(res.data.cost);
                setShipment(res.data.shipment);
                setCustomerPhoneNumber(res.data.CustomerPhoneNumber);
            } catch (error) {
                setMessage("Error Fetching User");
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/update-user/${id}`, { name, lastname, AdressCustomer, cost, shipment, CustomerPhoneNumber });
            navigate("/");
        } catch (error) {
            setMessage("Error Updating User. Please Try Again");
        }
    };

    return (
        <div className='container'>
            <h2>Update User</h2>    
            {message && <p className='text-danger'>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className='w-25 mb-3'>
                    <label className='form-label'>Name:</label>
                    <input
                        type='text'
                        className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Lastname:</label>
                    <input
                        type='text'
                        className='form-control'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>AdressCustomer:</label>
                    <input
                        type='text'
                        className='form-control'
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


                <div className='w-25 mb-3'>
                    <label className='form-label'>Cost:</label>
                    <input
                        type='number'
                        className='form-control'
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Shipment:</label>
                    <input
                        type='number'
                        className='form-control'
                        value={shipment}
                        onChange={(e) => setShipment(e.target.value)}
                        required
                    />
                </div>
                
                

                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    );
};

export default UpdateUser;
