import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import {get, post} from '../helpers.js'
import Loader from './Loader'
import ErrorNoResponse from './ErrorNoResponse'

const STATUS_IDLE = ''
const STATUS_VOTING = 'Voting...'
const STATUS_SUCCESS = `We\'ve received your vote!`
const STATUS_FAIL = `We couldn\'t receive your vote for some reason :(`

class VotePoll extends Component{

  state = {
    poll: {},
    selected: null,
    status: STATUS_IDLE,
    isLoading: false,
    isError: false,
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    })
    get(`poll/${this.props.params.id}`).then((response)=> {
      document.title = `${response.data.title} – Vote`
      this.setState({
        poll: Object.assign({}, response.data),
        isLoading: false,
      })
    }, ()=> {
      this.setState({
        isLoading: false,
        isError: true,
      })
    })
  }
  render() {
    if(this.state.isLoading) {
      return <Loader />
    } 
    if(this.state.isError){
      return <ErrorNoResponse />
    }
    return(
      <main>
        <form onSubmit={(e)=> this.handleSubmit(e)}>
          <h1>{this.state.poll.title}</h1>
          {this.state.poll.choices.map((choice, i)=> {
            return (
              <p key={i}>
                <input 
                  name="choice"
                  type="radio" 
                  id={choice.id} 
                  value={choice.id}
                  onClick={(e)=> this.handleChange(e.target.checked, choice.id)} 
                /> 
                <label htmlFor={choice.id}>{choice.label}</label>
              </p>
            )
          })}
          <input 
            type="submit" 
            value="Vote" 
            disabled={this.disableVoting()}
          />
          <p>{this.state.status}</p>
          <Link to={`/poll/${this.state.poll.id}/results`}>View results</Link>
        </form>
      </main>
    )
  }
  handleSubmit(e){
    e.preventDefault()
    if(!this.state.selected) return
    this.setState({
      status: STATUS_VOTING,
    })
    const payload = {
      choice_id: this.state.selected,
    }
    post(`poll/${this.state.poll.id}/vote`, payload).then(()=> {
      this.setState({
        status: STATUS_SUCCESS,
      })
      browserHistory.push(`/poll/${this.state.poll.id}/results`)      
    }, ()=> {
      this.setState({
        status: STATUS_FAIL,
      })
    })
  }
  handleChange(selected, choiceId) {    
    if(selected) this.setState({
      status: STATUS_IDLE,
      selected: choiceId,
    })
  }
  disableVoting() {
    return this.state.status === STATUS_VOTING || this.state.selected === null 
  }
  getSelectedChoice(){
    const input = document.querySelector('input[name="choice"]:checked')
    if(!input) return null
    return input.value
  }
}

VotePoll.propTypes = {
  params: React.PropTypes.object,
}

export default VotePoll
