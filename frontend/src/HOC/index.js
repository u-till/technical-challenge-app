import React, {useEffect} from 'react';
import {connect} from 'react-redux';

export default WrappedComponent => {
    const AuthComponent = (props) => {
        const {authenticated, history, location} = props;

        useEffect(() => {
            const userRedirect = () => {
                if (!authenticated) {
                    history.push('/login');
                }
            };

            userRedirect()
        }, [authenticated, history, location]);

        return <WrappedComponent {...props} />
    }

    const mapStateToProps = state => {
        return {
            authenticated: state.authReducer.authenticated
        }
    };
    return connect(mapStateToProps)(AuthComponent);
}