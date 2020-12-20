import React from 'react';

class Login extends React.Component {
    render() {
        return(<LoginForm/>)
    }
}

class LoginForm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {email: '', password: '', remember: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


    componentDidMount(){
        
    }
    handleChange(event) {    
        this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: { 
            "Content-type": "application/json; charset=UTF-8"
            } 
        }).catch((error) => {
        console.error('Error:', error);
        });
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email
          <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />        
        </label>
        <label>
          Password
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />        
        </label>
        <input action="" type="submit" value="Submit" />
      </form>
    );
  }

}


export default Login