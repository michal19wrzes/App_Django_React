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
import { create_user } from '../actions/auth';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

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

const Signup = ({create_user,isAuthenticated}) => {
	const [formData,setFormData] = useState({
		name:'',
		email: '',
		password:'',
		re_password:''
	});
	const [accountCreated,setAccountCreated] = useState(false);
	
	const {email,name,password, re_password}= formData;
	
	const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const handleSubmit = e => {
		e.preventDefault();
		if(password===re_password){
			create_user(email, name, password, re_password);
			setAccountCreated(true);
		}
	};
	if(isAuthenticated){
		return <Navigate to='/'/>
	}
	if(accountCreated){
		return <Navigate to='/login'/>
	}
	
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
				  Załóż swoje super konto w klanie Stevena!
				</Typography>
				<Box component="form" width={350} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				  <TextField
					margin="normal"
					required
					fullWidth
					onChange = {e => handleChange(e)}
					color = 'success'
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					autoFocus
				  />
				  <TextField
					margin="normal"
					required
					fullWidth
					onChange = {e => handleChange(e)}
					color = 'success'
					id="name"
					label="Nazwa"
					name="name"
					autoComplete="name"
					autoFocus
				  />
				  <TextField
					margin="normal"
					required
					fullWidth
					onChange = {e => handleChange(e)}
					color = 'success'
					name="password"
					label="Haslo"
					type="password"
					id="password"
					autoComplete="current-password"
				  />
				  <TextField
					margin="normal"
					required
					fullWidth
					onChange = {e => handleChange(e)}
					color = 'success'
					name="re_password"
					label="Powtórz hasło"
					type="password"
					id="re_password"
				  />
				  <FormControlLabel
					control={<Checkbox value="remember" color="success" />}
					label="Pozdrów autora"
				  />
				  <Button
					type="submit"
					fullWidth
					color="success"
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				  >
					Utwórz konto
				  </Button>
				  <Grid container alignItems='center' justifyContent='center' sx={{mt:2}}>
					  <Grid item alignItems='center'>
						<Link href = "http://localhost:8000/login">Mam już konto!</Link>
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

export default connect(mapStateToProps, {create_user})(Signup);