import React from 'react';
import Row from "../../components/layout/Row";
import Column from "../../components/layout/Column";
import Padding from "../../components/basics/Padding";
import DropButton from "../../components/basics/DropButton";
import UserType from "../../components/operation/UserType";
import {Link} from "react-router-dom";
import user from '../../images/default-user.png';
import ImageURL from "../../apis/ImageURL";

class Bar extends React.Component {

    render() {
        return (
            <Row style={{backgroundColor: 'rgba(120,197,184,1)'}}>
                <Column size={2}>
                        <img className="ui circular image"
                             src={ImageURL + this.props.user.photo}
                             alt="user"
                             style={{marginLeft: "20%", width: "60px", height: "60px", border: "#f1f2f5 2px solid"}}
                        />

                </Column>
                <Column size={3} style={{marginLeft: "-4%", marginTop: "8px"}}>
                    <Row><h2>{this.props.user.first_name + " " + this.props.user.last_name}</h2></Row>
                    <Row><h4 style={{color: "#222"}}>{this.props.user.email}</h4></Row>
                </Column>
                <Column size={9}/>
                <Column size={1}>
                    <Padding size={1}/>
                    <UserType
                        asFunction={true}
                        supervisor={
                            () => {
                                if (this.props.user.institution === undefined) {
                                    return (
                                        <DropButton text="More"
                                                    style={{
                                                        width: "100px",
                                                        marginLeft: "60px",
                                                        marginTop: "10px"
                                                    }}>
                                            <Link to="/create-hospital" className="item"><i
                                                className="hospital icon"/>Create
                                                Hospital</Link>
                                            <Link to="/create-lab" className="item"><i className="dna icon"/>Create
                                                Lab</Link>
                                        </DropButton>
                                    );
                                } else {
                                    return <div/>;
                                }
                            }}
                        developer={
                            () => {
                                if (this.props.user.institution === undefined) {
                                    return (
                                        <DropButton text="More"
                                                    style={{
                                                        width: "100px",
                                                        marginLeft: "60px",
                                                        marginTop: "10px"
                                                    }}>
                                            <Link to="/create-software-company" className="item"><i
                                                className="building icon"/>Create
                                                Company</Link>
                                        </DropButton>
                                    );
                                } else {
                                    return <div/>;
                                }
                            }
                        }
                        doctor={
                            () => {
                                return (
                                    <DropButton text="More"
                                                style={{
                                                    width: "100px",
                                                    marginLeft: "60px",
                                                    marginTop: "10px"
                                                }}>
                                        <Link to="/join-hospital" className="item"><i
                                            className="first aid icon"/>Join
                                            Hospital</Link>
                                    </DropButton>
                                );
                            }
                        }
                        patient={
                            <div/>
                        }
                        none={
                            <div/>
                        }/>

                </Column>
            </Row>
        )
            ;
    }

}

export default Bar;