import React, {Component} from 'react'
import {get, post} from '../helpers.js'

class Poll extends Component{
  componentWillMount(){
    const payload = {
      title: 'Your favorite programming language',
      choices: [
        'Java',
        'PHP',
        'Ruby',
        'JavaScript',
        'Python',
      ], 
    }
    get('http://localhost:1337/poll/')
      .then((response)=> console.log(response))
    post('http://localhost:1337/poll/', payload)
      .then((response)=> console.log(response))
  }
  render(){
    return(
      <div>'Hello World!'</div>
    )
  }
}

export default Poll

