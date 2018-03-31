import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, Label, Button } from 'react-bootstrap'

class List extends Component {
    constructor(props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
    }
    removeItem(e){
        this.props.callbackRemove(e.target.value);
    }
    render() {
        return (
        <Panel className="App-List">
            <Panel.Body>
            <ListGroup>
                {this.props.todos.map((todo) => (
                    <ListGroupItem><Label>{todo}</Label> <Button value={todo} onClick={this.removeItem}>Usuń</Button></ListGroupItem>
                ))}
            </ListGroup>
            </Panel.Body>
        </Panel>
        );
    }
}

export default List;