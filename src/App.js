import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Games, Login } from './pages'
import GameCreate from './pages/GameCreate';
import GameDetail from './pages/GameDetail';
import './App.css'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import NotificationIcon from '@material-ui/icons/NotificationsNone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import NoticeIcon from '@material-ui/icons/ErrorOutline';

import GameIcon from '@material-ui/icons/VideogameAsset';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

const my_theme = createMuiTheme({
    palette: {
      primary: {
        light:'#eb4387',
        main: '#E71469',
        dark: '#a10e49',
        contrastText: '#FFFFFF'
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      typography: {
        useNextVariants: true,
      },
      // error: will use the default color
    },
});

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
		height: '100%'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		}
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	menuButton: {
		marginRight: 20,
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		/*
		[theme.breakpoints.down('sm')]: {
			width: `100%`,
		},
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
		*/
		width: 100
	},
});

class ResponsiveDrawer extends React.Component {
	state = {
		mobileOpen: false
	};

	handleDrawerToggle = () => {
		this.setState(state => ({ mobileOpen: !state.mobileOpen }));
	};

	render() {
		const { classes, theme } = this.props;

		const drawer = (
			<div>
				<div className={classes.toolbar}></div>
				<Divider />
				<List>
					<ListItem button key='Games' component={Link} to="/games">
						<ListItemIcon>
							<GameIcon />
						</ListItemIcon>
						<ListItemText primary='Games'/>
					</ListItem>
					<ListItem button key='Push Notification' component={Link} to="/notification">
						<ListItemIcon>
							<NotificationIcon />
						</ListItemIcon>
						<ListItemText primary='Push Notification' />
					</ListItem>
					<ListItem button key='Q&A' component={Link} to="/qna">
						<ListItemIcon>
							<QuestionAnswerIcon />
						</ListItemIcon>
						<ListItemText primary='Q&A' />
					</ListItem>
					<ListItem button key='Notice' component={Link} to="/notice">
						<ListItemIcon>
							<NoticeIcon />
						</ListItemIcon>
						<ListItemText primary='Notice' />
					</ListItem>
				</List>
			</div>
		);
		return (
			<div className={classes.root}>
				<Router>
					<MuiThemeProvider theme={my_theme}>
						<CssBaseline />
						<AppBar position="fixed" className={classes.appBar} color='white'>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={this.handleDrawerToggle}
								className={classes.menuButton}
							>
							<MenuIcon />
							</IconButton>
						</Toolbar>
						</AppBar>
						<nav className={classes.drawer}>
						{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
						<Hidden smUp implementation="css">
							<Drawer
								container={this.props.container}
								variant="temporary"
								anchor={theme.direction === 'rtl' ? 'right' : 'left'}
								open={this.state.mobileOpen}
								onClose={this.handleDrawerToggle}
								classes={{
									paper: classes.drawerPaper,
								}}
							>
							{drawer}
							</Drawer>
						</Hidden>
						<Hidden xsDown implementation="css">
							<Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open >
								{drawer}
							</Drawer>
						</Hidden>
						</nav>
						<main className={classes.content}>
							<div className={classes.toolbar} />
								<Switch>
									<Route exact path='/' component={Home} />
									<Route exact path='/login' component={Login} />
									<Route exact path='/games' component={Games} />
									<Route path='/games/create' component={GameCreate} />
									<Route path='/games/:id' component={GameDetail} />
								</Switch>
						</main>
					</MuiThemeProvider>
				</Router>
			</div>
		);
  	}
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);