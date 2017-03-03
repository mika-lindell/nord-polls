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
      this.setState({
        poll: Object.assign({}, response.data),
        totalVotes: this.getVotesTotal(response.data.votes),
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
                {choice.label}: {Math.round(this.getVotes(choice) / this.state.totalVotes * 100)}%
                </dd>
              )
            })
          }
        </dl>
        <p>
        Total votes: {this.state.totalVotes}
        </p>
        <Link to={`/poll/${this.state.poll.id}/vote`}>Cast a new vote</Link>
      </div>
    )
  }
  getVotes(choice) {
    const record = find(this.state.poll.votes, {choice_id: choice.id})
    if(!record) return 0
    return record.votes
  }
  getVotesTotal(votes) {
    const total = votes.map((record)=> {
      return record.votes
    })
    return total.reduce((a, b)=>a+b)
  }
}

ShowPoll.propTypes = {
  params: React.PropTypes.object,
}

export default ShowPoll
