import React,{ useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.success" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/michal19wrzes/python">
        M.N.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const Home = ({ logout, isAuthenticated }) =>{ 
	
	const [redirect, setRedirect] = useState(false);
	
	const logoutHandler = () => {
	logout();
	setRedirect(true);
	};
	
	
	return (
		<ThemeProvider theme={theme}>
		  <Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
			  item
			  xs={false}
			  sm={4}
			  md={7}
			  sx={{

				backgroundImage: 'url(https://source.unsplash.com/random)',
				backgroundRepeat: 'no-repeat',
				backgroundColor: (t) =>
				  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			  }}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			  <Box
				sx={{
				  
				  my: 8,
				  mx: 4,
				  display: 'flex',
				  flexDirection: 'column',
				  alignItems: 'center',
				}}
			  >
				<Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
				  <LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
				  {isAuthenticated ? 'Jesteś zalogowany!' : 'Jesteś wylogowany!'}
				</Typography>
				<Box width={350}>
					<Button
						fullWidth
						color="success"
						onClick={logoutHandler} 
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>{isAuthenticated ? 'Wyloguj się' : 'Zaloguj się'}</Button>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			  </Box>
			</Grid>
		  </Grid>
		  {redirect ? <Navigate to='/login/' /> : <h1>redirect fail</h1>}
		</ThemeProvider>
	);
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ logout })(Home);