import React,{ Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
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
class Home extends Component { 
	state = {
			redirect:false,
			room:"vacad",
			messages:[],
			name:'',
			value:'',
		};
	client = new W3CWebSocket('ws://localhost:8000/ws/chat/' + this.state.room + '/');
	
	onButtonClicked = (e) => {
		this.client.send(JSON.stringify({
			type:"message",
			message: this.state.value,
			name: this.state.name
		}));
		this.state.value=''
		e.preventDefault();
	}
	
	componentDidMount(){
			this.client.onopen = () =>{
				console.log('open')
			};
			this.client.onmessage = (message) => {
				const dataFromServer = JSON.parse(message.data);
				console.log('got reply! ', dataFromServer.type);
				if(dataFromServer){
					this.setState((state) => 
						({
							messages: [...state.messages,
							{
								msg: dataFromServer.message,
								name: dataFromServer.name,
							}]
							
						})
					);
				}
			};
			
		}
		
		
	render(){
		
		const { logout, isAuthenticated} = this.props;
		const logoutHandler = () => {
			logout();
			this.setState({ redirect:true })
		};
		
	return (
		<ThemeProvider theme={theme}>
			
				<CssBaseline />
				{isAuthenticated ? <div>
				<Grid container alignItems="center" justifyContent="center">
					
					<Grid item xs={12} sm = {8} md ={9}>
						<TextField fullWidth>
						</TextField>
					</Grid>

					<Grid item xs={12} sm={4} md={3} component={Paper} elevation={3} square>
						<Box
							sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							}}
						>
							Room Name: {this.state.room}
							<Paper style={{ height: 400, maxHeight: 400, overflow: 'auto', boxShadow: 'none', }}>
							{this.state.messages.map(message => <>
								<Card >
								<CardHeader
									avatar={
									<Avatar >
										R
								</Avatar>
									}
									title={message.name}
									subheader={message.msg}
								/>
								</Card>
							</>)}
							</Paper>
							<form noValidate onSubmit={this.onButtonClicked}>
							<TextField
								id="outlined-helperText"
								label="Wyślij wiadomość"
								defaultValue="Default Value"
								variant="outlined"
								value={this.state.value}
								fullWidth
								onChange={e => {
								this.setState({ value: e.target.value });
								this.value = this.state.value;
								}}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="success"
							>
								Start Chatting
							</Button>
							<Button
								fullWidth
								color="success"
								onClick={logoutHandler} 
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>{isAuthenticated ? 'Wyloguj się' : 'Zaloguj się'}
							</Button>

							</form>
							
						</Box>
					</Grid>
					<Grid item fullWidth>
						<Copyright />
					</Grid>
				</Grid>
			</div>
			:
			<Button
				fullWidth
				color="success"
				onClick={logoutHandler} 
				variant="contained"
				sx={{ mt: 3, mb: 2, fontSize:'63px'}}
			>{isAuthenticated ? 'Wyloguj się' : 'Zaloguj się'}
			</Button>}
		  
		  {this.state.redirect ? <Navigate to='/login/' /> :''}
		</ThemeProvider>
	)};
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ logout })(Home);
//export default withStyles(useStyles)(Home)