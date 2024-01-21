import { Button, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { TextField } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const LinkExport: React.FC<{
  timetableLink: string
}> = ({timetableLink}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(window.location.toString())
    }
    
    return (
        <>
          <Box
            sx={{ display: "flex", gap: 2, mb: 4 }}
          >
            <TextField           
              id="outlined-read-only-input"
              label="NusMods Link"
              value={timetableLink}
              variant="outlined"
              sx={{ flexGrow: 1 }}
              InputProps={{
                  readOnly: true,
              }}/>
            <Tooltip title="Copy URL">
            <Button onClick={handleClick}>
              <ContentCopyIcon />
            </Button>
            </Tooltip>
            <Tooltip title="View on NusMods">
              <Button href={timetableLink}>
                <ExitToAppIcon />
              </Button>
            </Tooltip>
          </Box>
          
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default LinkExport