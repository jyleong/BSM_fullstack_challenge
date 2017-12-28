import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {
        username: '',
        email: ''
      },
      valid: false
    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
  }
  componentDidMount() {
    this.clearForm();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType) {
      this.clearForm();
    }
  }
  clearForm() {
    this.setState({
      formData: {username: '', email: ''}
    });
  }
  validateForm() {
    this.setState({valid: true});
  }
  handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
    this.validateForm();
  }
  handleUserFormSubmit(event) {
    event.preventDefault();
    const formType = this.props.formType;
    let data;
    if (formType === 'map') {
      data = {
        username: this.state.formData.username,
        email: this.state.formData.email
      }
    }
    // url to be determined how to interact with it and serve something to present
    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/${formType}`
    axios.post(url, data)
    .then((res) => {
      this.clearForm();
    })
    .catch((err) => { 
      console.log(err)
      console.log(formType);
      if (formType === 'map') {
        console.log('got here');
        this.props.createMessage('Request to map error', 'danger');
      }
    })
  }
  render() {
    return (
      <div>
        <h1>{this.props.formType}</h1>
        <hr/><br/>
        <form onSubmit={(event) => this.handleUserFormSubmit(event)}>
          {this.props.formType === 'map' &&
            <div className="form-group">
              <input
                name="username"
                className="form-control input-lg"
                type="text"
                placeholder="Enter a username"
                required
                value={this.state.formData.username}
                onChange={this.handleFormChange.bind(this)}
              />
            </div>
          }
          <div className="form-group">
            <input
              name="email"
              className="form-control input-lg"
              type="email"
              placeholder="Enter an email address"
              required
              value={this.state.formData.email}
              onChange={this.handleFormChange.bind(this)}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            value="Submit"
            disabled={!this.state.valid}
          />
        </form>
      </div>
    )
  }
}

export default Form