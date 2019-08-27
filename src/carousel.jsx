import React, { Component } from 'react'
import Image from './image'

class Carousel extends Component {

  
    state = {
      images: [],
      count: 0,
      totalImages: 3,
      loading: true
    }

    interval = null
  
    componentWillMount() {
    this.getImages()
    this.interval = setInterval(this.increment, 2000)
  }

  increment = () => {
    
    this.setState((prevProps) => {
      if (prevProps.count === prevProps.totalImages - 1) {
        return {count: 0}
      }
       return {count: prevProps.count + 1}
    })

    clearInterval(this.interval)
    this.interval = setInterval(this.increment, 2000)
  }

  decrement = () => {
    
    this.setState((prevProps) => {
      if (prevProps.count === 0) {
        return {count: prevProps.totalImages - 1}
      } 
      return {count: prevProps.count - 1}
    })
  }

  getCurrentImage() {
    return this.state.images[this.state.count]
  }

  async getImages() {
    const imageList = []
    for (let i = 0; i < parseInt(this.state.totalImages); i++) {
      let url = await fetch(`https://source.unsplash.com/random/${i}`)
      imageList.push(url.url)
   }
   this.setState({images: imageList})
  }

  render() {

    let currentImg = this.getCurrentImage()
    const loading = this.state.images.length === 0 ? <p>LOADING!</p> : ""
    return (
      <div>
        {loading}
        <button onClick={this.decrement}>Previous</button>
        <Image imgUrl={currentImg} />
        <button onClick={this.increment}>Next</button>
      </div>
    )
  }
}


export default Carousel;