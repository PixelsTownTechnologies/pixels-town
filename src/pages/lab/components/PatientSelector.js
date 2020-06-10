import React from 'react';
import backend from "../../../apis/backend";
import {PERMISSION_TYPE_DOCTOR} from "../../../components/operation/values";

class PatientSelector extends React.Component {

    state = {
        items: [],
        selectedItems: undefined,
        menuDisplay: "none",
        filterValue: "",
        oldSearch: " "
    };

    componentDidMount = async () => {
        const url = "/user/" + this.props.user.id + "/get_patients/?search=" + this.state.filterValue;
        const response = await backend.get(url);
        if (response.data.status_code === 200) {
            this.setState({items: response.data.data.users});
        }
    };

    searchAction = async () => {
        if (this.state.oldSearch === this.state.filterValue) {
            return undefined;
        }
        const url = "/user/" + this.props.user.id + "/get_patients/?search=" + this.state.filterValue;
        const response = await backend.get(url);
        if (response.data.status_code === 200) {
            this.setState({items: response.data.data.users, oldSearch: this.state.filterValue});
        }
    };

    selectAction = (item) => {
        const items = this.state.items.filter(function (value, index, arr) {
            return value !== item;
        });
        if( this.state.selectedItems !== undefined){
            this.setState({selectedItems: item, items: [...items, this.state.selectedItems]});
        }else {
            this.setState({selectedItems: item, items: items});
        }
        if (this.props.pushSelected !== undefined) {
            this.props.pushSelected(item);
        }
    };

    unselectAction = (item) => {
        this.setState({items: [...this.state.items, item], selectedItems: undefined});
    };

    renderIconClass = (user) => {
        if (user.type.type === PERMISSION_TYPE_DOCTOR) {
            return "user md icon";
        } else {
            return "id badge icon";
        }
    };

    renderItems = () => {
        return this.state.items.map(item => {
            return (
                <div key={item.id} className="item" data-value="ax"
                     onClick={() => {
                         this.selectAction(item)
                     }}>
                    <i className={this.renderIconClass(item)}/>
                    {item.first_name} {item.last_name}
                    <div className="ui red horizontal label" style={{marginLeft: "10px"}}>{item.code}</div>
                </div>
            );
        });
    };

    renderSelectedItems = () => {
        if (this.state.selectedItems === undefined) {
            return undefined;
        }
        return (
            <div
                className="ui label transition visible"
                style={{display: "inline-block !important"}}>
                <i className={this.renderIconClass(this.state.selectedItems)}/>
                {this.state.selectedItems.first_name} {this.state.selectedItems.last_name}
                <i className="delete icon"
                   onClick={() => {
                       this.unselectAction(this.state.selectedItems)
                   }}/>
            </div>
        );

    };

    setDisplay = () => {
        if (this.state.menuDisplay === "none") {
            this.setState({menuDisplay: "block"});
        } else {
            this.setState({menuDisplay: "none"});
        }
    };

    //items, pushSelected, pushSearchValue,
    render() {
        return (
            <div className="ui fluid search selection dropdown active visible" onClick={this.setDisplay}>
                {this.renderSelectedItems()}
                <i className="dropdown icon"/>
                <input
                    className="search"
                    autoComplete="off"
                    tabIndex="0"
                    style={{width: "100px"}}
                    onChange={(e) => {
                        this.setState({filterValue: e.target.value});
                        this.searchAction();
                    }}
                    value={this.state.filterValue}
                />
                <div className="default text">Select patient</div>
                <div className="menu" style={{display: this.state.menuDisplay}}>
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

export default PatientSelector;