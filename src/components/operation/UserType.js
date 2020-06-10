import React from 'react';
import {
    PERMISSION_TYPE_DEVELOPER,
    PERMISSION_TYPE_DOCTOR,
    PERMISSION_TYPE_PATIENT,
    PERMISSION_TYPE_SUPERVISOR
} from "./values";
import {connect} from "react-redux";
import {getUser} from "../../redux/actions/registration";

class UserType extends React.Component {

    constructor(props) {
        super(props);
        this.props.getUser();
    }

    //user <= , patient, doctor, developer, none, asFunction
    render() {
        try {
            if (this.props.asFunction) {
                if (this.props.user.type.type === PERMISSION_TYPE_DOCTOR) {
                    return this.props.doctor();
                } else if (this.props.user.type.type === PERMISSION_TYPE_PATIENT) {
                    return this.props.patient();
                } else if (this.props.user.type.type === PERMISSION_TYPE_SUPERVISOR) {
                    return this.props.supervisor();
                } else if (this.props.user.type.type === PERMISSION_TYPE_DEVELOPER) {
                    return this.props.developer();
                }
                return this.props.none;
            } else {
                if (this.props.user.type.type === PERMISSION_TYPE_DOCTOR) {
                    return this.props.doctor;
                } else if (this.props.user.type.type === PERMISSION_TYPE_PATIENT) {
                    return this.props.patient;
                } else if (this.props.user.type.type === PERMISSION_TYPE_SUPERVISOR) {
                    return this.props.supervisor;
                } else if (this.props.user.type.type === PERMISSION_TYPE_DEVELOPER) {
                    return this.props.developer;
                }
                return this.props.none;
            }
        } catch (e) {
            return this.props.none;
        }

    }
}

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default connect(mapStateToProps, {getUser})(UserType);