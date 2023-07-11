import React from 'react';
import Table from 'react-bootstrap/Table';
import {useUser} from '../context/user.context';
import { BiSolidPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { TiPlus } from "react-icons/ti";

export default function User() {
    const {user,handleDelete} = useUser()
  return (
    <div>
      <div className='mt-5 d-flex justify-content-between'>
        <h3>User Details</h3>
        <Link to='/add'><Button className='button' size='sm' variant="primary"><TiPlus /> Add New</Button>{' '}</Link>
      </div>
    <Table className='mt-3' striped bordered hover size='xl'>
      <thead>
        <tr>
          <th>ID</th>
          <th>FIRST NAME</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
          <th>WEBSITE</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {
          user.map((item,i) => <ShowUserDetails key={i} data={item} handleDelete={handleDelete}/>)
        }
      </tbody>
    </Table>
    </div>
  )
}



function ShowUserDetails({data,handleDelete}){
  return(
      <tr>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.username}</td>
          <td>{data.email}</td>
          <td>{data.phone}</td>
          <td>{data.website}</td>
          <td>
            <Link to={`/Edit/${data.id}`}><BiSolidPencil className='ms-3' /></Link> 
            <FaTrash onClick={() => handleDelete(data.id)} className='ms-3' />
          </td>
        </tr>
  )
}