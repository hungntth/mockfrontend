import React,{Component, PropTypes} from "react";

export default class SignOut extends Component{
    render(){
        const {onLogoutClick} = this.props

        return (
            (onLogoutClick())
        )
    }
}

Logout.propTypes = {
    onLogoutClick: PropTypes.func.isRequired
}