import {Box, Stack} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AssistantIcon from '@mui/icons-material/Assistant';
import LinearProgress from '@mui/material/LinearProgress';


const Message = ({variant, value}) => {
  const settings = variant === 'right' ? {
    mr: 0,
    ml: 'auto',
    borderColor: 'divider',
    textAlign: 'right',
    bgcolor: 'grey.300',
    color: theme => theme.palette.getContrastText(theme.palette.grey[300])
  } : {
    mr: 'auto',
    ml: 0,
    borderColor: 'primary.light',
    textAlign: 'left',
    bgcolor: 'primary.main',
    color: theme => theme.palette.getContrastText(theme.palette.primary.main)
  }

  return (
    <Stack direction="row" spacing={2} sx={{
      width: 'max-content',
      maxWidth: '75%',
      mr: settings.mr,
      ml: settings.ml,
    }}>
      {variant === 'left' && (
        <AssistantIcon fontSize="large" sx={{
          borderRadius: '100%',
          bgcolor: settings.bgcolor,
          color: settings.color,
          p: 0.8,
        }}/>
      )}
      <Box sx={{
        borderRadius: 2,
        border: 1,
        borderColor: settings.borderColor,
        px: 2,
        py: 1,
        textAlign: settings.textAlign,
        wordBreak: 'auto-phrase',
        hyphens: 'auto',
      }}>
        {value ? value : (<LinearProgress color="primary" sx={{borderRadius: 2, m: 1.2, width: '75px', height: '5px'}}  />)}
      </Box>
      {variant === 'right' && (
        <PersonIcon fontSize="large" sx={{
          borderRadius: '100%',
          bgcolor: settings.bgcolor,
          color: settings.color,
          p: 0.8,
        }}/>
      )}
    </Stack>
  )

}

export default Message
