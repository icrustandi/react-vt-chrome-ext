import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Input, Dropdown, Message } from 'semantic-ui-react';

class AddAssertionsForAction extends Component {
  constructor(props) {
    super(props);
    this.error = '';
  }

  handleSubmit(event) {
      event.preventDefault();
      // this.props.saveActionProperty('assertID', this.props.stateIsNowProp.assertID);
      // this.props.setActionLocation(this.props.compAddress);
      // this.props.saveActionProperty('compName', this.props.compName);
      console.log('IN HANDLE SUBMIT', this.props.stateIsNowProp.action)
      if (this.props.compName) {
        let newAction = this.props.stateIsNowProp.action;
        newAction.loc = this.props.compAddress;
        newAction.compName = this.props.compName;
        newAction.assertID = this.props.stateIsNowProp.assertID;
        this.props.incrementAssertId();
        this.props.saveAssertion(newAction);
        this.props.clearAction();
        this.props.renderEditMode();
      } else {
        this.error=(<Message negative>
          <Message.Header>Component Required</Message.Header>
          <p>Please click on a node.</p>
</Message>);
        this.forceUpdate();
      }
    };

    handleEventDropdown(event, value) {
      this.props.saveActionProperty('event', value);
      console.log('handled event dropdown', value)
    }

    handleBack() {
      this.props.renderEditMode();
    }

  render () {
    const eventOptions = [
      { key: 1, text: 'Click', value: 'click' },
      { key: 2, text: 'Double Click', value: 'dblclick' },
      { key: 3, text: 'Right Click', value: 'contextmenu' },
      { key: 4, text: 'Enter', value: 'onEnter' }      
    ];
    if (this.props.compName) this.error = '';
    return (
      <form onSubmit={(event)=>{
        this.handleSubmit(event);
        }}>

        <h3 className="subheader">Action</h3>

        <div className="form-group">
          <label>Component <span style={ {color: "#ffaaaa"} }>*</span></label>
          <Input transparent placeholder="Click on Node" className="form-control" required ref="componentName" value={this.props.compName} disabled/>
        </div>

        <div className="form-group">
          <label>Type of Event <span style={ {color: "#ffaaaa"} }>*</span></label>
          <Dropdown search searchInput={{ type: 'text' }} 
          selection options={eventOptions} defaultValue={eventOptions[0].value} onChange={(e, { value })=>this.handleEventDropdown(e, value)} />
        </div>
        
        <Button inverted color="blue" size="tiny" type="button" onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>
        <Button primary size="small" type="submit" className="btn btn-primary">Save</Button>
        {this.error}
      </form>
    );
  }
};

export default AddAssertionsForAction;