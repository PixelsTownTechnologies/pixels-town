import React from 'react';
import Dimmer from "./Dimmer";
import Container from "../layout/Container";
import Grid from "../layout/Grid";
import Row from "../layout/Row";
import ImageURL from "../../apis/ImageURL";
import "../../styles/wave.css";
import Column from "../layout/Column";
import Field from "./Field";
import Button from "./Button";
import backend from "../../apis/backend";
import ImageSlider from "./ImageSlider";

class ViewModelDimmer extends React.Component {

    state = {
        requestValue: 1,
        incClasses: "plus square icon",
        decClasses: "minus square icon",
        isImageFetched: false,
        imagesList: [],
    };

    buyAction = async (request_number, free = false) => {
        var url = "/user/" + this.props.user.id + "/create_subscription/";
        var formData = new FormData();
        formData.append("user", this.props.user.id);
        formData.append("model", this.props.model.id);
        formData.append("number_of_request", request_number);
        formData.append("is_free", free);

        var response = await backend.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.status_code === 200) {
            this.setState({isImageFetched: false, imagesList: [], requestValue: 0});
            this.props.reset();
            this.props.recallBuyAction();
        }
    };

    getCostOfRequest = (numberOfRequest) => {
        if (this.props.model.discount_rate < 0 || this.props.model.discount_rate > numberOfRequest || this.props.model.discount_percentage === 0) {
            return (this.props.model.request_cost * numberOfRequest);
        }
        const cost = (this.props.model.request_cost * numberOfRequest) - (((this.props.model.discount_percentage * numberOfRequest)
            / (this.props.model.discount_rate * 100)) * this.props.model.request_cost * numberOfRequest).toFixed(2);
        if (cost < 0) {
            return 0;
        } else {
            return cost;
        }
    };

    renderCost = (numberOfRequest, hanse = false) => {
        if (this.props.model.discount_rate > numberOfRequest || this.props.model.discount_percentage === 0) {
            return (
                <span>
                 {this.getCostOfRequest(numberOfRequest).toFixed(2)}
                </span>
            );
        }
        if (hanse) {
            return (
                <span>
                 {this.getCostOfRequest(numberOfRequest).toFixed(2)}
                    <span style={{
                        fontSize: "0.6em",
                        marginButton: "10px",
                        marginLeft: "5px",
                        textDecoration: "line-through"
                    }}>{(this.props.model.request_cost * numberOfRequest).toFixed(2)}</span>
             </span>
            );
        }
        return (
            <span>
                 {this.getCostOfRequest(numberOfRequest)}
                <span style={{
                    fontSize: "0.6em",
                    marginButton: "10px",
                    marginLeft: "5px",
                    textDecoration: "line-through"
                }}>{(this.props.model.request_cost * numberOfRequest)}</span>
             </span>
        );
    };

    fetchImages = async () => {
        const url = "/user/" + this.props.user.id + "/fetch_model_images/" + this.props.model.id;

        var response = await backend.get(url);

        if (response.data.status_code === 200) {
            this.setState({imagesList: response.data.data.images, isImageFetched: true});
        }
    };

    componentPlans = () => {
        const plants = [];
        if (this.props.model.free_request > 0) {
            plants.push(<Row>
                <div className="ui form" style={{width: "100%"}}>
                    <div className="ui segment">
                        <Grid style={{width: "100%"}}>
                            <Row style={{width: "100%"}}>
                                <Column size={6}>
                                    <Field style={{marginTop: "7px"}}>
                                        <span
                                            style={{
                                                fontSize: "1.6em",
                                                color: "black",
                                                padding: "10px",
                                                userSelect: "none",
                                                marginTop: "10px",
                                            }}
                                        >Get up to {this.props.model.free_request} free requests </span>
                                    </Field>
                                </Column>
                                <Column size={7}/>
                                <Column size={3}>
                                    <Button text="Get" onClick={() => {
                                        this.buyAction(this.props.model.free_request, true)
                                    }}/>
                                </Column>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </Row>);
        }
        plants.push(<Row>
            <div className="ui form" style={{width: "100%"}}>
                <div className="ui segment">
                    <div className="ui left corner label">
                        <i className="star icon" style={{color: "gold"}}/>
                    </div>
                    <Grid style={{width: "100%"}}>
                        <Row style={{width: "100%"}}>
                            <Column size={4}>
                                <Field>
                                                <span style={{fontSize: "2.2em", color: "black"}}>
                                                    <i className="dollar sign icon"
                                                       style={{
                                                           fontSize: "1.2em",
                                                           paddingLeft: "20px",
                                                           marginLeft: "-5%",

                                                       }}/>
                                                    {this.renderCost(15)}
                                                </span>
                                </Field>
                            </Column>
                            <Column size={9}>
                                <Field style={{marginTop: "7px"}}>
                                                    <span style={{
                                                        fontSize: "1.7em",
                                                        color: "black",
                                                        padding: "10px",
                                                        userSelect: "none"
                                                    }}>15 Requests</span>
                                </Field>
                            </Column>
                            <Column size={3}>
                                <Button text="Buy" onClick={() => {
                                    this.buyAction(15)
                                }}/>
                            </Column>
                        </Row>
                    </Grid>
                </div>
            </div>
        </Row>);
        plants.push(<Row>
            <div className="ui form" style={{width: "100%"}}>
                <div className="ui segment">
                    <div className="ui left corner label">
                        <i className="star icon" style={{color: "gold"}}/>
                    </div>
                    <Grid style={{width: "100%"}}>
                        <Row style={{width: "100%"}}>
                            <Column size={4}>
                                <Field>
                                    <span style={{fontSize: "2.2em", color: "black"}}>
                                        <i className="dollar sign icon"
                                           style={{
                                               fontSize: "1.2em",
                                               paddingLeft: "20px",
                                               marginLeft: "-5%",
                                           }}/>
                                        {this.renderCost(50)}
                                    </span>
                                </Field>
                            </Column>
                            <Column size={9}>
                                <Field style={{marginTop: "7px"}}>
                                                    <span style={{
                                                        fontSize: "1.7em",
                                                        color: "black",
                                                        padding: "10px",
                                                        userSelect: "none"
                                                    }}>50 Requests</span>

                                </Field>
                            </Column>
                            <Column size={3}>
                                <Button text="Buy" onClick={() => {
                                    this.buyAction(50)
                                }}/>
                            </Column>
                        </Row>
                    </Grid>
                </div>
            </div>
        </Row>);
        plants.push(<Row>
            <div className="ui form" style={{width: "100%"}}>
                <div className="ui segment">
                    <Grid style={{width: "100%"}}>
                        <Row style={{width: "100%"}}>
                            <Column size={4}>
                                <Field>
                                                <span style={{fontSize: "2.2em", color: "black"}}>
                                                    <i className="dollar sign icon"
                                                       style={{
                                                           fontSize: "1.2em",
                                                           paddingLeft: "20px",
                                                           marginLeft: "-5%",

                                                       }}/>
                                                    {this.renderCost(100)}
                                                </span>
                                </Field>
                            </Column>
                            <Column size={9}>
                                <Field style={{marginTop: "7px"}}>
                                                    <span style={{
                                                        fontSize: "1.7em",
                                                        color: "black",
                                                        padding: "10px",
                                                        userSelect: "none"
                                                    }}>100 Requests</span>
                                </Field>
                            </Column>
                            <Column size={3}>
                                <Button text="Buy" onClick={() => {
                                    this.buyAction(100)
                                }}/>
                            </Column>
                        </Row>
                    </Grid>
                </div>
            </div>
        </Row>);
        plants.push(<Row>
            <div className="ui form" style={{width: "100%"}}>
                <div className="ui segment">
                    <Grid style={{width: "100%"}}>
                        <Row style={{width: "100%"}}>
                            <Column size={4}>
                                <Field>
                                                <span style={{fontSize: "2.2em", color: "black"}}>
                                                    <i className="dollar sign icon"
                                                       style={{
                                                           fontSize: "1.2em",
                                                           paddingLeft: "20px",
                                                           marginLeft: "-5%",

                                                       }}/>
                                                    {this.renderCost(500)}
                                                </span>
                                </Field>
                            </Column>
                            <Column size={9}>
                                <Field style={{marginTop: "7px"}}>
                                                    <span style={{
                                                        fontSize: "1.7em",
                                                        color: "black",
                                                        padding: "10px",
                                                        userSelect: "none"
                                                    }}>500 Requests</span>
                                </Field>
                            </Column>
                            <Column size={3}>
                                <Button text="Buy" onClick={() => {
                                    this.buyAction(500)
                                }}/>
                            </Column>
                        </Row>
                    </Grid>
                </div>
            </div>
        </Row>);
        plants.push(<Row>
            <div className="ui form" style={{width: "100%"}}>
                <div className="ui segment">
                    <Grid style={{width: "100%"}}>
                        <Row style={{width: "100%"}}>
                            <Column size={4}>
                                <Field>
                                    <span style={{fontSize: "2.2em", color: "black"}}>
                                        <i className="dollar sign icon"
                                           style={{
                                               fontSize: "1.2em",
                                               paddingLeft: "20px",
                                               marginLeft: "-5%",

                                           }}/>
                                        {this.renderCost(this.state.requestValue, true)}
                                    </span>
                                </Field>
                            </Column>
                            <Column size={9}>
                                <div className={"ui field"} style={{marginTop: "7px"}}>
                                    <i className={this.state.incClasses}
                                       style={{color: "black", fontSize: "1.5em", cursor: "pointer"}}
                                       onMouseOver={() => {
                                           this.setState({incClasses: "plus square outline icon"})
                                       }}
                                       onMouseLeave={() => {
                                           this.setState({incClasses: "plus square icon"})
                                       }}
                                       onClick={() => {
                                           this.setState({requestValue: this.state.requestValue + 1})
                                       }}
                                    />
                                    <input
                                        style={{
                                            fontSize: "1.2em",
                                            color: "black",
                                            padding: "10px",
                                            userSelect: "none",
                                            width: "50px",
                                            height: "20px",
                                            textAlign: "center",
                                        }}
                                        min="0"
                                        value={this.state.requestValue}
                                        onChange={(e) => {
                                            this.setState({requestValue: parseInt(e.target.value)})
                                        }}
                                    />
                                    <i className={this.state.decClasses}
                                       style={{color: "black", fontSize: "1.5em", cursor: "pointer"}}
                                       onMouseOver={() => {
                                           this.setState({decClasses: "minus square outline icon"})
                                       }}
                                       onMouseLeave={() => {
                                           this.setState({decClasses: "minus square icon"})
                                       }}
                                       onClick={() => {
                                           if (this.state.requestValue > 0) {
                                               this.setState({requestValue: this.state.requestValue - 1})
                                           }
                                       }}
                                    />
                                </div>
                            </Column>
                            <Column size={3}>
                                <Button text="Buy" onClick={() => {
                                    this.buyAction(this.state.requestValue)
                                }}/>
                            </Column>
                        </Row>
                    </Grid>
                </div>
            </div>
        </Row>);
        return plants;
    };

    render() {
        console.log(this.state);
        if (this.props.model === undefined) {
            return <div/>;
        }
        if (!this.state.isImageFetched) {
            this.fetchImages();
        }
        return (
            <Dimmer active={this.props.active} reset={() => {
                this.props.reset();
                this.setState({isImageFetched: false, imagesList: []});
            }} width={80} style={{backgroundColor: "#fafafa"}}>
                <Container>
                    <Grid>
                        <Row>
                            <Column size={4}/>
                            <Column size={6}>
                                <img
                                    className="ui centered medium image"
                                    alt="model"
                                    src={ImageURL + this.props.model.logo}
                                    style={{
                                        border: "7px solid #00A79E",
                                        borderRadius: "10% 30% 50% 70%",
                                        boxShadow: "3px 3px 6px 6px #55555544",
                                        minWidth: "220px",
                                        marginLeft: "60px"
                                    }}
                                />
                            </Column>
                            <Column size={4}/>
                        </Row>
                        <Row style={{width: "100%"}}>
                            <Column size={6}/>
                            <Column size={4}
                                    style={{
                                        color: "black",
                                        fontSize: "1.8em",
                                        textAlign: "center"
                                    }}>
                                {this.props.model.name}
                            </Column>
                            <Column size={6}/>
                        </Row>
                        <Row/><Row/>
                        <h4 className="ui horizontal divider header">
                            <i className="tag icon"/>
                            Description
                        </h4>
                        <Row style={{width: "100%"}}>
                            <Column size={16}
                                    style={{
                                        color: "black",
                                    }}>
                                <textarea value={this.props.model.description}
                                          style={{border: "none", background: "#fafafa"}}/>
                            </Column>
                        </Row>
                        <Row/><Row/>
                        <h4 className="ui horizontal divider header">
                            <i className="images outline icon"/>
                            Images
                        </h4>
                        <Row/>
                        <ImageSlider imagesList={this.state.imagesList}/>
                        <Row/><Row/>
                        <h4 className="ui horizontal divider header">
                            <i className="cubes icon"/>
                            Model plans
                        </h4>
                        <Row/>
                        {this.componentPlans()}
                        <Row/> <Row/> <Row/>
                    </Grid>
                </Container>
            </Dimmer>
        );
    }

}

export default ViewModelDimmer;