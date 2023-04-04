import React from 'react'
import s from './Registration.module.scss'
import {useForm} from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingUp, isAuthBoolean } from '../../redux/slices/auth'
const Registration = () => {
  const isAuth = useSelector(isAuthBoolean)
  const {register,handleSubmit,setError,formState:{errors,isValid}} = useForm({defaultValues: {
    email:'',
    password:'',
    fullName:''
  },mode:'onChange'})
  const dispatch = useDispatch()
  const onSubmit = async (values) => {
    const data = await dispatch(fetchSingUp(values))
    if(!data.payload){
      alert('Account is not authorized')
    }
    if(data.payload.token) {
      window.localStorage.setItem('token',data.payload.token)
    }
  }
  if(isAuth){
    return <Navigate to={'/'}></Navigate>
  }
  return (
   <section>
    <div className={s.container}>
      <div className={s.loginBox}>
      <header>
      <h2>Sign Up</h2>
      <p>Create your Blog Account</p>
      <form onSubmit={handleSubmit(onSubmit)}><div className={s.inputs}>
        
      <input className={s.logInput}  type="text" placeholder="@UserName" required {...register('fullName',{required:'Enter your username'})}/>
      <input className={s.logInput}  type="email" placeholder="e-mail" required {...register('email',{required:'Enter password'})} />
      <input className={s.logInput}  type="password" placeholder="Password" required {...register('password',{required:'Enter password'})}/>
     
      </div>
      <div className={s.buttons}>
      <Link to='/login'><button> Log In</button></Link>
        <button type='submit'> Sign Up</button>
      </div></form>
      
   </header>
  
   
     
     
      
    </div>   
  </div>
    
   </section>
  )
}

export default Registration