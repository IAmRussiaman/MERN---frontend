import React from 'react'
import s from './Post.module.scss'
import views from '../../assets/eye-solid.svg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../redux/slices/postsSlice'
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/trash.svg'
const Post = (props) => {
  
  const dispatch = useDispatch()
  const onClickDeletePost = () => {
    const id = props.id
    if(window.confirm("Are u sure u want to delete this post?")){
      dispatch(deletePost(id))
    }
  }
  return (
    <div className={s.post}>
      {props.isEditable ? <div className={s.box}>
        <div className={s.edit}><Link to={`/addpost/${props.id}/edit`}><img src={editIcon}></img></Link></div>
        <div className={s.delete} onClick={onClickDeletePost}><img src={deleteIcon}></img></div>
      </div> : ''}
      <Link to={`/posts/${props.id}`}> <> <div className={s.image} ><img src={`${REACT_APP_API_URL}${props.imageUrl}`}></img></div>
        <div className={s.postInfo}>
            <div className={s.userInfo}>
                <div className={s.avatar}><img src={props.avatar}></img></div>
                <div className={s.username}>{props.username}</div>
                <div className={s.date}>{(props.date).slice(0,10)}</div>
            </div>
            <div className={s.title}>{props.title}</div>
            <div className={s.tags}>{props.tags.map(elem =>{
                return <span>#{elem} </span>
            })} </div>
            <div className={s.text}></div>
            <div className={s.viewsCount}><img src={views}></img>{props.viewsCount}</div>
        </div></></Link>
        
    </div>
   
  )
}

export default Post