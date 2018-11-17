import React, { Component } from 'react';
import './App.css';
import './tablero.css';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props);
    this._obtenerMessages = this._obtenerMessages.bind(this);
    this._detenerPeticionesServidorColas = this._detenerPeticionesServidorColas.bind(this);
    this._iniciarPeticionesServidorColas = this._iniciarPeticionesServidorColas.bind(this);
    this.state = {
      dataSource: []
    }
  }
  componentDidMount(){
    this._obtenerMessages();
  }
  _obtenerMessages(){
    axios.get("http://172.24.104.108:8080/selectMessages")
      .then(response => {
        var listaMessages = response.data;
        this.setState({
          dataSource: listaMessages
        })
      }).catch(function (error) {

      })
  }
  _iniciarPeticionesServidorColas(){
    axios.get("http://172.24.104.108:8080/start")
      .then(response => {

      }).catch(function (error) {
      })
  }
  _detenerPeticionesServidorColas(){
    axios.get("http://172.24.104.108:8080/stop")
      .then(response => {

      }).catch(function (error) {
      })
  }
  render() {
    const mensajes = this.state.dataSource;
    for (var i = 0; i < mensajes.length; i++) {
      console.log(mensajes[i]);
      const temporal = <td className="tablero">
        <p>{mensajes[i].ID}:</p>{mensajes[i].Message}
      </td>;
      mensajes[i] = temporal;
    }
    const listItems = mensajes.map((x, i) =>
      <tr>
        {mensajes[i]}
      </tr>);
    var divStyle = {
      overflowX: 'auto',
      overflowY: 'auto',
      textAlign: 'center',
      marginLeft: '40%',
      marginTop: '10%',
    };
    var divStyle1 = {
      overflowX: 'auto',
      overflowY: 'auto',
      textAlign: 'center',
      marginLeft: '10%',
      marginTop: '10%',
    };
    return (
      <html>
        <body>
          <div style={divStyle1}>
            <button onClick={this._iniciarPeticionesServidorColas}>Iniciar peticiones a Azure</button>
            <button onClick={this._detenerPeticionesServidorColas}>Detener Peticiones a Azure</button>
            <button onClick={this._obtenerMessages}>Obtener mensajes de base de datos en Azure</button>
          </div>
          <div style={divStyle}>
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
