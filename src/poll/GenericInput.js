import React, {Component} from 'react'

GenericInput.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  handleChange: React.PropTypes.func,
}

class GenericInput extends Component{

  render(){
    return(
      <span>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input onChange={(e)=>this.handleChange(e)} {...this.props} />
        <span></span>
      </span>
    )
  }

  handleChange(e){
    if(this.props.handleChange) this.props.handleChange(e)
  }

}

export default GenericInput
