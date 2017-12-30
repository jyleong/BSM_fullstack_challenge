import React, { Component } from 'react';
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
            isLoading: false,
            currentCell: null,
            hasSelectedCell: false
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
    getSelectedCellToRequest(row, column, data) {
        this.setState({
        currentCell: {
            row: row,
            col: column,
            value: data
        },
        hasSelectedCell: true

        }, function() {
            console.log("Inside App.jsx");
            console.log(this.state)
        });
    }
    convertArrtoBoard(array) {
        var oneDBoard = array
        // format board to double array here
        var twoDBoard = [];
        while(oneDBoard.length) twoDBoard.push(oneDBoard.splice(0,9));
        return twoDBoard;
    }
    getPuzzle() {
        this.setState({isLoading: true});
        var url = `${process.env.REACT_APP_USERS_SERVICE_URL}/sudoku/board`;
        if (this.state.hasSelectedCell) {
            // expect a new board with one same cell
            var data = this.state.currentCell;
            axios.post(url, data)
            .then((res) => {
                var twoDBoard = this.convertArrtoBoard(res.data);
                this.setState({
                    board: twoDBoard,
                    isLoading: false,
                    hasSelectedCell: false
                });

            })
            .catch((err) => { 
                console.log(err); 
                this.setState({
                    isLoading: false,
                    hasSelectedCell: false
                });
            })
        }
        else {
            axios.get(url)
                .then((res) => {
                    var twoDBoard = this.convertArrtoBoard(res.data);
                    this.setState({
                        board: twoDBoard, 
                        isLoading: false,
                        hasSelectedCell: false
                    });

                })
                .catch((err) => { 
                    console.log(err); 
                    this.setState({
                        isLoading: false,
                        hasSelectedCell: false
                    });
                })
        }
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
                <div className="row text-center">
                    <div className="col-lg-12">
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
                                      getSelectedCellToRequest={this.getSelectedCellToRequest.bind(this)} 
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