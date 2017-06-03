import React, {PropTypes, Component} from 'react'
import {requireNativeComponent, View} from 'react-native'

class InfoWindow extends Component {
  static propTypes = {
    ...View.propTypes,
  }

  render() {
    return <AMapInfoWindow {...this.props}/>
  }
}

AMapInfoWindow = requireNativeComponent('AMapInfoWindow', InfoWindow)

export default InfoWindow
