// @flow
import React from 'react'
import PropTypes from 'prop-types'
import {requireNativeComponent, ViewPropTypes} from 'react-native'
import {LatLng, Region} from '../PropTypes'
import BaseComponent from '../BaseComponent'

export default class AMapSearch extends BaseComponent<any> {
    static propTypes = {
        ...ViewPropTypes,
        coordinate: LatLng
    }
    render() {
        return <AMapSearch {...this.props}/>
      }
}
const AMapSearch = requireNativeComponent('AMapSearch', null)