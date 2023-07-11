import React, { createContext, useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext({
  user: [],
  setUser: () => Promise,
  inputData: [],
  setInputData: () => Promise,
  handleSubmit: () => null,
  handleDelete: () => null,
});

export const useUser = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [inputData, setInputData] = useState(null);

  // Get Value
  useEffect(() => {
    const devEnv = process.env.NODE_ENV !== "production";
    const {REACT_APP_DEV_URL,REACT_APP_PROD_URL} = process.env;
    Axios.get(`${devEnv? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`)
      .then(res => setUser(res.data))
      .catch(error => console.log(error));
  },[])

  // Add new Data
  const navigat = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault()
    const devEnv = process.env.NODE_ENV !== "production";
    const {REACT_APP_DEV_URL,REACT_APP_PROD_URL} = process.env;
    Axios.post(`${devEnv? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`, inputData)
      .then(res => {
        alert("Data added Successfully");
        navigat('/');
      })
      .catch(err => console.log(err));
  };

  // Delete the Data
  const handleDelete = (id) =>{
    console.log(id)
    const conf = window.confirm("Do You Want Delete");
    const devEnv = process.env.NODE_ENV !== "production";
    const {REACT_APP_DEV_URL,REACT_APP_PROD_URL} = process.env;
    if(conf){
      Axios.delete(`${devEnv? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/`+id)
      .then(res => {
        alert("Your Record has been Deleted");
        navigat('/')
      })
    }
  }

  const value = {
    user,
    setUser,
    handleSubmit,
    inputData,
    setInputData,
    handleDelete,
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}
