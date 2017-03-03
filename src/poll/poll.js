import React, {Component} from 'react'
import {get} from '../helpers.js'

class Poll extends Component{

  state = {
    poll: {},
  }

  componentWillMount() {
    get(`poll/${this.props.params.id}`).then((response)=> {
      this.setState({
        poll: Object.assign({}, response),
      })
    })
  }
  render() {
    return(
      <div>
        ViewPoll
      </div>
    )
  }
}

Poll.propTypes = {
  params: React.PropTypes.object,
}

export default Poll
