import React, {Component} from 'react'
import {pickBy} from 'lodash'

class GenericInput extends Component{

  state = {
    charsLeft: this.props.maxLength || 0,
    hasFocus: false,
  }

  render(){
    return(
      <span>
        <label htmlFor={this.props.id}>
        {this.props.label} 
        &nbsp;
        {this.state.hasFocus &&
          `(${this.state.charsLeft})`
        }
        </label>
        <input 
          onChange={(e)=>this.handleChange(e)}
          onFocus={()=>this.handleFocus()} 
          onBlur={()=>this.handleBlur()} 
          {...this.filterProps(this.props)} 
        />
        <span></span>
      </span>
    )
  }

  handleChange(e){
    const input = e.target
    this.setState({
      charsLeft: input.maxLength - input.value.length,
    })
    if(this.props.handleChange) {
      this.props.handleChange(e)
    }
  }

  handleFocus(){
    this.setState({
      hasFocus: true,
    })
  }

  handleBlur(){
    this.setState({
      hasFocus: false,
    })
  }

  filterProps(props){
    return pickBy(props, (value, key)=>{
      if(key === 'handleChange' || key === 'label') {
        return false
      }
      return true
    })
  }

}

GenericInput.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  maxLength: React.PropTypes.string,
  handleChange: React.PropTypes.func,
}

export default GenericInput
