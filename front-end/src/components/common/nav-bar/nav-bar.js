import React from "react";
import {Container, Grid, Header, List, Segment} from 'semantic-ui-react';


const NavBarData = [
    {
        header: 'ABOUT',
        items: [
            {
                name: 'Freelancer',
                link: 'https://www.freelancer.com/u/PixelsTown'
            }, {
                name: 'UpWork',
                link: ''
            }, {
                name: 'LinkIn',
                link: 'https://www.linkedin.com/company/pixelstown-technologies'
            }, {
                name: 'FaceBook',
                link: ''
            }
        ]
    }, {
        header: 'PRODUCTS',
        items: [
            {
                name: 'TackleLabs',
                link: ''
            }, {
                name: 'PICBYPIC',
                link: ''
            }, {
                name: 'MICROPIC',
                link: ''
            }, {
                name: 'PixelsTown',
                link: 'https://www.pixelstown.com'
            }, {
                name: 'ForAll website',
                link: ''
            }, {
                name: 'Just Now website',
                link: ''
            }, {
                name: 'Model Hub',
                link: ''
            }
        ]
    },
    {
        header: 'SERVICES',
        items: [{
            name: 'Website Design',
            link: ''
        }, {
            name: 'Mobile Application',
            link: ''
        }, {
            name: 'Full-Stack Development',
            link: ''
        }, {
            name: 'Front-End Development',
            link: ''
        }, {
            name: 'Back-End Development',
            link: ''
        }]
    }
];

function NavBarPart(props) {
    const items = props.items.map((i, key) => {
        return (
            <List.Item key={key} as='a' href={i.link}>{i.name}</List.Item>
        );
    });
    return (
        <Grid.Column width={3}>
            <Header inverted as='h4' content={props.header}/>
            <List link inverted>
                {items}
            </List>
        </Grid.Column>
    );
}

export function NavBar(props) {
    const parts = NavBarData.map((item, key) => {
        return (
            <NavBarPart {...item} key={key}/>
        )
    });

    return (
        <Segment inverted vertical style={{padding: '5em 0em'}}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        {parts}
                        <Grid.Column width={7}>
                            <Header as='h4' inverted>
                                Copyrights
                            </Header>
                            <p>
                                This is the only site that represents the company and any other sites that are not
                                within the scope of pixlestown.com are not represented by us.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
}