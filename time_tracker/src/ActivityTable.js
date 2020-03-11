import React, {Component} from 'react';


class ActivityTable extends Component {
    
    
            state={

                userDetails:this.props.userDetails       

            }
   

render()
{
    

    return (
        <div>
            <ol>
                 <li>{this.props.userDetails.activities}</li>
            </ol>
            
      
        </div>
    );
}
}

export default ActivityTable;