import React from 'react'

class Styling extends React.Component{
render(){
    const inputstyle={
        display:'inline-block',
        textalign:"center",
        padding:"16px",
        margin:"16px",
        border:"1px solid black",
        color:"red",
        background:"black"
    }
   
    return(

        <div>

            <h2 style={inputstyle}>Heading With Style</h2>
            
        </div>


    )
}
}

export default Styling