import React, {Component} from 'react'

class errorNoResponse extends Component{
  render(){
    return(
      <main>
        <h1>Can't find this page for you :( </h1>
        <ul>
          <li>Try refreshing</li>
          <li>Check your website address</li> 
          <li>If this doesn't work, it might be the poll is missing or doesn't exist</li>
        </ul>
      </main>
    )}
}
export default errorNoResponse
