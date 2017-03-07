import React, {Component} from 'react'
import {Link} from 'react-router'
import {find} from 'lodash'
import {get} from '../helpers.js'
import Loader from './Loader'
import ErrorNoResponse from './ErrorNoResponse'

import css from './ShowPoll.css'

class ShowPoll extends Component{
  state = {
    poll: {},
    totalVotes: 0,
    isLoading: false,
    isError: false,
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
    }, ()=> {
      this.setState({
        isLoading: false,
        isError: true,
      })
    })

  }
  render() {
    if(this.state.isLoading){
      return <Loader />
    }
    if(this.state.isError){
      return <ErrorNoResponse />
    }
    return(
      <main>
        <dl className={css.chart}>
          <dt className={css.chartTitle}>{this.state.poll.title}</dt>
          {
            this.state.poll.choices.map((choice, i)=> {
              const votes = this.getVotes(choice)
              const percentage = Math.round(votes / this.state.totalVotes * 100) || 0
              return (
                <dd key={i} className={css.chartCell}>
                  <div className={css.chartLabel}>
                    {choice.label}: {percentage}%
                  </div>
                  <div className={css.chartBar}>
                    <span 
                      className={css.chartBarColor}
                      style={{width: `${percentage}%`}}
                    >
                    </span>
                    <span className={css.chartBarSegments}>
                    </span>
                  </div>
                </dd>
              )
            })
          }
        </dl>
        <p className={css.totalVotes}>
        Total votes: {this.state.totalVotes}
        </p>
        <Link to={`/poll/${this.state.poll.id}/vote`}>Cast a new vote</Link>
      </main>
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
    if(total.length === 0) return 0
    return total.reduce((a, b)=>a+b)
  }
}

ShowPoll.propTypes = {
  params: React.PropTypes.object,
}

export default ShowPoll
