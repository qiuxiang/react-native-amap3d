import React from 'react'
import {requireNativeComponent, ViewPropTypes} from 'react-native'
import BaseComponent from '../BaseComponent'

export default class Overlay extends BaseComponent {
  static propTypes = {
    ...ViewPropTypes,
  }

  _update = () => setTimeout(() => this._sendCommand('update'), 0)

  componentDidUpdate = this._update
  componentDidMount = this._update

  render() {
    return <AMapOverlay {...this.props}/>
  }

  name = 'AMapOverlay'
}

const AMapOverlay = requireNativeComponent('AMapOverlay', Overlay)
