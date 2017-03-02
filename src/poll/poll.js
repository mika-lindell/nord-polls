import React, {Component} from 'react'
import {times} from 'lodash'
import {get, post} from '../helpers.js'

class Poll extends Component{
  constructor(){
    super()
    this.state = {
      title: '',
      choices: new Array(6).fill(''),
    }
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
          {this.renderChoiceInputs()}
          <input type="submit" />
        </form>
      </div>
    )
  }
  handleChange(e){
    let newState = {}
    if(e.target.id.indexOf('choice') === 0){
      const index = e.target.id.slice(-1)
      newState.choices[index] = e.target.value
      return
    }
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault()
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
  renderChoiceInputs(){
    if(!this.state) {
      return result
    }
    let result = times(this.state.choices.length, (n)=> {
      return <input type="text" key={n} id={`choice-${n}`} value={this.state.choices[n]} onChange={(e)=> this.handleChange(e)} />
    })
    return result
  }
}

export default Poll

