import React from 'react';

const Content = ({ children, className }) => {
  return (
    <div className={className}>
      <div
        style={{
          maxWidth: 850,
          margin: `0 auto`,
          paddingTop: `3rem`,
          padding: '3rem 30px'
        }}
      >
        <section>{children}</section>
      </div>
    </div>   
  )
}

export default Content;

export const ContentMax = ({children, className}) => (
  <div className={className}>
    <div
      style={{
        maxWidth: '90%',
        margin: `0 auto`,
        paddingTop: `3rem`,
        padding: '3rem 30px'
      }}
    >
      <section>{children}</section>
    </div>
  </div>
)
