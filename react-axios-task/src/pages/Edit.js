import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';

export default function Edit() {
  const {id} = useParams();
  const [modifiedData,setModifiedData] = useState([]);

  useEffect(() => {
    const devEnv = process.env.NODE_ENV !== "production";
    const {REACT_APP_DEV_URL,REACT_APP_PROD_URL} = process.env;
    Axios.get(`${devEnv? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`+id)
    .then(res => setModifiedData(res.data))
    .catch(err => console.log(err));
  },[id])

  const navigate = useNavigate()
  const handleUpdate = (event) => {
    event.preventDefault();
    const devEnv = process.env.NODE_ENV !== "production";
    const {REACT_APP_DEV_URL,REACT_APP_PROD_URL} = process.env;
    Axios.put(`${devEnv? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`+id,modifiedData)
    .then(res => {
      alert('Data Update Successfully!')
      navigate('/')
    })
  }

  return (
      <div style={{ width: "1296px", height: "100vh" }} className='d-flex justify-content-center align-items-center'>
        <Form style={{ width: "480px", height: "480px" }} onSubmit={handleUpdate}>
        <h1 className='mb-4 text-success'>Edit The Existing Data</h1>
          <Form.Group className='mb-3'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter First name"
              value = {modifiedData.name}
              onChange={e => setModifiedData({ ...modifiedData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-3' md="9">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              value = {modifiedData.username}
              required
              onChange={e => setModifiedData({ ...modifiedData, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-3' md="9">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={modifiedData.email}
              onChange={e => setModifiedData({ ...modifiedData, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-3' md="9">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter Phone Number" value={modifiedData.phone} required onChange={e => setModifiedData({ ...modifiedData, phone: e.target.value })} />
          </Form.Group>
          <Form.Group className='mb-3' md="9">
            <Form.Label>Website</Form.Label>
            <Form.Control type="text" placeholder="Enter Website" value={modifiedData.website} required onChange={e => setModifiedData({ ...modifiedData, website: e.target.value })} />
          </Form.Group>
          <Button type="submit">Update form</Button>
        </Form>
      </div>
  )
}
