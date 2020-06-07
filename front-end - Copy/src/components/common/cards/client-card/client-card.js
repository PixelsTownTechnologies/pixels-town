import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import './client-card.css';

const ClientCard = (props) => (
    <Card className="client-card clear-border">
        <Image src={props.image} wrapped ui={false}/>
        <Card.Content className="clear-border">
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.date}</span>
            </Card.Meta>
            <Card.Description>
                {props.description}
            </Card.Description>
        </Card.Content>
    </Card>
);

export default ClientCard;