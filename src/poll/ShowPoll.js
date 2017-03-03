import React, {Component} from 'react'
import {Link} from 'react-router'
import {find} from 'lodash'
import {get} from '../helpers.js'

class ShowPoll extends Component{
  state = {
    poll: {},
    totalVotes: 0,
  }
  componentWillMount() {
    get(`poll/${this.props.params.id}/results`).then((response)=> {
      console.log(response.data.votes)
      this.setState({
        poll: Object.assign({}, response.data),
      })
    })
  }
  render() {
    if(!this.state.poll.id) return null
    return(
      <div>
        <dl>
          <dt>{this.state.poll.title}</dt>
          {
            this.state.poll.choices.map((choice, i)=> {
              return (
                <dd key={i}>
                {choice.label}: {this.getVotes(choice)}
                </dd>
              )
            })
          }
        </dl>
        <Link to={`/poll/${this.state.poll.id}/vote`}>Cast a new vote</Link>
      </div>
    )
  }
  getVotes(choice) {
    const record = find(this.state.poll.votes, {choice_id: choice.id})
    if(!record) return 0
    return record.votes
  }
}

ShowPoll.propTypes = {
  params: React.PropTypes.object,
}

export default ShowPoll
