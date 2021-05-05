import React from 'react'
import P5Wrapper from 'react-p5-wrapper'
import spring from './sketches/spring'
import './spring.css'

const Spring = () => {
    return(
        <body className="simulation">
            <h1>Feder Simulation</h1>
            <a href="https://gist.github.com/LoredCast/add976b73e5846a58280c91517dc4abb">View Source</a>
            <Simulator/>
        </body>
        
    )
}

const Simulator = () => {
    const [dims, setDims] = React.useState({
        height: window.innerHeight - 300,
        width: window.innerWidth - 200
    })

    const [options, setOptions] = React.useState({
        mass: 20,
        constant: 0.1,
        damp: 0.999,
        prop: true
    })

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    const handleResize = () => {
        setDims({
            height: window.innerHeight - 300,
            width: window.innerWidth - 100
        })
    }

    const handleOptions = (event) => {
        event.preventDefault()
    }

    const handleMassChange = (e) => {
        setOptions({
            mass: e.target.value,
            constant: options.constant,
            damp: options.damp,
            prop: options.prop
        })
    }

    const handleConstantChange = (e) => {
        setOptions({
            mass: options.mass,
            constant: e.target.value,
            damp: options.damp,
            prop: options.prop
        })
    }

    const handleDampChange = (e) => {
        setOptions({
            mass: options.mass,
            constant: options.constant,
            damp: e.target.value,
            prop: options.prop
        })
    }

    


    return(
        
        <div>
            <div className="options">
                <form onSubmit={handleOptions}>
                    <label>Masse</label> 
                    <input value={options.mass} onChange={handleMassChange} ></input>

                    <label>Federkonstante</label>
                    <input value={options.constant} onChange={handleConstantChange}></input>

                    <label>Dämpfungsfaktor</label>
                    <input value={options.damp} onChange={handleDampChange}></input>

                    
                </form>
            </div>
            <P5Wrapper sketch={spring} width={dims.width} height={dims.height} options={options}></P5Wrapper></div>
        
    )
}

export default Spring