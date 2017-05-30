import {PropTypes} from 'react'

const CoordinatePropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
})

export {CoordinatePropType}
