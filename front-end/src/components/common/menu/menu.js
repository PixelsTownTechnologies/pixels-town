import React from "react";
import {Container, Dropdown, Menu as SMenu, Responsive} from "semantic-ui-react";
import {PixelsTownMenuItemName} from "../site/name/site-name";
import './menu.css';
import SoonModel from "../models/soon/soon";

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: props.items && props.items.filter(item => item.isSelected).length > 0 ? props.items.filter(item => item.isSelected)[0] : [],
            items: props.items,
            showSoon: false
        };
    }

    handleItemMenuSelected = (e, item) => {
        this.setState({selectedItem: item, showSoon: true});
        if (item && item.subHandle) {
            item.subHandle(item);
        }
    };

    renderLeftMenuItems = () => {
        return this.state.items ? this.state.items.filter(item => item.leftDirection).map((item, key) => {
            return (
                <SMenu.Item
                    key={key}
                    name={item.itemName}
                    active={this.state.selectedItem === item}
                    onClick={e => this.handleItemMenuSelected(e, item)}
                />
            );
        }) : [];
    };

    renderRightMenuItems = () => {
        return this.state.items ? this.state.items.filter(item => !item.leftDirection).map((item, key) => {
            return (
                <SMenu.Item
                    key={key}
                    name={item.itemName}
                    active={this.state.selectedItem === item}
                    onClick={e => this.handleItemMenuSelected(e, item)}
                />
            );
        }) : [];
    };

    renderMobileMenuItems = () => {
        return this.state.items ? this.state.items.map((item, key) => {
            return (
                <Dropdown.Item key={key} name={item.itemName}
                               active={this.state.selectedItem === item}
                               onClick={e => this.handleItemMenuSelected(e, item)}>{item.itemName}</Dropdown.Item>
            );
        }) : [];
    };

    render() {
        return (
            <div>
                <SoonModel open={this.state.showSoon} change={(value) => {
                    this.setState({showSoon: value})
                }}/>
                <Responsive {...Responsive.onlyComputer}>
                    <SMenu
                        secondary
                        fixed='top'
                        size='large'
                        className={this.props.fixed ? 'border-menu' : 'border-menu unfixed-menu'}
                    >
                        <Container>
                            <PixelsTownMenuItemName/>
                            {this.renderLeftMenuItems()}
                            <SMenu.Menu position='right'>
                                {this.renderRightMenuItems()}
                            </SMenu.Menu>
                        </Container>
                    </SMenu>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <SMenu
                        secondary
                        fixed='top'
                        size='large'
                        className={this.props.fixed ? 'border-menu' : 'border-menu unfixed-menu'}
                    >
                        <Container>
                            <PixelsTownMenuItemName/>
                            <SMenu.Menu position='right'>
                                <Dropdown button
                                          className='icon' icon='bars' item>
                                    <Dropdown.Menu>
                                        {this.renderMobileMenuItems()}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </SMenu.Menu>
                        </Container>
                    </SMenu>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <SMenu
                        secondary
                        fixed='top'
                        size='large'
                        className={this.props.fixed ? 'border-menu' : 'border-menu unfixed-menu'}
                    >
                        <Container>
                            <PixelsTownMenuItemName/>
                            <SMenu.Menu position='right'>
                                <Dropdown item text='More'>
                                    <Dropdown.Menu>
                                        {this.renderMobileMenuItems()}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </SMenu.Menu>
                        </Container>
                    </SMenu>
                </Responsive>
            </div>
        );
    }

}

export default Menu;