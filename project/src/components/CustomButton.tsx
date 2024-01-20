import React from 'react'
import Button from '@mui/material/Button';

const CustomButton = ({ onClick, label, disabled = false, ...props }) => {
  return (
    <Button type="submit" color='warning' onClick={onClick} variant="contained" disabled={disabled} {...props}>{label}</Button>
  )
}

export default CustomButton
