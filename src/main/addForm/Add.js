import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class Add extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            todoValue : "new todo item"
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
    }
    changeHandler(e){ 
        this.setState({todoValue: e.target.value});
    }
    showMessage(e){        
        this.props.callbackAdd(this.state.todoValue);
        this.setState({todoValue: ""});
    }
    getValidationState() {
        const length = this.state.todoValue.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
      }
    render() {
        return (
        <div className="App-AddForm">
        <header className="App-header">
        <h1 className="App-title">New todo message: <p>{this.state.todoValue}</p></h1>
        </header>
        <Form horizontal>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}>
          <ControlLabel>todo:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.todoValue}
            placeholder="new todo item name"
            onChange={this.changeHandler}/>
          <FormControl.Feedback />
        </FormGroup>
        <Button type="button" onClick={this.showMessage}>Zapisz</Button>
      </Form>
      </div>
        /*<div className="App-AddForm">
            <header className="App-header">
            <h1 className="App-title">New todo message: <p>{this.state.todoValue}</p></h1>
            </header>
            <input type="text" value={this.state.todoValue} onChange={this.changeHandler} placeholder="new todo item name"/>
            
            <button type="submit" onClick={this.showMessage}>Zapisz</button>
        </div>*/
        );
    }
}

export default Add;