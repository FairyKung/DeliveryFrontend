
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/');
            console.log("Fetched Data:", res.data);  // ตรวจสอบข้อมูลที่ได้จาก API
            
            // ตรวจสอบว่า res.data เป็น array หรือไม่
            if (Array.isArray(res.data)) {
                setData(res.data);
            } else {
                console.error("Data ไม่ใช่ array:", res.data);
            }
            console.log("Success");
        } catch (error) {
            console.log("Fail", error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure ?")) {
            try {
                await axios.delete(`http://localhost:5000/delete-user/${id}`);
                fetchUser(); // รีเฟรชข้อมูลหลังลบสำเร็จ
            } catch (error) {
                console.log("Error deleting user: " + error);
            }
        }
    };

    return (
        
        <div className="container text-center">
            <h1>Delivery</h1>

            <Link to="/create-user" className="btn btn-primary btn-sm mb-3">
                Create New
            </Link>

            <table className="table table-hover table-dark">
                <thead>

                    
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">AdressCustomer</th>
                        <th scope="col">CustomerPhoneNumber</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Shipment</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.lastname}</td>
                            <td>{item.AdressCustomer}</td>
                            <td>{item.CustomerPhoneNumber}</td>
                            <td>{item.cost}</td>
                            <td>{item.shipment}</td>
                            
                            <td>
                                <button className="btn btn-warning">
                                    <Link to={`edit-user/${item.id}`} className="MyFontBlack">Edit</Link>
                                </button>
                                {" "}
                                <button className="btn btn-danger" onClick={() => deleteUser(item.id)}>
                                    Delete
                                </button>
                                
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            
        </div>
    );
}

export default Home;
