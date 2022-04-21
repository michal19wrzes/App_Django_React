import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../actions/auth';

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
 
const Login = ({login,isAuthenticated}) => {
	const [formData,setFormData] = useState({
		email: '',
		password: ''
	});
	const {email,password} = formData;
	
	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
	
	const handleSubmit = e => {
		e.preventDefault();
		login(email,password);
	};
	
	// if(isAuthenticated){
		// return <Navigate to='/' />
	// }
  
	

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
				  Zaloguj się do Twojego super konta!
				</Typography>
				<Box component="form" width={350} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				  <TextField
					margin="normal"
					required
					fullWidth
					onChange={e => handleChange(e)}
					color = 'success'
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					autoFocus
				  />
				  <TextField
					margin="normal"
					onChange={e => handleChange(e)}
					required
					fullWidth
					color = 'success'
					name="password"
					label="Haslo"
					type="password"
					id="password"
					autoComplete="current-password"
				  />
				  <FormControlLabel
					control={<Checkbox value="remember" color="success" />}
					label="Zapamiętoj mnie"
				  />
				  <Button
					type="submit"
					fullWidth
					color="success"
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				  >
					Zaloguj
				  </Button>
				  <Grid container>
					<Grid item xs>
					  <Link href="/reset-password" variant="body2">
						Nipamiętom hasła
					  </Link>
					</Grid>
					<Grid item >
					  <Link href="/signup" variant="body2">
						{"Nimosz konta? Durch tu wlazuj! "}
					  </Link>
					</Grid>
				  </Grid>
				  <Copyright sx={{ mt: 5 }} />
				</Box>
			  </Box>
			</Grid>
		  </Grid>
		</ThemeProvider>
	);
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps,{ login })(Login);