import Box from '@mui/material/Box';

function ResponsiveBox(props) {
  return (
    <Box
      sx={{
        padding: 1,
        width: {
          xs: '100%', // Full width on extra-small screens (phones)
          sm: '80%',  // 80% width on small screens
          md: '60%',  // 60% width on medium screens
          lg: '50%',  // 50% width on large screens
        },
        margin: '0 auto', // Center the box horizontally when it's not full width
      }}
    >
      {props.children}
    </Box>
  );
}

export default ResponsiveBox;