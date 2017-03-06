import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import {times} from 'lodash'
import {post} from '../helpers.js'

const STATUS_IDLE = ''
const STATUS_CREATING = 'Creating...' 
const STATUS_SUCCESS = 'Your poll was created successfully'
const STATUS_FAIL = 'We failed to create your poll :(' 

class CreatePoll extends Component{

  state = {
    title: '',
    choices: ['', '', '', ''],
    createdPoll: null,
    status: STATUS_IDLE,
  }
  componentWillMount() {
    document.title = 'Create Poll'
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
            onChange={(e)=> this.handleChange(e, e.target.id)}
            ref={(input)=> this.refTitle = input}
          />
          <label>Choices</label>
          {this.renderChoiceInputs()}
          <input 
            type="submit" 
            value="Create Poll" 
            disabled={this.disableSubmit()} />
            <p>
              {this.state.status}
              <br />
              {this.state.status === STATUS_SUCCESS && 
                <Link to={`/poll/${this.state.createdPoll.id}/vote`}>View Poll</Link>
              }
            </p>
        </form>
      </div>
    )
  }
  handleChange(e, id){
    if(id === 'title'){
      this.setState({
        status: '',
        createdPoll: null,
        title: e.target.value,
      })
      return
    }
    if(id.indexOf('choice') === 0){
      const index = id.slice(-1)
      const choices = this.state.choices.slice()
      choices[index] = e.target.value
      this.setState({
        status: '',
        choices: choices,
      })
      return
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    this.setState({status: STATUS_CREATING})
    const payload = {
      title: this.state.title,
      choices: this.state.choices.filter((val)=>val ? true : false), 
    }
    post('poll', payload)
      .then((response)=> {
        browserHistory.push(`/poll/${response.data.id}/vote`)  
      }, ()=> {
        this.setState({status: STATUS_FAIL})
      })
  }
  disableSubmit(){
    return this.state.status !== STATUS_CREATING ? false : true
  }
  renderChoiceInputs(){
    if(!this.state) {
      return 
    }
    let result = times(this.state.choices.length, (n)=> {
      const id = `choice-${n}`
      return (  
        <input 
          type="text" 
          key={n} 
          id={id} 
          value={this.state.choices[n]} 
          onChange={(e)=> this.handleChange(e, id)} 
        />
      )
    })
    return result
  }
}

export default CreatePoll

