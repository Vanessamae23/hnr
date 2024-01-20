import React from 'react'
import Button from '@mui/material/Button';
const CustomButton = ({ onClick, label }) => {
  return (
    <Button type="submit" color='warning' onClick={onClick} variant="contained">{label}</Button>
  )
}

export default CustomButton
