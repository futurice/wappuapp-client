'use strict';

import React, {
  View,
  Modal,
  Text,
  TextInput,
  Image,
  Platform,
  Dimensions,
  StyleSheet
} from 'react-native';
import theme from '../../style/theme';

const LeaderboardEntry = React.createClass({

  render() {

    const percentageToTopscore = (this.props.team.get('score') / this.props.topscore)  || 0;
    const barWrapWidth = (Dimensions.get('window').width - 165); // 165 other content width
    const barWidth = barWrapWidth * percentageToTopscore;

    return (
      <View style={styles.entry}>

        <View style={styles.entryLogo}>
          <Image
          source={{ uri: this.props.logo }}
          style={styles.entryLogoImg} />
        </View>

        <View style={styles.entryContent}>
          <View style={styles.entryTitle}>
            <Text style={styles.entryTitleName}>
            {this.props.team.get('name')}
            </Text>

          </View>
          <View style={styles.barWrap}>
                <View style={[
                  styles.bar,
                  {width: barWidth }
                ]} />

            <Text style={[styles.entryTitleScore, styles.entryTitleScoreOver]}>
              {this.props.team.get('score')}
            </Text>

          </View>
        </View>
        <View style={styles.entryBottomLine} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  entry: {
    paddingTop:35,
    paddingBottom:35,
    backgroundColor:'#FFF',
    flexDirection:'row',
    alignItems:'center'
  },
  entryBottomLine:{
    position:'absolute',
    left:20,
    right:20,
    bottom:0,
    height:1,
    backgroundColor:'#f2f2f2',

  },
  entryTitlePosition:{
    position:'absolute',
    left:30,
    top:12,
  },
  entryTitlePositionText: {
    fontWeight:'normal',
    color:'#bbb',
    fontSize:16,
    flex:1,
  },
  entryLogo:{
    paddingLeft:20,
    paddingRight:20,
  },
  entryLogoImg:{
    width:50,
    height:50,
    borderRadius:25,
  },
  entryContent: {
    flex:1,
    justifyContent:'space-between',
    flexDirection:'column',
    paddingRight:20,
  },
  entryTitle: {
    flex:1,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'stretch',
  },
  entryTitleName:{
    fontSize:18,
    fontWeight:'normal',
  },
  entryTitleScore:{
    backgroundColor:'transparent',
    color:'#ccc',
    fontSize:18,
    textAlign:'right',
  },
  entryTitleScoreOver:{
    position:'absolute',
    left:8,
    top:Platform.OS === 'ios' ? 6 : 2,
    fontSize:15,
    fontWeight:'bold',
    color:theme.light
  },
  barWrap:{
    backgroundColor:'#ddd',
    marginTop:3,
    borderRadius:3,
    marginBottom:5,
    height:Platform.OS === 'ios' ? 30 : 26,
    flex:1,
  },
  bar:{
    height:Platform.OS === 'ios' ? 30 : 26,
    backgroundColor:theme.secondary,
    position:'absolute',
    borderBottomLeftRadius:3,
    borderTopLeftRadius:3,
    left:0,
    top:0,
    bottom:0,
    width:0,
  }
});

export default LeaderboardEntry;
