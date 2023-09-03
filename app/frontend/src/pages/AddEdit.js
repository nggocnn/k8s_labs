import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './AddEdit.css'
import axios from 'axios'

const initialState = {
  name: '',
  email: '',
  contact: '',
}

const AddEdit = () => {
  const [state, setState] = useState(initialState)

  const { name, email, contact } = state

  const navigator = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    axios.get(`/api/get/${id}`).then((resp) => setState({ ...resp.data }))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !contact) {
      window.alert('Please provide value in input field')
    } else {
      if (!id) {
        axios
          .post(`/api/post`, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: '', email: '', contact: '' })
          })
          .catch((err) => window.alert(err.response.data))
        window.alert('Contact Added Successfully')
      } else {
        axios
          .put(`/api/update/${id}`, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: '', email: '', contact: '' })
          })
          .catch((err) => window.alert(err.response.data))
        window.alert('Contact Updated Successfully')
      }
      setTimeout(() => navigator('/'), 500)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name..."
          value={name || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email..."
          value={email || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter mobile no..."
          value={contact || ''}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? 'Update' : 'Save'} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  )
}

export default AddEdit
