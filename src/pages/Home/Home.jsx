import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../components/Post/Post'
import { fetchPosts, fetchPostsByPopularity, fetchTags } from '../../redux/slices/postsSlice'
import s from './Home.module.scss'
import Loader from '../../components/Loader/Loader'
const Home = () => {
  const dispatch = useDispatch()
  const [popular,setPopular] = useState(false)
  const userData = useSelector(state => state.auth.data)
  const posts = useSelector(state => state.posts.posts.items)
  const tags = useSelector(state=>state.posts.tags.items)
  useEffect(() => {
   dispatch(fetchPosts())
  dispatch(fetchTags())
    
  }, [])
  
  let result = posts.map((elem,key) => {
    return <Post id={elem._id} isEditable={userData?._id == elem.user._id} title={elem.title} date={elem.createdAt} avatar={elem.user.avatarUrl} username={elem.user.fullName} tags={elem.tags} viewsCount = {elem.viewsCount} imageUrl={elem.imageUrl}/>
  })
  let resultTags = tags.map((elem,key) => {
    return <div><span>#{elem}</span></div>
  })
  const getNewest = () => {
    dispatch(fetchPosts());
    setPopular(false)
  }
  const getPopular = () => {
    dispatch(fetchPostsByPopularity());
    setPopular(true)
  }
  return <section>
      <div className={s.home}>
        <div className={s.menu}><div className={popular ? '': s.focused} onClick={getNewest}>Newest</div><div  className={popular ? s.focused: ''} onClick={getPopular}>Popular</div></div>
        {Object.keys(posts).length === 0 ? <div className={s.box}><Loader/></div>:<><div className={s.posts}>{result}</div>
        <div className={s.tags}><h2>Tags</h2>{resultTags}</div> </>}
      </div>
  </section>
    
  
}

export default Home