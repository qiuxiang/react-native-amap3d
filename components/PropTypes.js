import PropTypes from 'prop-types'

const LatLng = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
})

const Region = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitudeDelta: PropTypes.number.isRequired,
  longitudeDelta: PropTypes.number.isRequired,
})

const Point = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
})

export {LatLng, Region, Point}

