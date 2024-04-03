import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoaderActive: true}

  componentDidMount () {
    this.getBlogsData()
  }
  getBlogsData = async () => {
    const blogsData = await fetch("https://apis.ccbp.in/blogs")
    const data = await blogsData.json()
    const updatedData = data.map(each => ({
      author: each.author,
      id: each.id,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      title: each.title,
      topic: each.topic,
    }))
    this.setState({blogsData: updatedData, isLoaderActive: false})
  }
  render() {
    const {blogsData, isLoaderActive} = this.state
    return (
      <div className="blog-list-container">
        {
         isLoaderActive ? 
         (
          <Loader type="TailSpin" color="RED" height={10} width={10}/>
         ) : (blogsData.map(item => (
          <BlogItem blogData={item} key={item.id} />
        )))
        }
      </div>
    )
  }
}

export default BlogsList
