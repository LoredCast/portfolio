import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    render() {
        return (<div className="body">
                
                <Landing />
                <Projects/>
                <div className="slope1"></div>
                <About/>
                <div className="slope2"></div>
                <Contact/>
                
                </div>
        );
    }
}


class Nav extends React.Component {
    activateTopper(e) {
        e.target.style.width = "100%";
    }


    render() {
        
        return(<div>
            <ul>

                <li> 
                    <a href="#projects" onMouseHover={this.activateTopper}>
                    <div className="topper"></div>
                    Projects
                    </a>
                </li>
                <li>
                    <a href="#about"><div className="topper"></div>
                    About
                    </a>
                </li>
                <li>
                    <a href="#contact"><div className="topper"></div>
                    Contact
                    </a>
                </li>
            </ul>
        </div>);
    }
}


class Landing extends React.Component {
    render() {
        return(
            
            <div className="landing">
                
                <div className="main">
                    
                    <h1>Manuel Unterriker</h1>
                    <div id="devider"></div>
                    <Nav/>
                </div>
                
            </div>
        );
    }
}

class Projects extends React.Component {
    render() {
        return(
            <div className="projects" id="projects">
                <div id="title"><h1>PROJECTS</h1></div>
                <div id="panels">
                    <Project/>
                </div>
            </div>
            
        );
    }
}

class About extends React.Component {
    render() {
        return (
            <div className="about" id="about">
                <h1></h1>

                
            </div>

        );
    }
}


class Contact extends React.Component {
    render() {
        return (
            <div className="contact" id="contact">
                <h1>Contact</h1>
            </div>

        );
    }
}


class Project extends React.Component {
    render() {
        return (
            <div className="Project">
            <img></img>
            <h2>Pong AI</h2>
            <p>A neuro-evolving neural-network learns to play pong</p>
            </div>
        );
    }
}
export default App;
