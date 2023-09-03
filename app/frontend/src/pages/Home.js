import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState([])

  const loadData = async () => {
    const response = await axios.get('/api/get')
    setData(response.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete contact?')) {
      axios.delete(`/api/remove/${id}`)
      window.alert('Contact Deleted Successfully')
      setTimeout(() => loadData(), 500)
    }
  }

  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/Addcontact">
        <button className="btn btn-contact">Add Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th align="center">No.</th>
            <th align="center">Name</th>
            <th align="center">Email</th>
            <th align="center">Contact</th>
            <th align="center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td align="right">{item.name}</td>
              <td align="right">{item.email}</td>
              <td align="right">{item.contact}</td>
              <td align="right">
                <Link to={`/update/${item.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteContact(item.id)}
                >
                  Delete
                </button>
                <Link to={`/view/${item.id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
