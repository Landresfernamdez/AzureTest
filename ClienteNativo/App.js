import React from 'react';
import axios from 'axios';
import { View,Text,TouchableHighlight,FlatList} from 'react-native';
import styles from './styles';
export default class App extends React.Component {
   constructor(props){
      super(props);
      this.arrayholder=[{key:"Andres"}];
      this._obtenerMessages = this._obtenerMessages.bind(this);
      this._changeState=this._changeState.bind(this);
      this.state={
        marcaFlag:false,
        dataSource:this.arrayholder
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
              for(var x=0;x<listaMessages.length;x++){
                listaMessages[x]={key:listaMessages[x].Message}
              }
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
    return (
      <View style={styles.container}>
      <View style={styles.containerButtons}>
      <TouchableHighlight onPress={this._changeState} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Iniciar peticiones a servidor en Azure</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._changeState} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Detener peticiones a servidor en Azure</Text>
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


