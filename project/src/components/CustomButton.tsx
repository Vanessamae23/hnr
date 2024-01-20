import React from 'react'
import Button from '@mui/material/Button';
const CustomButton = ({ onClick }) => {
  return (
    <Button color='warning' onClick={onClick} variant="contained">Contained</Button>
  )
}

export default CustomButton
