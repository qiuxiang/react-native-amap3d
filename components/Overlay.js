import React, {PropTypes, Component} from 'react'
import {
  View,
  UIManager,
  Platform,
  NativeModules,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class Overlay extends Component {
  static propTypes = {
    ...View.propTypes,
  }

  componentDidUpdate() {
    setTimeout(() => {
      switch (Platform.OS) {
        case 'android':
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.AMapOverlay.Commands.update,
            null,
          )
          break;
        case 'ios':
          NativeModules.AMapOverlayManager.update(findNodeHandle(this))
          break;
      }
    }, 0)
  }

  render() {
    return <AMapOverlay {...this.props}/>
  }
}

AMapOverlay = requireNativeComponent('AMapOverlay', Overlay)

export default Overlay
