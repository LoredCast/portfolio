import React from 'react';
import './App.css';
import ContactRender from './contactRender'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true
        }
    }

    

    render() {
        

            //return (<div className="loaderbody"><Loader/></div>)
        
           return (
          <div className="body">
            <Landing />
            <Projects />
            <div className="slope1"></div>
            <About />
            <div className="slope2"></div>
            <Contact />
            
          </div>
            ); 
        }

        
    
}


class Nav extends React.Component {

    render() {
        
        return(<div>
            <ul>

                <li> 
                    <a href="#projects">
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

    scrollHandler = e => {
        let element = e.target
        let scroll = window.pageYOffset
        element.style.background = 'red'
        console.log(scroll)
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
                <div id="title"><h1>PROJECTS</h1></div>
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
                <h1>About me</h1>
                <p><h2>Hi,</h2>
                    I'm a 16 year old highschool student in germany with <br/>
                    a passion for Web-Apps, Machine Learning,<br/>
                    and everything about and around programming and design.
                </p>
            </div>

        );
    }
}



class Contact extends React.Component {
    render() {
        return (
            <div className="contact" id="contact">
                <div><h1>Contact</h1></div>
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
        </div></a>)
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
