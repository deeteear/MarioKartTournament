import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessageBox = ({ errorMessage }) => {
  return errorMessage ? (<div className="alert alert-danger">{errorMessage}</div>) : null
}

ErrorMessageBox.propTypes = {
  errorMessage: PropTypes.string,
}

export default ErrorMessageBox
