import React, {Component} from 'react'
import {times} from 'lodash'
import {get, post} from '../helpers.js'

const STATUS_IDLE = ''
const STATUS_CREATING = 'Creating...' 
const STATUS_SUCCESS = 'Your poll was created successfully'
const STATUS_FAIL = 'We failed to create your poll :(' 

class Poll extends Component{

  state = this.defaultState()

  defaultState(override={}) {
    const defaultState = {
      title: '',
      choices: ['', '', '', ''],
      status: STATUS_IDLE,
    }
    return Object.assign({}, defaultState, override)
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
          <input 
            autoFocus
            required 
            id="title" 
            type="text"
            value={this.state.title} 
            onChange={(e)=> this.handleChange(e)}
            ref={(input)=> this.refTitle = input}
          />
          <label>Choices</label>
          {this.renderChoiceInputs()}
          <input 
            type="submit" 
            value="Create Poll" 
            disabled={this.disableSubmit()} />
            <span>{this.state.status}</span>
        </form>
      </div>
    )
  }
  handleChange(e){
    let newState = {
      status: '',
    }
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
    this.setState({status: STATUS_CREATING})
    const payload = {
      title: this.state.title,
      choices: this.state.choices.filter((val)=>val ? true : false), 
    }
    post('http://localhost:1337/poll/', payload)
      .then((response)=> {
        this.setState(this.defaultState({status: STATUS_SUCCESS}))
        this.refTitle.focus()
        console.log(response)
      }, ()=> {
        this.setState({status: STATUS_FAIL})
      })
  }
  disableSubmit(){
    return this.state.status !== STATUS_CREATING ? false : true
  }
  renderChoiceInputs(){
    if(!this.state) {
      return result
    }
    let result = times(this.state.choices.length, (n)=> {
      const id = `choice-${n}`
      return (  
        <input 
          type="text" 
          key={n} 
          id={id} 
          value={this.state.choices[n]} 
          onChange={(e)=> this.handleChange(e)} 
        />
      )
    })
    return result
  }
}

export default Poll

