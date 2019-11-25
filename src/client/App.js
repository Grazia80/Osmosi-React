import React, { Component } from 'react';
import './app.css';
import Switches from './commons/switch.js'
import ReactImage from './react.png';
import Menu from './components/MenuHeaderComponent.js';
import InstrCtrPnl from './components/InstrumentsControllerPanel.js';
import BodiesCtrPnl from './components/BodiesControllerPanel.js';
import BodyComponent from './components/BodyComponent.js';
import InstrCmp from './components/InstrumentComponent.js';
import MstSoundComponent from './components/MasterSoundComponent.js';
import Monitor from './components/MonitorComponent.js';
import data from './lmac1.json';


//const json = require('./jse.json');

var index = 0;

var mss= new MstSoundComponent();

function Kinect() {
  console.log('hello');
}


// Define the name of the instruments  based on their link to the body's parts
var instrumentName =['Body', 'Hands', 'Feet', 'Spine'];

// Each instruments defines is own 'sound' channel

function channel (nm) {
  var instrument = {
  'Name' : '',
  'Switch': false,
  'Type' : 'Piano',
  'Mode' : 'Single',
  'Scale': 'Major',
  'Note' : 'C',
  'Volume' : 5,
  'Sensistivy' : 10
}
  return instrument;
};

// Define all the instrument registered. I shold programattically define the orchestra?(i.e. based on the instrumentName)
var  orchestra = {Body: channel(instrumentName[0]),Hands: channel(instrumentName[1]),Feet: channel(instrumentName[2]),Spine: channel(instrumentName[3])};



class App extends Component {

  constructor(props) {

    super(props);
    this.state = {bodies:[], index:1, instruments:orchestra};
    //this.props.instruments = orchestra;
    this.onHandleMouse = this.onHandleMouse.bind(this);
    this.onHandleSelect = this.onHandleSelect.bind(this);

    this.soundBox = new MstSoundComponent();
  }

  //This is done for the slide volume comps which onchange event is not working!!
  onHandleMouse (e) {
    if(e.changeType != 'Volume'){
      return;
    };
    orchestra[e.currentTarget.firstChild.id].Volume = e.changeValue;
    // console.log(
    //   "Change Mouse from: ", e.currentTarget.firstChild.id,
    //   " of the " + e.changeType +
    //   " with Value: ", e.changeValue
    // )
  }

  //Event handler for all but the volume slide
  onHandleSelect (e) {
    if(e.changeType === 'Volume'){
      return;
    }
    orchestra[e.currentTarget.firstChild.id][e.changeType] = e.changeValue;
    console.log(
      "Change Selection from: ", e.currentTarget.firstChild.id,
      " of the " + e.changeType +
      " with Value: ", e.changeValue
    )
    this.soundBox.playSoundGuitar();
  }

  componentDidMount() {
        setInterval(() => {
            var newIndex = this.state.index + 1;
            var body = data[newIndex];
            //console.log(body[0].bodyIndex);
          //  console.log(body[0].joints);
            this.setState({bodies:data[newIndex], index: newIndex})
        }, 70);
    }

  render() {
    return (
      <div className="container-fluid">
      	<div className="row">
      		<div className={"col-md-12 bg-secondary"}>
            <h1 className={"text-white"}>Osmosi</h1>
          </div>
      	</div>
      	<div className={"row"}>
      		<div className="col-md-6">
            <ul className={"list-group border-0"}>
              <li onMouseUp={this.onHandleMouse} onChange={this.onHandleSelect} className={"list-group-item border-0"}><InstrCmp name='Body' /></li>
              <li onMouseUp={this.onHandleMouse} onChange={this.onHandleSelect} className={"list-group-item border-0"}><InstrCmp name="Hands" /></li>
              <li onMouseUp={this.onHandleMouse} onChange={this.onHandleSelect} className={"list-group-item border-0"}><InstrCmp name="Spine" /></li>
              <li onMouseUp={this.onHandleMouse} onChange={this.onHandleSelect} className={"list-group-item border-0"}><InstrCmp name="Feet" /></li>
            </ul>
          </div>
      		<div className={"col-md-6"}>
            <Monitor bodies={this.state.bodies} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
