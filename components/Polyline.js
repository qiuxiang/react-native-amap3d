import React, {PropTypes, Component} from 'react'
import {processColor, requireNativeComponent, View, PixelRatio} from 'react-native'
import {CoordinatePropType} from './PropTypes'

class Polyline extends Component {
  static propTypes = {
    ...View.propTypes,

    coordinates: PropTypes.arrayOf(CoordinatePropType).isRequired,
    width: PropTypes.number,
    color: PropTypes.string,
    zIndex: PropTypes.number,
    opacity: PropTypes.number,

    /**
     * 多段颜色
     */
    colors: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.string),
    ]),

    /**
     * 是否使用颜色渐变
     */
    gradient: PropTypes.bool,

    /**
     * 是否绘制大地线
     */
    geodesic: PropTypes.bool,

    /**
     * 是否绘制虚线
     */
    dottedLine: PropTypes.bool,
  }

  static defaultProps = {
    width: 1,
    color: '#000',
    colors: [],
    opacity: 1,
  }

  render() {
    const props = {
      ...this.props,
      width: PixelRatio.getPixelSizeForLayoutSize(this.props.width),
      colors: this.props.colors.map(processColor),
    }
    return <AMapPolyline {...props}/>
  }
}

AMapPolyline = requireNativeComponent('AMapPolyline', Polyline)

export default Polyline
