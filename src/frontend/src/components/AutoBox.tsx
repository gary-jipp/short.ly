import Box from '@mui/material/Box';
import {ReactNode} from 'react';

export interface AutoBoxProps {
  children?: ReactNode;
}

const AutoBox: React.FC<AutoBoxProps> = function(props) {

  return (
    <Box
      sx={{
        padding: 1,
        width: {
          xs: '100%', // Full width on extra-small screens (phones)
          sm: '70%',
          md: '50%',
          lg: '40%',  // 50% width on large screens
        },
        margin: '0 auto', // Center the box horizontally when it's not full width
      }}
    >
      {props.children}
    </Box>
  );
};

export default AutoBox;