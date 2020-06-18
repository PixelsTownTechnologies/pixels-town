import React from "react";
import './card-viewer.css';
import '../../../../resource/styles/general.css';
import {Container, Responsive} from "semantic-ui-react";

class CardViewer extends React.Component {

    state = {
        viewIndex: undefined
    };

    constructor(props) {
        super(props);
        this.state.viewIndex = Math.floor((this.props.cards.length / 2));
    }


    renderCards = (viewRange) => {
        return this.props.cards.map((card, key) => {
            return (
                <div key={key}
                     style={{width: 'fit-content !important'}}
                     className={this.state.viewIndex === key ?
                         'center-item' : (key > this.state.viewIndex ? 'right-item' : 'left-item') + ' border-item'}>
                    <div className="blaring"/>
                    {card}
                </div>
            );
        }).slice(this.state.viewIndex - viewRange / 3, this.state.viewIndex + (viewRange / 3 * 2));
    };

    buttonViewerHandler = (shiftAmount, viewRange = 3) => {
        if ((this.state.viewIndex + shiftAmount) >= 1 && (this.state.viewIndex + shiftAmount) <= this.props.cards.length - viewRange / 3) {
            this.setState({viewIndex: this.state.viewIndex + shiftAmount});
        }
    };

    render() {
        return (
            <div>
                <Responsive {...Responsive.onlyComputer}>
                    <Container className="card-viewer">
                        <i className='ui icon caret left huge icon-button'
                           onClick={() => this.buttonViewerHandler(-1,6)}/>
                        {this.renderCards(3)}
                        <i className='ui icon caret right huge icon-button'
                           onClick={() => this.buttonViewerHandler(1,6)}/>
                    </Container>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <Container className="card-viewer">
                        <i className='ui icon caret left huge icon-button'
                           onClick={() => this.buttonViewerHandler(-1, 0)}/>
                        {this.renderCards(1)}
                        <i className='ui icon caret right huge icon-button'
                           onClick={() => this.buttonViewerHandler(1, 0)}/>
                    </Container>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <Container className="card-viewer">
                        <i className='ui icon caret left huge icon-button'
                           onClick={() => this.buttonViewerHandler(-1, 0)}/>
                        {this.renderCards(1)}
                        <i className='ui icon caret right huge icon-button'
                           onClick={() => this.buttonViewerHandler(1, 0)}/>
                    </Container>
                </Responsive>
            </div>
        );
    }

}

export default CardViewer;