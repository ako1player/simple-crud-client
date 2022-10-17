import React from "react";
import { useState, useCallback } from "react";
import {FaTimes} from "react-icons/fa";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {GrUpdate} from "react-icons/gr";
import {Navigate} from "react-router-dom";

const Edit = ({item, onDelete, onUpdate, onHandleChange, isLoggedIn}) =>{
// Hook
// Parameter is the boolean, with default "false" value
  const useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);
    
    // Define and memorize toggler function in case we pass down the component,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => setState(state => !state), []);
    
    return [state, toggle]
  }

    
    const [edit, setEdit] = useToggle();
  if(!isLoggedIn){
    return <Navigate to="/" replace />
  }

  return(
    !edit ?
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.country}</td>
            <td>{item.position}</td>
            <td>{item.wage}</td>
            <button style={{borderRadius: 8, width: 40}} onClick={()=>{setEdit()}}><AiFillEdit /></button>
            <button style={{borderRadius: 8, width: 40}} onClick={()=>{onDelete(item.id)}}><AiFillDelete /></button>
        </tr>
        :
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.country}</td>
            <td>{item.position}</td>
            <td><input defaultValue={item.wage} onChange={onHandleChange} /></td>
            <button style={{borderRadius: 8, width: 40}} onClick={()=>{onUpdate(item.id)}}><GrUpdate /></button>
            <button style={{borderRadius: 8, width: 40}} onClick={()=>{setEdit()}}><FaTimes /></button>
            <button style={{borderRadius: 8, width: 40}} onClick={()=>{onDelete(item.id)}}><AiFillDelete /></button>
        </tr>
    
  )

}

export default Edit;