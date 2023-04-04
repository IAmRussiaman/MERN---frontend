import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import s from './FullPost.module.scss'

import views from '../../assets/eye-solid.svg'
import Loader from '../../components/Loader/Loader'
const FullPost = () => {
  const [data,setData] = useState()
  const [load,setLoad] = useState(false)
  const {id} = useParams()
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`).then((res) => {
      setData(res.data)
      setLoad(true)
    }).catch(err => {
      alert(`cant get full post ${err}`) 
    })

  },[])
  
  return <>
  {load ? (<section><div className={s.post}>
    <div className={s.image} ><img src={`${process.env.REACT_APP_API_URL}/uploads/${data.imageUrl}`}></img></div>
    <div className={s.postInfo}>
        <div className={s.userInfo}>
            <div className={s.avatar}><img src={data.user.avatarUrl}></img></div>
            <div className={s.username}>{data.user.fullName}</div>
            <div className={s.date}>{(data.createdAt.slice(0,10))}</div>
        </div>
        <div className={s.title}>{data.title}</div>
        <div className={s.tags}>{data.tags.map(elem =>{
            return <span>#{elem} </span>
        })} </div>
        <div className={s.text}>{data.text}</div>
        <div className={s.viewsCount}><img src={views}></img>{data.viewsCount}</div>
    </div>
</div></section>) : <section><div className={s.box}><Loader/></div></section>}
  </>
    
  
}

export default FullPost