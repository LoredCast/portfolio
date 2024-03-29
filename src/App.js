import React from 'react';
import './App.css';
import ContactRender from './contactRender';
import NotFound from './NotFound'
import Login from './Login'
import Spring from './Spring/Spring'
import { FormattedMessage } from 'react-intl';

import { 
    BrowserRouter as Router, 
    Route,  
    Switch 
} from 'react-router-dom'; 


import { IntlProvider } from 'react-intl';
import en from './Content/Translations/en.json'
import de from './Content/Translations/de.json'
import projects from './Content/Translations/projects.json'


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
                        <Route path='/spring' component={Spring}></Route>
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
                    <Projects lan={this.state.lan}/>   
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
            projects: projects[props.lan]

        }; 
    }


    componentDidMount(){
        console.log(this.state.projects)
        //console.log(this.state.projects)
        // etch("/api/getProjects")
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({data});
        //        this.setState({ loading: false });
        //        });
    }

    render() {
            return(
            <div className="projects" id="projects">
                <div id="title"><h1><FormattedMessage id="app.projects.heading"/></h1></div>
                <div id="panels">
                        <ProjectList items={projects[this.props.lan].slice(0,3)}></ProjectList>
                </div>
                <div id="panels">
                        <ProjectList items={projects[this.props.lan].slice(3,6)}></ProjectList>
                </div>
            </div>
            )
        
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


class ProjectList extends React.Component {

    // TODO
    // Create Buttons to switch between images in image list of json object


    
    render() {
        return (
            <React.Fragment key="0">
                {this.props.items.map(item =>
                    <React.Fragment key={item.id}>
                        <Project link={item.link} content={item.content} title={item.title} images={item.images}></Project>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

class Project extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            imageIndex : 0,
        }; 
    }

    componentDidUpdate() {
    }

    cycle(e) {
        let indexIncr = (this.state.imageIndex + 1) % this.props.images.length
        this.setState({imageIndex: indexIncr})
    }

    render() {
        return(
        <div className="Project">
            <div className='relativeContainer'>
                
                {(this.props.images.length > 1) && 
                <div className="pic" onClick={() => this.cycle()}>
                <div className="arrow"></div></div>
                // only render when there are more than 1 image
                } 

                <a href={this.props.link}>
                    <img src={this.props.images[this.state.imageIndex]} alt="Project"></img>
                </a>
            </div>
            <h2>{this.props.title}</h2>
            <p>{this.props.content}</p>
        </div>
    )}
}

class Loader extends React.Component {
    render() {
        return (<div className="lds-dual-ring"></div>)
    }
}


export default App;
