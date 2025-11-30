import React from 'react'
import { Link } from 'react-router-dom'

const STYLES = ['btn--primary', 'btn--highlight']
const SIZES = ['btn-medium', 'btn-large']

export default function Button({children, type , src , onClick , buttonStyles,buttonSize}) {
    const checkButtonStyles = STYLES.includes(buttonStyles) ? buttonStyles : STYLES[0]
    const checkButtonSizes = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  return (
    <div>
        <Link to={src}>
        <button
        className={`btn ${checkButtonSizes} ${checkButtonStyles}`}
        onClick={onClick}
        type={type}
        >
            {children}
        </button>
        </Link>
    </div>
  )
}
