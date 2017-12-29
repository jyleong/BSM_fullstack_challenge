import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import About from './components/About';
import Nav from './components/Nav';
import Board from './components/Board';
import Message from './components/Message';
import Button from './components/Button';
import { BeatLoader } from 'react-spinners';
import {Route, Switch} from 'react-router-dom';


class App extends Component {
  constructor() {
    super()
    this.state = {
      board: [],
      title: "FullStack Sudoku Challenge",
      messageType: null,
      messageName: null,
      isLoading: false
    }
  }
  componentDidMount() {
    this.getPuzzle();
  }
  createMessage(name='Sanity Check', type='success') {
    this.setState({
      messageName: name,
      messageType: type
    })
    setTimeout(() => {
      this.removeMessage()
    }, 3000);
  }
  removeMessage() {
    this.setState({
      messageName: null,
      messageType: null
    })
  }
  getPuzzle() {
    this.setState({isLoading: true});

    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/sudoku/board`)
    .then((res) => {
      var oneDBoard = res.data
      // format board to double array here
      var twoDBoard = [];
      while(oneDBoard.length) twoDBoard.push(oneDBoard.splice(0,9));
      console.log(twoDBoard);
      this.setState({
        board: twoDBoard,
        isLoading: false
      });

      // will pass in the state here from request, to UsersList component
    })
    .catch((err) => { 
      console.log(err); 
      this.setState({isLoading: false});
    })


  }
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  render() {
    return (
      <div>
        <Nav title={this.state.title}/>
        <div className="container">
        {this.state.messageName && this.state.messageType &&
          <Message
            messageName={this.state.messageName}
            messageType={this.state.messageType}
            removeMessage={this.removeMessage.bind(this)}
          />
        }
          <div className="row">
            <div className="col-md-6">
              <br/>
              <Switch>
                <Route exact path='/' render={() => (
                  <div>
                  <BeatLoader
                    color={'#123abc'} 
                    loading={this.state.isLoading} 
                  /> 
                  {!this.state.isLoading &&
                    <Board
                      board={this.state.board}
                    />
                  }
                    <Button onClick={this.getPuzzle.bind(this)}/>
                    
                  </div>
                )} />
                <Route exact path='/about' component={About}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;