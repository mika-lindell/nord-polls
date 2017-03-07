import React, {Component} from 'react'
import {pickBy} from 'lodash'

import css from './GenericInput.css'

class GenericInput extends Component{

  static defaultProps = {
    maxLength: 0,
  }

  state = {
    hasFocus: false,
  }

  render(){
    return(
      <span>
        <label htmlFor={this.props.id}>
        {this.props.label} 
        &nbsp;
        {this.state.hasFocus  && this.props.maxLength > 0 &&
          `(${this.props.maxLength - this.input.value.length})`
        }
        </label>
        <input 
          className={`${css.required} ${this.props.className}`}
          ref={(input) => this.input = input}
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
      if(key === 'handleChange' || key === 'label' || key === 'className') {
        return false
      }
      return true
    })
  }

}

GenericInput.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  className: React.PropTypes.string,
  maxLength: React.PropTypes.string,
  handleChange: React.PropTypes.func,
}

export default GenericInput
