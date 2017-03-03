import React, {Component} from 'react'
import {get} from '../helpers.js'

class ShowPoll extends Component{
  state = {
    poll: {},
  }
  componentWillMount() {
    get(`poll/${this.props.params.id}/results`).then((response)=> {
      this.setState({
        poll: Object.assign({}, response.data),
      })
    })
  }
  render() {
    if(!this.state.poll.id) return null
    return(
      <div>
        <h1></h1>
      </div>
    )
  }
}

ShowPoll.propTypes = {
  params: React.PropTypes.object,
}

export default ShowPoll
