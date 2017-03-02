import React, {Component} from 'react'
import {get, post} from '../helpers.js'

class Poll extends Component{

  defaultState(){
    return {
      title: '',
    };
  }

  componentWillMount(){
    get('http://localhost:1337/poll/')
      .then((response)=> console.log(response))
  }
  render(){
    return(
      <div>
        <h1>Create new poll</h1>
        <form onSubmit={(e)=> this.handleSubmit(e)}>
          <label htmlFor="title">
            Title
          </label>
          <input id="title" type="text" onChange={(e)=> this.handleChange(e)} />
          <h2>Choices</h2>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="submit" />
        </form>
      </div>
    )
  }
  handleChange(e){
    let newState = {}
    newState[e.target.id] = e.target.value
    this.setState(newState)
    console.log(this.state)
  }

  handleSubmit(e) {

    e.preventDefault();

    const payload = {
      title: this.state.title,
      choices: [
        'Java',
        'PHP',
        'Ruby',
        'JavaScript',
        'Python',
      ], 
    }
    post('http://localhost:1337/poll/', payload)
      .then((response)=> console.log(response))
  }
}

export default Poll

