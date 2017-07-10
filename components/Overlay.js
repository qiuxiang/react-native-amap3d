import React, {PropTypes, Component} from 'react'
import {
  View,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class Overlay extends Component {
  static propTypes = {
    ...View.propTypes,
  }

  _update() {
    setTimeout(() => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
        UIManager.AMapOverlay.Commands.update,
        null,
      )
    }, 0)
  }

  componentDidUpdate = this._update
  componentDidMount = this._update

  render() {
    return <AMapOverlay {...this.props}/>
  }
}

AMapOverlay = requireNativeComponent('AMapOverlay', Overlay)

export default Overlay
