import React from 'react';
import { StyleSheet, Image, View, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';

import { toggleCityPanel, getCityId, getCurrentCityName } from '../../concepts/city';

import theme from '../../style/theme';
// import MdIcon from 'react-native-vector-icons/MaterialIcons';

const cityIcons = {
  helsinki: require('../../../assets/cities/icon-ota-amfi-accent.png'),
  tampere: require('../../../assets/cities/icon-tampere-accent.png'),
};

const CitySelector = ({ currentCity, toggleCityPanel: onCityIconClicked, currentCityName }) => (
  <TouchableHighlight underlayColor={'transparent'} onPress={() => onCityIconClicked()}>
    <View>
      <Image
        source={
          (currentCityName || '').toLowerCase() === 'tampere'
            ? cityIcons.tampere
            : cityIcons.helsinki
        }
        style={styles.cityIcon}
      />
    </View>
  </TouchableHighlight>
);

var styles = StyleSheet.create({
  filterText: {
    color: theme.white,
    fontSize: 10,
    paddingTop: 15,
    paddingLeft: 18,
  },
  filterIcon: {
    fontSize: 24,
  },
  cityIcon: {
    top: 3,
    left: 7,
    width: 34,
    height: 34,
  },
});

const mapDispatchToProps = { toggleCityPanel };

const select = state => {
  return {
    currentCity: getCityId(state),
    currentCityName: getCurrentCityName(state),
    currentTab: state.navigation.get('currentTab'),
  };
};

export default connect(select, mapDispatchToProps)(CitySelector);
