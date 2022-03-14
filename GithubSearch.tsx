import axios, { AxiosResponse } from 'axios';
import React from 'react';
import {GithubCreds} from './Git/GithubCreds'
import { IProfile } from './IProfile';
import { IRepos } from './IRepos';


interface Iprop{}
interface Istate
{
    githubUsername:string;
    githubUserrepos:any;
    profile:IProfile;
    Repos:IRepos;
}

class GithubSearch extends React.Component <Iprop,Istate>
{
    constructor(Props:Iprop){
        super(Props);
       this.state={
           ...this.state,
           githubUsername:'',
           githubUserrepos:'',
           profile:{} as IProfile,
           Repos:{} as IRepos
       }
        
    }
    //update input
    updateUsername=(event:React.ChangeEvent<HTMLInputElement>)=>
    {
        this.setState(
            {
                githubUsername:event.target.value
            }
        )
    }
    searchProfile=(githubUsername:string)=>
    {
        let dataURL:string=`https://api.github.com/users/${githubUsername}?Client_Id=${GithubCreds.ClientId}&Client_Secret=${GithubCreds.ClientSecret}`;

        axios.get(dataURL).then((response:AxiosResponse)=>
        {
            console.log(response.data)
            this.setState(
                {
                    profile:response.data
                }
            )
        }).catch((error)=>
        {
            console.log(error)
        })
    }

    searchProfileRepos=(githubUsername:string)=>
    {
        let dataURL:string=`https://api.github.com/users/${githubUsername}/repos`;
        axios.get(dataURL).then((response:AxiosResponse<any>)=>
        {
            console.log(response.data)
            this.setState(
                {
                    Repos:response.data
                }
            )
        }).catch((error)=>
        {
            console.log(error);
        })
    }

    submitdata=(event:React.FormEvent<HTMLFormElement>)=>
    {
        event.preventDefault();
        this.searchProfile(this.state.githubUsername);
        this.searchProfileRepos(this.state.githubUsername)
    }
    render()
    {
        return(
            <React.Fragment>
             <h1 className='text-primary text-center' style={{fontFamily:'fantasy'}}>What's in a Name</h1>
             <div className='container'>
                 <div className='row' style={{marginLeft:'450px'}}>
                    <form onSubmit={this.submitdata}>
                    <div className='col-3'>
                        <input type="text" className='form-control' placeholder='Search here' onChange={this.updateUsername}/>
                    </div>
                    <div className='col-6'>
                        <input type="submit" className='mt-2 btn btn-outline-primary' />
                    </div>
                    </form>
                     {/* <pre>{JSON.stringify(this.state.githubUsername)}</pre> */}
                 </div>
             </div>
             <div className='container'>
                 <div className='row'>
                    <div className='col'>
                        <div className='card' style={{marginRight:'30px',width:'23rem',height:'29rem',backgroundColor:'rgb(133, 242, 233)',borderRadius:'20px'}}>
                            <img src={this.state.profile.avatar_url} style={{width:'19rem',borderRadius:'50%',marginLeft:'32px',marginTop:'30px'}}/>
                                <div className='card-body'>
                                    <h1 className='card-title text-center' style={{fontFamily:'cursive',fontSize:'40px',}}>
                                        {this.state.profile.name}
                                    </h1>
                                </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='card' style={{backgroundColor:'rgb(218, 237, 236)',height:'29rem'}}>
                             <div className='card-body'>
                                 <h5>{this.state.profile.url}</h5>
                                 <h5>{this.state.profile.organizations_url}</h5>
                                 <h5>{this.state.profile.events_url}</h5>
                                 <h5>{this.state.profile.followers_url}</h5>
                                 <h5>{this.state.profile.following_url}</h5>
                                 <h5>{this.state.profile.html_url}</h5>
                                 <h5>{this.state.profile.received_events_url}</h5>
                             </div>
                        </div>
                     </div>
                 </div>
             </div>
             
           </React.Fragment>
        );
    }
}
export default GithubSearch;