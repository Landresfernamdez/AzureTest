import React from 'react';
import axios from 'axios';
import { View,Text,TouchableHighlight,FlatList} from 'react-native';
import styles from './styles';
export default class App extends React.Component {
   constructor(props){
      super(props);
      this.arrayholder=[{key:"Andres"}];
      this._obtenerMessages = this._obtenerMessages.bind(this);
      this._detenerPeticionesServidorColas = this._detenerPeticionesServidorColas.bind(this);
      this._iniciarPeticionesServidorColas = this._iniciarPeticionesServidorColas.bind(this);
      this.state={
        dataSource:this.arrayholder
      }
   }
  componentDidMount(){
    this._obtenerMessages();
  } 
  _obtenerMessages(){
     axios.get("http://172.24.104.108:8080/selectMessages")
            .then(response=>{
              var listaMessages=response.data;
              for(var x=0;x<listaMessages.length;x++){
                listaMessages[x]={key:listaMessages[x].ID+":"+listaMessages[x].Message}
              }
              this.setState({
                dataSource:listaMessages
              })
            }).catch(function (error){

          })
  }
  _iniciarPeticionesServidorColas() {
    axios.get("http://172.24.104.108:8080/start")
      .then(response => {

      }).catch(function (error) {
      })
  }
  _detenerPeticionesServidorColas() {
    axios.get("http://172.24.104.108:8080/stop")
      .then(response => {

      }).catch(function (error) {
      })
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.containerButtons}>
      <TouchableHighlight onPress={this._iniciarPeticionesServidorColas} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Iniciar peticiones a servidor en Azure</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._detenerPeticionesServidorColas} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Detener peticiones a servidor en Azure</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._obtenerMessages} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Obtener mensajes de base de datos en Azure</Text>
          </View>
        </TouchableHighlight>
       </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text style={styles.item} >{item.key} </Text>}
        />
      </View>
    );
  }
}


