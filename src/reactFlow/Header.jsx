import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' noWrap component='div'>
        {label}
      </Typography>
    </Toolbar>
  );
}
const Header = () => {
  return (
    <AppBar
      position='fixed'
      variant='elevation'
      color='primary'
      enableColorOnDark
      elevation={1}
    >
      {appBarLabel('WisdomMap')}
    </AppBar>
  );
};

export default Header;
