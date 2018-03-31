import React, { Component } from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';
import './main/addForm/Add';
import Add from './main/addForm/Add';
import List from './main/list/List';

class App extends Component {
  constructor(props) {
      super(props);
      //this.props.todos = [];
      this.AddToDoItem = this.AddToDoItem.bind(this);
      this.RemoveToDoItem = this.RemoveToDoItem.bind(this);
      this.state = { 
        todos :  []
      };
  }
  AddToDoItem(item){
    
    this.state.todos.push(item);
    this.setState({todos: this.state.todos});
    alert(this.state.todos);
  }
  RemoveToDoItem(item){
    this.state.todos.pop(item);
    this.setState({todos: this.state.todos});
    alert(item);
  }
  render() {
    return (
      <Grid className="App">
      <Row className="show-grid">
        <Col sm={3} md={12}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col sm={3} md={12}>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col sm={3} md={12}>
          <Add callbackAdd={this.AddToDoItem}/>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col sm={3} md={12}>
          <List todos={this.state.todos} callbackRemove={this.RemoveToDoItem}/>
        </Col>
      </Row>
    <Row className="show-grid">
      <Clearfix visibleSmBlock>
        <code>&lt;{'Clearfix visibleSmBlock'} /">&gt;</code>
      </Clearfix>
    </Row>
    </Grid>
     /* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Add callbackAdd={this.AddToDoItem}/>
        <List todos={this.state.todos} callbackRemove={this.RemoveToDoItem}/>
      </div>*/
    );
  }
}

export default App; 
