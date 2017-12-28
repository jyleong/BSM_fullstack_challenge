import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import About from './components/About';
import Nav from './components/Nav';
import Form from './components/Form';
import Message from './components/Message';
import {Route, Switch} from 'react-router-dom';


class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      username: "",
      email: "",
      title: "FullStack - Challenge",
      isAuthenticated: false,
      messageType: null,
      messageName: null
    }
  }
  componentDidMount() {
    this.getUsers();
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
  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => {
      console.log(res.data)
      this.setState({"users": res.data});
      // will pass in the state here from request, to UsersList component
    })
    .catch((err) => { console.log(err); })
  }
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    }
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
      .then((res) => {
        this.getUsers();
        this.setState({ username: '', email: '' });
      })
      .catch((err) => { console.log(err); })
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
                  <UsersList
                    users={this.state.users}
                  />
                )} />
                <Route exact path='/about' component={About}/>
                <Route exact path='/maps' render={() => (
                  <Form
                    formType={'map'}
                    formData={this.state.formData}
                    createMessage={this.createMessage.bind(this)}
                  />
                )} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;