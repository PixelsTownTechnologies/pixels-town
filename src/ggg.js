import React from 'react';
import './itemView.css';
import itemApi from "../../apis/item";

class ItemView extends React.Component {

    state = {
        item: undefined,
        dataLoad: false,
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            this.setState({dataLoad: true});
            const URL = "/default/jstasks/item?id=" + this.props.id;
            itemApi.get(URL).then(response => {
                this.setState({item: response.data, dataLoad: false});
            });
        }
    }

    renderContent = () => {
        if (this.state.dataLoad) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        }
        if (this.state.item === undefined) {
            return (
                <div className="ui center aligned  segment i">
                    <div className="ui header">
                        Select item to view
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ui center aligned  segment i">
                    <div className="ui medium image">
                        <img src={this.state.item.picture} alt="item image"/>
                    </div>
                    <div className="content">
                        <div className="ui header">{this.state.item.title}</div>
                        <div className="description">
                            {this.state.item.desc}
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="ui  segment">
                <h2 className="ui header">Item</h2>
                {this.renderContent()}
            </div>
        );
    }
}

export default ItemView;

