import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthBoolean, logout } from '../../redux/slices/auth';
import Button from '../Button/Button';
import s from './Header.module.scss'
const Header = () => {
  const isAuth = useSelector(isAuthBoolean);
  const data = {
    login: {
        text: "Log In",
        path: "/login"
    },
    register: {
        text:"Register",
        path:"/register"
    },
    addPost: {
        text: "Add Post",
        path:"/addpost"
    }
  }
  const dispatch = useDispatch()
  
    return (
   <section>
     <div className={s.header}>
     <Link className={s.logo} to={'/'}> <div >Test Blog</div></Link>
        {!isAuth? <div className={s.authTrue}><div className={s.login}><Button data={data.login}></Button></div><div className={s.register}><Button data={data.register}></Button></div></div> :
         <div className={s.authTrue}><div className={s.login}><Button data={data.addPost}></Button></div><div className={s.register}><Link to={'/login'} className={s.logout} onClick={()=>{dispatch(logout());window.localStorage.removeItem('token')}}><button> Logout
         <span></span>
       </button></Link></div></div>}
    </div>
   </section>
  )
}

export default Header