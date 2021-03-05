import React from 'react';
import './App.css';
import ContactRender from './contactRender';
import NotFound from './NotFound'
import Login from './Login'
import { FormattedMessage } from 'react-intl';

import { 
    BrowserRouter as Router, 
    Route,  
    Switch 
} from 'react-router-dom'; 


import { IntlProvider } from 'react-intl';
import en from './Content/Translations/en.json'
import de from './Content/Translations/de.json'



const messages = {
    "en" : en,
    "de" : de
}


class App extends React.Component {
    render() {
        return(
            <Router>
                <div className="App">
                    <Switch>
                    <Route exact path='/' component={Portfolio}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={NotFound}></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}


class Language extends React.Component {

    render() {
        return(
            <div className="language">
                <button value="en" onClick={this.props.handle}>English</button>
                <button value="de" onClick={this.props.handle}>Deutsch</button>
            </div>
        )
    }

}


class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            loading : true,
            lan : "de"

        }
    }
    handleChange(e) {
        this.setState({lan: e.target.value});
    }

    render() {
        
           return (
            <IntlProvider locale={this.state.lan} messages={messages[this.state.lan]}>
                <div className="body">
                    <Language lan={this.state.lan} handle={this.handleChange}/>
                    <Landing />
                    <div className="slope1"></div>
                    <About />
                    <div className="slope2"></div>
                    <Projects />                   
                    <Contact />
                </div>
             </IntlProvider>
            ); 
        }
}


class Nav extends React.Component {

    render() {
        
        return(
        <div>
            <ul>
                <li>
                    <a href="#about"><div className="topper"></div>
                        <FormattedMessage id="app.nav.about"/>
                    </a>
                </li>
                <li> 
                    <a href="#projects">
                    <div className="topper"></div>
                        <FormattedMessage id="app.nav.projects"/>
                    </a>
                </li>
                <li>
                    <a href="#contact"><div className="topper"></div>
                        <FormattedMessage id="app.nav.contact"/>
                    </a>
                </li>
            </ul>
        </div>
        );
    }
}


class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            opacity : 1,
            
        };
    }
    componentDidMount() {
        window.onscroll = (e) => {
            this.setState({
              opacity: (100 - 0.5 * window.scrollY) / 100
            });
        }
    }

    render() {
        return(
            <div className="landing">
                <div className="main" style={this.state}>
                    <h1>Manuel Unterriker</h1>
                    <div id="devider"></div>
                    <Nav/>
                </div>
                <ContactRender/>
            </div>
        );
    }
}

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            data : null,
        }; 
    }


    componentDidMount(){
        fetch("/api/getProjects")
            .then(response => response.json())
            .then(data => {
                this.setState({data});
                this.setState({ loading: false });
                });
    }

    render() {
        if (this.state.loading) {
            return(
            <div className="projects" id="projects">
                <div id="title"><h1>PROJECTS</h1></div>
                <div id="panels">
                    <Loader></Loader>
                </div>
            </div>
            )
        }
        else {
        return(
            <div className="projects" id="projects">
                <div id="title"><h1><FormattedMessage id="app.projects.heading"/></h1></div>
                <div id="panels">
                    <Project items={this.state.data}/>
                </div>
            </div>
        );}
    }
}

class About extends React.Component {
    render() {
        return (
            <div className="about" id="about">
                <h1><FormattedMessage id="app.about.heading"/></h1>
                <p><h2>Hi,</h2>  
                    <FormattedMessage id="app.about.content"/>
                </p>
            </div>
        );
    }
}



class Contact extends React.Component {
    render() {
        return (
            <div className="contact" id="contact">
                <div><h1><FormattedMessage id="app.contact.heading"/></h1></div>
                <div id="contact-panels">
                    <ContactPanel img="Github-min.png" content="Github" link="https://github.com/LoredCast/"/>
                    <ContactPanel img="Dribble-min.png" content="Dribble" link="https://dribbble.com/LoredCast" />
                    <ContactPanel img="Mail-min.png" content="manuel@unterriker.biz" link="mailto:manuel@unterriker.biz"/>
                </div>

                
            </div>

        );
    }
}



function ContactPanel(props) {
    return (
        <a href={props.link}>
            <div className="contact-panel">
            <img src={props.img} alt="Link"/>
            <p>{props.content}</p>
        </div></a>
    )
}


class Project extends React.Component {
    render() {
        return (
            <React.Fragment key="0">
                {this.props.items.projects.map(item =>
                    <React.Fragment key={item.id}>
                        <div className="Project">
                            <a href={item.link}><img src={item.Image} alt="Project"></img></a>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

class Loader extends React.Component {
    render() {
        return (<div className="lds-dual-ring"></div>)
    }
}


export default App;
