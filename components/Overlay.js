import React, {PropTypes, Component} from 'react'
import {
  ViewPropTypes,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

export default class Overlay extends Component {
  static propTypes = {
    ...ViewPropTypes,
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

const AMapOverlay = requireNativeComponent('AMapOverlay', Overlay)
