import React, {PropTypes, Component} from 'react'
import {
  View,
  UIManager,
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
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
        UIManager.AMapOverlay.Commands.update,
        null,
      )
    }, 0)
  }

  render() {
    return <AMapOverlay {...this.props}/>
  }
}

AMapOverlay = requireNativeComponent('AMapOverlay', Overlay)

export default Overlay
