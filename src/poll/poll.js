import React, {Component} from 'react'
import {get} from '../helpers.js'

class Poll extends Component{

  state = {
    poll: {},
  }

  componentWillMount() {
    get(`poll/${this.props.params.id}`).then((response)=> {
      this.setState({
        poll: Object.assign({}, response.data),
      })
    })
  }
  render() {
    if(!this.state.poll.choices) return null
    return(
      <div>
        <form>
          <h1>{this.state.poll.title}</h1>
          {this.state.poll.choices.map((choice, i)=> {
            return (
              <p key={i}>
                <input 
                  name="choice"
                  type="radio" 
                  id={choice.id} 
                  value={choice.id} 
                /> 
                <label htmlFor={choice.id}>{choice.label}</label>
              </p>
            )
          })}
          <input type="submit" value="Vote" />
        </form>
      </div>
    )
  }
}

Poll.propTypes = {
  params: React.PropTypes.object,
}

export default Poll
