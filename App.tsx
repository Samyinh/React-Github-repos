import React from 'react';
import './App.css';
import GithubSearch from './components/GithubSearch';


interface Iprop{}
interface Istate
{
}

class App extends React.Component <Iprop,Istate>
{
    constructor(Props:Iprop){
        super(Props);
       
        
    }
   
    render()
    {
        return(
            <React.Fragment>
                
                <GithubSearch/>
                
             
           </React.Fragment>
        );
    }
}
export default App;