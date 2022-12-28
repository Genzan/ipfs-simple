import React from 'react';
import IPFSHandler from '../utils/IPFSHandler.js';
import '../styles/Main.css';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hash: null,
      buffer: null,
      dataLoaded: true
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onView = this.onView.bind(this);
    this.readURL = this.readURL.bind(this);
  };

  componentDidMount = async () => {
    this.setState({dataLoaded: true});
  };

  //Turns File into Buffer
  readURL(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  //Helper to convert File into Buffer
  convertToBuffer = async(reader) => {
    const buffer = await IPFSHandler.convertToBuffer(reader);
    this.setState({buffer});
  };

  
  onView = async () => {
    const ruta = IPFSHandler.viewIPFSFile(this.state.hash);
    console.log(ruta);
    window.open(ruta,"_blank"); 
  }
  
  onSave = async () => {
    console.log("Buffer",this.state.buffer);
    this.setState({dataLoaded: false});
    if (typeof this.state.buffer !== "undefined"){
      try {
        const file = await IPFSHandler.saveFile(this.state.buffer);
        console.log(file);
        this.setState({hash: file.path});
      }
      catch (error){
        console.log("error: "+error);
      }
    } else {
      //
    }
  }

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
    }
  }

  render() {
    if ( this.state.dataLoaded ) {
      return (
        <div className="Main">
          <div className="Main-form">
            <div className="Main-field noMargin" />
            <div className="Main-btn-wrapper">
              <input type="file" name="myfile" accept="application/pdf,image/*" onChange={this.readURL}/>
              <button className="Main-submit" onClick={this.onSave}>
                Guardar
              </button>
            </div>
            <p></p>
            <p></p>
              HASH: {this.state.hash}
            <p></p>
            <button className="Main-submit" onClick={this.onView}>
              Visualizar
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Main-loader"></div>
        </div>
      );
    }
  }
}