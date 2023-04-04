import React from 'react'
import './Button.module.scss'
import { Link } from 'react-router-dom'
const Button = (props) => {
  
    return (
    <Link to={props.data.path} >
    <button type='submit'>
  {props.data.text}
</button></Link>
  )
}

export default Button