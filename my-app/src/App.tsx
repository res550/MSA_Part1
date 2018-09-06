import * as React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Tv from '@material-ui/icons/Tv';
import Input from '@material-ui/core/Input';
import CloudUpload from '@material-ui/icons/CloudUpload'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Heading from "./Components/Heading"

interface IState{
  ChannelID: any,
  SubscriberCount : any,
  TotalViews:any,
  VideoCount: any,
  ErrorMessage:String
}

class App extends React.Component<{},IState> {

  constructor(props:any){
    super(props);
    this.state = {
      ChannelID: "",
      SubscriberCount: 0,
      TotalViews: 0,
      VideoCount: 0,
      ErrorMessage: "",
    };
    this.changeText = this.changeText.bind(this);
    this.getData = this.getData.bind(this);
  }
  public getData(){
    fetch('https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername='+this.state.ChannelID+'&key=AIzaSyAuiVcV8Ihp0tG_G0q1e70ertd1H8yEuEc')
    
    .then((response : any) => {
        if(!response.ok){
          this.setState({ErrorMessage: response.statusText})
        }
        else{
          response.json().then((data:any) => {
            if(data.items.length>=1){
              this.setState({
                ErrorMessage:"",
                SubscriberCount: data.items[0].statistics.subscriberCount,
                TotalViews:  data.items[0].statistics.viewCount,
                VideoCount: data.items[0].statistics.videoCount,
                })
            }
            else{
              this.setState({
                ErrorMessage:"Sorry no results were found",
                SubscriberCount: 0,
                TotalViews: 0,
                VideoCount: 0,
            })
            }
          })
        }
    })
  }
  

  public changeText(event: { target: { value: any; }; }){
    this.setState(
        { ChannelID : event.target.value}
    );
  }

  public render() {
    return (
      <div className="App">
        <Heading/>
        <label>
          <Input
            placeholder = "UserName for the channel" 
            inputProps={{'aria-label': 'Description',}}
            type="text" value={this.state.ChannelID} onChange={this.changeText}
          />
          <br/>
            <Button id="SubmitButton" variant="contained" color="primary" onClick={this.getData}>
              Submit
            </Button>
          <h3>
            <AccountCircle id="Icon"/>
            Subscriber Count : {this.state.SubscriberCount}
          </h3>
          <h3>
          <Tv id="Icon"/>
              Total Views : {this.state.TotalViews}
          </h3>
          <h3>
          <CloudUpload id="Icon"/>
              Videos Uploaded : {this.state.VideoCount}
          </h3>
          <h3>
            {this.state.ErrorMessage}
          </h3>
        </label>
      </div>
    );
  }
}

export default App;