import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, withRouter, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import Async from 'react-code-splitting';
import Nav from 'components/Nav/Nav';
import { tryGetUser } from 'actions/auth'

require('./app.scss');

const Landing = () => <Async load={import('components/Landing/Landing')} />;
const Login = () => <Async load={import('components/Login/Login')} />;
const Register = () => <Async load={import('components/Register/Register')} />;
const Feed = () => <Async load={import('components/Feed/Feed')} />;
const Settings = () => <Async load={import('components/Settings/Settings')} />;
const TwitterCallback = () => <Async load={import('components/TwitterCallback/TwitterCallback')} />;
const NoMatch = () => <Async load={import('components/NoMatch/NoMatch')} />;


const propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

class App extends Component {
    componentWillMount() {
        this.props.dispatch(tryGetUser());
    }


    render() {
    	const Home = this.props.auth.isAuthenticated ? Feed : Landing;
        return (
			<div>
				<Helmet>
					<title>Silica</title>
					<meta name="description" content="A Site for Silica" />
				</Helmet>

				<Nav />

				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/feed" component={Feed} />
					<Route path="/settings" component={Settings} />
					<Route path="/twitter_callback" component={TwitterCallback} />
					<Route path="/api/:function"/>
					<Route path="*/" component={NoMatch} />
				</Switch>
			</div>
        );
    }
}

App.propTypes = propTypes;

export default withRouter(connect(state=> ({ auth: state.auth }))(App));