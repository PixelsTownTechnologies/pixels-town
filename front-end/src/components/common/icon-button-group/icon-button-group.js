import React from "react";
import {Container, Grid, Image} from "semantic-ui-react";
import '../../../resource/styles/general.css';


export function IconButtonGroup(props) {

    const items = props.items.map((item, index) => {
        return (
            <a href={item.to} key={index} className="link px-button square" onClick={item.handler ? item.handler : null}>
                <Image src={item.icon}/>
                <span>{item.text}</span>
            </a>
        );
    });

    return (
        <div>
            <Container className={props.className ? props.className : ''}>
                <Grid className="grid-button">
                    {items}
                </Grid>
            </Container>
        </div>
    );
}