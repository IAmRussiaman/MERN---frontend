import React from 'react'
import s from './Login.module.scss'
import {useForm} from 'react-hook-form'
import { fetchUserData, isAuthBoolean } from '../../redux/slices/auth.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
const Login = () => {
  const isAuth = useSelector(isAuthBoolean)
  const {register,handleSubmit,setError,formState:{errors,isValid}} = useForm({defaultValues: {
    email:'',
    password:''
  },mode:'onChange'})
  const dispatch = useDispatch()
  const onSubmit = async(values) => {
   const data = await dispatch(fetchUserData(values))
   if(!data.payload){
    alert('Account is not authorized to login')
   }
   if('token' in data.payload){
    window.localStorage.setItem('token',data.payload.token)
   }
  }
  if(isAuth) {
    return <Navigate to='/'></Navigate>
  }
  return (
   <section>
    <div className={s.container}>
      <div className={s.loginBox}>
      <header>
      <h2>Log In</h2>
      <p>login here using your username and password</p>
      
      <form onSubmit={handleSubmit(onSubmit)}><div className={s.inputs}>
      <input className={s.logInput}  type="email" placeholder="E-mail" required {...register('email',{required:'Enter e-mail adress'})}/>
      <input className={s.logInput}  type="password" placeholder="Password" required {...register('password',{required:'Enter password'})}/>
      </div>
      <div className={s.buttons}>
        <button type='submit'>Log In</button>
        <Link to='/register'><button> Sign Up</button></Link>
       
      </div>    </form>
   </header> 
    </div>   
  </div>
    
   </section>
  )
}

export default Login