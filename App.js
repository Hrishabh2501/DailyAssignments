
import React from 'react';
import Valid from './Component/InputItems' 
import Styling from './Component/Styling'

class App extends React.Component
{
  constructor(props)
  {
  super(props);
        this.state={
            text:'',
            len:0,
            valid:''
        }  
        this.handleNameOnChange=this.handleNameOnChange.bind(this)
      }


    handleNameOnChange(e)
    {
      this.setState({text:e.target.value})
      var a=this.state.text.length
      console.log(a)
      this.setState({len:Number(a)+1})
      if(this.state.len<5)
      {
        this.setState({valid:"too Short"})
      }
      else{
        this.setState({valid:"too enough"})
      }
      
    }

    click()
    {
      
    }
    


    render()
    {
        return(
            <div id="toStyle">
            <input type="text"  onChange={(e) => this.handleNameOnChange(e)}></input>
            <button onClick={this.click}>Click</button>
            <p>{this.state.len}</p>
            <Valid  length={this.state.valid}/>
            <Styling/>
            </div>
        )
    }
}

export default App

