import React from 'react';

const Content = ({ children }) => {
  return (
      <div
        style={{
          maxWidth: 700,
          margin: `3rem auto`,
          padding: '0 30px',
          paddingTop: '60px'
        }}
      >
        <main>{children}</main>
      </div>
  )
}

export default Content;