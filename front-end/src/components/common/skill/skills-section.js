import React from "react";
import {Grid, Item} from "semantic-ui-react";
import './skill-section.css';

class SkillsSection extends React.Component {

    renderItems = () => {
        const items = this.props.items.map((skill, key) => {
            const computerGridSize = ((key - 1) % 3 === 0 ? 6 : 5);
            return (
                <Grid.Column key={key} mobile={16} tablet={8} computer={computerGridSize}>
                    <Item className="skill-item">
                        <div className="image-content">
                            <Item.Image size='tiny' src={skill.image}/>
                        </div>
                        <Item.Content className="skill-item-content">
                            <Item.Header className="header">{skill.name}</Item.Header>
                            <Item.Description>
                                <p>{skill.description}</p>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Grid.Column>
            );
        });
        return (items.length - 1) % 3 === 0 ? [
            ...items.slice(0, items.length - 1),
            <Grid.Column computer={5} key={items.length + 1}>
            </Grid.Column>
            , items.slice(items.length - 1, items.length)
        ] : items
    };

    render() {
        return (
            <Item.Group>
                <Grid>
                    {this.renderItems()}
                </Grid>
            </Item.Group>
        );
    }
}

export default SkillsSection;