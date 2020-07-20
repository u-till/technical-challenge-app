import React, {useEffect} from 'react';
import {connect} from 'react-redux';

export default WrappedComponent => {
    const AuthComponent = (props) => {
        const {authenticated, history, location, userObj} = props;

        useEffect(() => {
            const userRedirect = () => {
                console.log('authenticated>', authenticated);
                console.log('userObj>', userObj);
                if (!authenticated || !userObj) {
                    history.push('/login');
                }
            };

            userRedirect()
        }, [authenticated, history, location]);

        return <WrappedComponent {...props} />
    }

    const mapStateToProps = state => {
        return {
            authenticated: state.authReducer.authenticated,
            userObj: state.authReducer.userObj
        }
    };
    return connect(mapStateToProps)(AuthComponent);
}