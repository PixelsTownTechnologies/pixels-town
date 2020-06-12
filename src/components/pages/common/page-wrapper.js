import React from "react";
import Menu from "../../common/menu/menu";
import {Visibility, Modal} from "semantic-ui-react";

const menuItems = [
    {
        itemName: 'Templates',
        leftDirection: true,
        subHandle: (item) => {
            console.log(item)
        }
    }, {
        itemName: 'Projects',
        leftDirection: true,
        subHandle: (item) => {
            console.log(item)
        }
    }, {
        itemName: 'About',
        leftDirection: true,
        subHandle: (item) => {
            console.log(item)
        }
    }, {
        itemName: 'Sign-up',
        leftDirection: false,
        subHandle: (item) => {
            console.log(item)
        }
    }, {
        itemName: 'Login',
        leftDirection: false,
        subHandle: (item) => {
            console.log(item)
        }
    }
];

export class PageWrapper extends React.Component {

    renderSoonModal = () => {
        return (
            <Modal size={'mini'} open={this.props.open}>
                <Modal.Content>
                    <p>Sorry, This will available soon.</p>
                </Modal.Content>
            </Modal>
        );
    };

    visibilityHandler = (e, {calculations}) => {
        this.setState({
            width: calculations.width ? calculations.width : 0,
            height: calculations.height ? calculations.height : 0
        });
        if (this.props.onUpdate)
            this.props.onUpdate({calculations});
    };

    render() {
        return (
            <Visibility onUpdate={this.visibilityHandler}>
                {this.renderSoonModal()}
                <Menu items={menuItems}/>
                {this.props.children}
            </Visibility>
        );
    }

}