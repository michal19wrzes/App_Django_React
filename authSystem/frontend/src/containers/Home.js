import React,{ useState, Component } from 'react';
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
import { render } from 'react-dom';
import {w3cwebsocket as W3CWebSocket} from "websocket";

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
//const Home = ({ logout, isAuthenticated })=>{ 
class Home extends Component { 

	render(){
		const { logout, isAuthenticated } = this.props;
				
		//const [redirect, setRedirect] = useState(false);
		this.state = {
			redirect:false,
			room:"vacad"
		};
		
		if(!isAuthenticated){
			return <Navigate to='/login' />
		}
		
		
		
		var client = new W3CWebSocket('ws://localhost:8000/ws/chat/' + this.state.room + '/');
		//componentDidMount
		client.onopen = () => {
			console.log('Websocket Client Connected');
		};
		
		const logoutHandler = () => {
		logout();
		//setRedirect(true);
		this.setState({ redirect:true })
		};
	return (
		<ThemeProvider theme={theme}>
		  <Grid container component="main" sx={{ height: '100vh' }}>
			  {isAuthenticated ? '': <Navigate to='/login' /> }
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} component={Paper} elevation={3} square>
				<Box
					sx={{
					  my: 8,
					  mx: 4,
					  display: 'flex',
					  flexDirection: 'column',
					  alignItems: 'center',
					}}
				>
					<Typography component="h1" variant="h5">
						{isAuthenticated ? 'isAuthenticated=True' : 'isAuthenticated=False' }
					</Typography>
					
				</Box>
			</Grid>
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
		  {this.state.redirect ? <Navigate to='/login/' /> :''}
		</ThemeProvider>
	)};
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ logout })(Home);