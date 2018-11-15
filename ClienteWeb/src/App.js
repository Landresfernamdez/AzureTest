import React, { Component } from 'react';
import './App.css';
import './tablero.css';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props);
    this._obtenerMessages = this._obtenerMessages.bind(this);
    this._changeState=this._changeState.bind(this);
    this.state={
      marcaFlag:false,
      dataSource:[]
    }
 }
componentDidMount(){
    this._obtenerMessages();
} 
_obtenerMessages(){
   axios.get("http://172.24.104.108:8080/selectMessages")
          .then(response=>{
            console.log(response.data);
            var listaMessages=response.data;
            this.setState({
              dataSource:listaMessages
            })
            if(this.state.marcaFlag){
              this._obtenerMessages();
            }
          }).catch(function (error) {

        })
}
_changeState(){
  this.setState({ 
    marcaFlag: !this.state.marcaFlag
  }
  )
  this._obtenerMessages();
 }
  render() {
    const mensajes=this.state.dataSource;
    for( var i=0;i<mensajes.length;i++){
      const temporal=<td className="tablero">
                      {mensajes[i].Message}
                    </td>;
                    mensajes[i]=temporal;
    }
    const listItems = mensajes.map((x,i) =>
            <tr>
                {mensajes[i]}
            </tr>);
        var divStyle = {
            overflowX:'auto',
            overflowY:'auto',
            textAlign:'center',
            marginLeft: '50%',
            marginTop: '10%',
        }; 
    return (
      <html>
      <body>
      <div style={divStyle}>
      <button onClick={this._changeState}>Iniciar peticiones a Azure</button>
        <button onClick={this._changeState}>Detener Peticiones a Azure</button>
          <table className="tablero">
              {listItems}
          </table>
      </div>
      </body>
  </html>
    );
  }
}

export default App;
