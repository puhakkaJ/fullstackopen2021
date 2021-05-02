const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  var sorted = blogs.sort((a,b) => a.likes-b.likes)
  return sorted[sorted.length -1]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  
  var sorted = blogs.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.author]) {
      acc[value.author] = [];
    }
    // Grouping
    acc[value.author].push(value);
   
    //console.log(acc)
    return acc;
  }, {})

  var sorted2 = Object.fromEntries(
    Object.entries(sorted).sort(([,a],[,b]) => a.length-b.length))
  
  //console.log(Object.keys(sorted2)[Object.keys(sorted2).length -1])
  //console.log(Object.entries(sorted2)[Object.entries(sorted2).length -1][1].length)

  return {
    author: Object.keys(sorted2)[Object.keys(sorted2).length -1],
    blogs: Object.entries(sorted2)[Object.entries(sorted2).length -1][1].length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  
  var sorted = blogs.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.author]) {
      acc[value.author] = [];
    }
    // Grouping
    acc[value.author].push(value);
   
    //console.log(acc)
    return acc;
  }, {})

  var sorted2 = Object.fromEntries(
    Object.entries(sorted).sort(([,a],[,b]) => totalLikes(a)-totalLikes(b)))
  
  //console.log(Object.keys(sorted2)[Object.keys(sorted2).length -1])
  //console.log(totalLikes(Object.entries(sorted2)[Object.entries(sorted2).length -1][1]))

  return {
    author: Object.keys(sorted2)[Object.keys(sorted2).length -1],
    likes: totalLikes(Object.entries(sorted2)[Object.entries(sorted2).length -1][1])
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}