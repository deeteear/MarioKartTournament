import React from 'react'

const styles = {
  background: {
    'position': 'relative',
    'background': 'url(\'mkHeader.png\')',
    'height': '120px',
    'background-repeat': 'no-repeat',
  },
  headline: {
    'position': 'absolute',
    'bottom': 0,
    'left': '12px',
  },
}

const Header = () => {
  return (<div style={styles.background}>
    <h1 style={styles.headline} >Mario Kart 64 Tournament</h1>
  </div>)
}

export default Header
