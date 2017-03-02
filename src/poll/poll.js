import React, {Component} from 'react'
import {times} from 'lodash'
import {get, post} from '../helpers.js'
//import css from './Hello.css'

class Poll extends Component{

  state = this.defaultState()

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
          <input id="title" type="text" required value={this.state.title} onChange={(e)=> this.handleChange(e)} />
          <h2>Choices</h2>
          {this.renderChoiceInputs()}
          <input type="submit" value="Create Poll" />
        </form>
      </div>
    )
  }
  handleChange(e){
    let newState = {}
    if(e.target.id.indexOf('choice') === 0){
      newState.choices = this.state.choices.slice()
      const index = e.target.id.slice(-1)
      newState.choices[index] = e.target.value
      this.setState(newState)
      return
    }
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault()
    const payload = {
      title: this.state.title,
      choices: this.state.choices.filter((val)=>val ? true : false), 
    }
    post('http://localhost:1337/poll/', payload)
      .then((response)=> {
        this.setState(this.defaultState())
        console.log(response)
      })
  }
  renderChoiceInputs(){
    if(!this.state) {
      return result
    }
    let result = times(this.state.choices.length, (n)=> {
      return (  
        <input 
          type="text" 
          key={n} 
          id={`choice-${n}`} 
          value={this.state.choices[n]} 
          onChange={(e)=> this.handleChange(e)} 
        />
      )
    })
    return result
  }
  defaultState() {
    const defaultState = {
      title: '',
      choices: ['', '', ''],
    }
    return defaultState
  }
}

export default Poll

