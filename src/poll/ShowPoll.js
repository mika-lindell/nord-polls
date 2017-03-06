import React, {Component} from 'react'
import {Link} from 'react-router'
import {find} from 'lodash'
import {get} from '../helpers.js'
import Loader from './Loader'

import css from './ShowPoll.css'

class ShowPoll extends Component{
  state = {
    poll: {},
    totalVotes: 0,
    isLoading: false,
  }
  componentWillMount() {
    this.setState({isLoading: true})
    get(`poll/${this.props.params.id}/results`).then((response)=> {
      document.title = `${response.data.title} – Results`
      this.setState({
        poll: Object.assign({}, response.data),
        totalVotes: this.getVotesTotal(response.data.votes),
        isLoading: false,
      })
    })

  }
  render() {
    if(this.state.isLoading){
      return <Loader />
    }
    return(
      <div>
        <dl className={css.chart}>
          <dt className={css.chartTitle}>{this.state.poll.title}</dt>
          {
            this.state.poll.choices.map((choice, i)=> {
              const votes = this.getVotes(choice)
              const percentage = Math.round(votes / this.state.totalVotes * 100)
              return (
                <dd key={i}>
                  <span className={css.chartLabel}>
                    {choice.label}: {percentage}%
                  </span>
                  <span className={css.chartBar}>
                    <span 
                      className={css.chartBarColor}
                      style={{width: `${percentage}%`}}
                    >
                    </span>
                    <span className={css.chartBarSegments}>
                    </span>
                  </span>
                </dd>
              )
            })
          }
        </dl>
        <p className={css.totalVotes}>
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
