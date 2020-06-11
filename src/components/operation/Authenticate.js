import React from 'react';
import {connect} from "react-redux";
import {getUser, signIn} from "../../redux/actions/registration";
import {Redirect} from "react-router-dom";

class Authenticate extends React.Component {

    state = {
        debug: false,
        enableInstitution: false,
    };

    constructor(props) {
        super(props);
        this.props.getUser();
        if (this.props.user === undefined) {
            if (this.state.debug && this.state.enableInstitution) {
                this.props.signIn({
                    user: {
                        "id": 1,
                        "first_name": "zaid",
                        "second_name": "mazen",
                        "middle_name": "mohamad",
                        "last_name": "habiba",
                        "country": "PS",
                        "city": "nablus",
                        "street": "rafidia",
                        "type": {
                            "id": 4,
                            "type": "Doctor", //Supervisor, Patient, Doctor, Developer
                        },
                        "phone_number": "",
                        "gender": "m",
                        "email": "zaid-habiba@hotmail.com",
                        "photo": "/media/user_photos/k2_Ad5ic0X.jpg",
                        "birth_date": "1997-06-29",
                        "is_login": true,
                        "institution": {
                            "id": 10,
                            "type": {
                                "id": 3,
                                "type": "Software Company", // Software Company , Lab
                                "logo": "/media/institution_type_logo/kkk.jpg"
                            },
                            "name": "DNA Lab Adham",
                            "description": "In the world of photography, this approach doesn’t appear to be very common — at least as far as I can tell. Here, photographs are almost always taken as being in the driver’s seat, with text riding shotgun (at best). I think I can understand where that approach is coming from, given that if you’re a photographer it ought to all be about the pictures. Consequently, most photographic bodies of work contain either no text or if there is text then its role is very severely limited.",
                            "website": "https://cphmag.com/pictures-text/",
                            "email": "",
                            "photo": null,
                            "logo": "/media/company_logo/hospital-logo-template_1061-6_zZGgVEM.jpg",
                            "phone_number": "0597232334",
                            "create_date": "2019-10-05",
                            "country": "IL",
                            "city": "nablus",
                            "street": "nablus",
                            "manager": 1
                        }
                    }
                });
            }
            if (this.state.debug && !this.state.enableInstitution) {
                this.props.signIn({
                    user: {
                        "id": 1,
                        "first_name": "zaid",
                        "second_name": "mazen",
                        "middle_name": "mohamad",
                        "last_name": "habiba",
                        "country": "PS",
                        "city": "nablus",
                        "street": "rafidia",
                        "type": {
                            "id": 1,
                            "type": "Developer",
                            "logo": "/media/user_type_logo/5-gluepro-orange-and-grey-color-scheme.jpg"
                        },
                        "phone_number": "",
                        "gender": "m",
                        "email": "zaid-habiba@hotmail.com",
                        "photo": "/media/user_photos/k2_Ad5ic0X.jpg",
                        "birth_date": "1997-06-29",
                        "is_login": true,
                    }
                });
            }
        }
    }

    //Ato, Dto, AComponent, DComponent, loadData( user )
    render() {
        this.props.getUser();
        if (this.props.debug !== undefined && this.props.debug === true) {
            return null;
        }
        if (this.props.user !== undefined) {
            if (this.props.loadData !== undefined) {
                this.props.loadData(this.props.user);
            }
            if (this.props.AComponent !== undefined) {
                if (typeof (this.props.AComponent) === "function") {
                    return this.props.AComponent();
                }
                return this.props.AComponent;
            } else {
                return <Redirect to={this.props.Ato}/>
            }
        } else {
            if (this.props.DComponent !== undefined) {
                if (typeof (this.props.DComponent) === "function") {
                    return this.props.DComponent();
                }
                return this.props.DComponent;
            } else {
                return <Redirect to={this.props.Dto}/>
            }
        }
    }
}

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default connect(mapStateToProps, {getUser, signIn})(Authenticate);