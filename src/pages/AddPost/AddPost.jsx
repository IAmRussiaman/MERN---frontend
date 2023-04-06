import React, { useEffect, useRef, useState } from 'react'
import SimpleMDE from 'react-simplemde-editor';
import s from './AddPost.module.scss'
import 'easymde/dist/easymde.min.css';
import {useSelector} from 'react-redux';
import  {Navigate, useNavigate, useParams} from 'react-router-dom';
import { isAuthBoolean } from '../../redux/slices/auth';
import axios from '../../axios'
const AddPost = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [imageUrl,setImageUrl] = useState(null)
  const [text,setText]= useState('')
  const [tagss,setTags] = useState('')
  const [title,setTitle] = useState('')
  const inputFileRef = useRef(null)
  const isAuth = useSelector(isAuthBoolean)
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter your text',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
    const handleUrlImage = (e) => {
      const file = e.target.files[0];
      setFileToBase(file);
      console.log(file)
      /*try {
        const formData = new FormData();
        formData.append('image',e.target.files[0])
        const {data} = await axios.post('/upload',formData)
        setImageUrl(data.url)
      } catch (err) {
        console.log('Error while uploading file')
      }*/
    }
    const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result)
      }
    }
   const isEditing = Boolean(id)
  const fetchAddPost = async() => {
    const tags = tagss.split(",")
    const fields = {
      title,
      tags,
      imageUrl,
      text,   
    };
    const {data} = isEditing ? await axios.patch(`/posts/${id}`,fields): await axios.post('/posts', fields)
    const newId = isEditing ? id : data._id;
    navigate(`/posts/${newId}`)
  }
  useEffect(() => {
   if(id){
    axios.get(`/posts/${id}`).then(({data}) => {
      setText(data.text);
      setTitle(data.title);
      setImageUrl(data.imageUrl);
      setTags(data.tags.join(','))
    })
   }
  }, [])
  
  if(!window.localStorage.getItem('token') && !isAuth){
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <section className={s.section}>
      <div className={s.addPostBox}>
      <div className={s.uploadButton} > <button onClick={()=> inputFileRef.current.click()} >Upload Image</button>
        <input type='file' ref={inputFileRef} onChange={handleUrlImage} hidden></input>
        {imageUrl && (<div><button className={s.deleteButton}>Delete image</button></div>)}
        </div>
        {imageUrl && (<div className={s.boximage}><img src={/*`${process.env.REACT_APP_API_URL}${imageUrl}`*/ imageUrl}></img></div>)}
      <input type="text" class={s.title} placeholder="Enter your blog title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" class={s.tags} placeholder="Tags" value={tagss} onChange={(e) => setTags(e.target.value)}/>
      <div><SimpleMDE className={s.editor} value={text} onChange={onChange} options={options}  /></div></div>
      <button className={s.addPostButton} onClick={fetchAddPost}>{isEditing ? "Save Changes" : "Add Post"}</button>
    </section>
  )
}

export default AddPost