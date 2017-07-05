import {PropTypes} from 'react'

const LatLng = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
})

const Span = PropTypes.shape({
  latitudeDelta: PropTypes.number.isRequired,
  longitudeDelta: PropTypes.number.isRequired,
})

const Region = PropTypes.shape({
  center: LatLng,
  span: Span,
})

export {
  LatLng,
  Span,
  Region,
}

