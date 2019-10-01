import React from 'react';

const Content = ({ children }) => {
  return (
      <div
        style={{
          maxWidth: 650,
          margin: `3rem auto`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
      </div>
  )
}

export default Content;