import React from 'react'

const ErrorMessage = ({ error }) => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
        <h1 style={{ color: "red" }}>Error: {error.message || error}</h1>
        <p>
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
  )
}

export default ErrorMessage