import {PropTypes} from 'react'

const LatLng = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
})

export {LatLng}
