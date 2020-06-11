import React from "react";
import Authenticate from "../components/operation/Authenticate";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/registration";
import {addModelsStore, getModelsStore, clearModels} from "../redux/actions/models";
import UserType from "../components/operation/UserType";
import {Link, Redirect} from "react-router-dom";
import UserMenu from "./UserMenu";
import Grid from "../components/layout/Grid";
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";
import ModelSellCard from "../components/card/ModelSellCard";
import Padding from "../components/basics/Padding";
import backend from "../apis/backend";
import ViewModelDimmer from "../components/basics/ViewModelDimmer";
import {MODEL_STORE_INITIAL_VALUE} from "../redux/InitialValues";

class ModelStore extends React.Component {

    state = {
        searchValue: "",
        selectModel: undefined,
        viewAction: false,
        pageLoading: false,
    };

    constructor(props) {
        super(props);
        this.props.getUser();
        this.props.getModelsStore();
    }


    viewButtonAction = (model) => {
        this.setState({selectModel: model, viewAction: true});
    };

    componentDidMount = async () => {
        if(this.props.user === undefined){
            return undefined;
        }
        if (this.props.models === MODEL_STORE_INITIAL_VALUE) {
            const url = "/user/" + this.props.user.id + "/fetch_models";
            const response = await backend.get(url, {search: this.state.searchValue});
            if (response.data.status_code === 200) {
                this.props.addModelsStore(response.data.data.models);

            }
        }
        this.setState({pageLoading: true});
    };

    renderModels = () => {
        return this.props.models.map((item, key) => {
            return (
                <Column key={key} size={5}>
                    <Padding repeat={2}/>
                    <ModelSellCard
                        model={item}
                        buyButtonAction={() => {
                            this.viewButtonAction(item);
                        }}
                        viewButtonAction={() => {
                            this.viewButtonAction(item);
                        }}
                    />
                </Column>
            );
        });

    };

    componentSiteBar = () => {
        return (
            <div className="ui vertical menu">
                <div className="item">
                    <div className="header">Top 5 sellers company</div>
                    <div className="menu">
                        <Link to="" className="item">TackleLabs</Link>
                        <Link to="" className="item">GBASOFT</Link>
                        <Link to="" className="item">VisualDx</Link>
                        <Link to="" className="item">Skeleton X</Link>
                        <Link to="" className="item">Skin vision</Link>
                    </div>
                </div>
                <div className="item">
                    <div className="header">Request Cost</div>
                    <div className="menu">
                        <Link to="" className="item"> Up to 50$ </Link>
                        <Link to="" className="item">50$ - 20$</Link>
                        <Link to="" className="item">20$ - 5$</Link>
                        <Link to="" className="item">Less than 5$</Link>
                        <Link to="" className="item">Free</Link>
                    </div>
                </div>
                <div className="item">
                    <div className="header">Model types</div>
                    <div className="menu">
                        <Link to="" className="item">X Ray</Link>
                        <Link to="" className="item">Skin</Link>
                        <Link to="" className="item">Brain</Link>
                        <Link to="" className="item">Chest</Link>
                        <Link to="" className="item">Bones</Link>
                        <Link to="" className="item">Others</Link>
                    </div>
                </div>
                <div className="item">
                    <div className="header">User type</div>
                    <div className="menu">
                        <Link to="" className="item">Patient</Link>
                        <Link to="" className="item">Doctor</Link>
                        <Link to="" className="item">Lab</Link>
                    </div>
                </div>
            </div>
        );
    };

    componentSearch = () => {
        return (
            <div className="ui action input" style={{width: "100%"}}>
                <input type="text" placeholder="Search..."/>
                <button className="ui icon button">
                    <i className="search icon"/>
                </button>
            </div>
        );
    };

    componentCardView = () => {
        if (!this.state.pageLoading) {
            return (
                <div>
                    <div className="ui large active text loader">Loading</div>
                </div>
            );
        }
        return (
            <Grid>
                <Row>
                    {this.renderModels()}
                </Row>
            </Grid>
        );
    };

    renderDimmer = () => {
        if (this.state.viewAction) {
            return (
                <ViewModelDimmer
                    model={this.state.selectModel}
                    active={this.state.viewAction}
                    reset={() => {
                        this.setState({viewAction: false})
                    }}
                    user={this.props.user}
                    recallBuyAction={()=>{this.props.clearModels()}}
                />
            );
        }

    };

    renderPage = () => {
        return (
            <Grid>
                <Row/><Row/><Row/>
                <Row>
                    <Column size={2} style={{marginLeft: "2.5%"}}>
                        {this.componentSiteBar()}
                    </Column>
                    <Column size={1}/>
                    <Column size={11}>
                        {this.componentSearch()}
                        {this.componentCardView()}
                    </Column>
                    <Column size={1}/>
                </Row>
                {this.renderDimmer()}
            </Grid>

        );
    };

    render() {
        return (
            <Authenticate
                AComponent={
                    <UserType
                        doctor={
                            <div style={{backgroundColor: "#f1f2f5"}}>
                                <UserMenu/>
                                {this.renderPage()}
                            </div>
                        }
                        patient={
                            <div style={{backgroundColor: "#f1f2f5"}}>
                                <UserMenu/>
                                {this.renderPage()}
                            </div>
                        }
                        supervisor={
                            <div style={{backgroundColor: "#f1f2f5"}}>
                                <UserMenu/>
                                {this.renderPage()}
                            </div>
                        }
                        developer={
                            <Redirect to="/"/>
                        }
                        none={
                            <Redirect to="/"/>
                        }
                    />
                }
                Dto="/"
            />
        );
    }

}

const mapStateToProps = state => {
    return {user: state.user.user, models: state.model.modelsStore};
};

export default connect(mapStateToProps, {getUser, getModelsStore, addModelsStore,clearModels})(ModelStore);