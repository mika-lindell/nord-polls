import React, {Component} from 'react'
import css from './Loader.css'

class Loader extends Component{
  render(){
    return(
      <div>
        <img 
          className={css.loaderSpinner}
          src="../../assets/hourglass.gif" 
          alt="Loading page..." 
        />
      </div>
    )
  }
}

export default Loader
