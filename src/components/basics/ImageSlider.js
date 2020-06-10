import React from 'react';
import Column from "../layout/Column";
import ImageURL from "../../apis/ImageURL";
import Row from "../layout/Row";
import Grid from "../layout/Grid";

class ImageSlider extends React.Component {

    state = {
        startIndex: 0,
        iconLeft: "caret square left icon",
        iconRight: "caret square right icon"
    };

    render() {
        console.log(this.state);
        let counter = 0;
        const imagesList = this.props.imagesList.map(
            (item, key) => {
                if (this.state.startIndex <= key && counter < 3) {
                    counter += 1;
                    if (counter === 2) {
                        return (
                            <Column size={6}>
                                <img src={ImageURL + item.image} alt={key} key={key} style={{maxHeight:"180px"}}/>
                            </Column>
                        );
                    }
                    return (
                        <Column size={4}>
                            <img src={ImageURL + item.image} alt={key} key={key} style={{marginTop: "25%",maxHeight:"120px"}}/>
                        </Column>
                    );
                }
            }
        );

        return (
            <Row>
                <div className="ui segment" style={{height: "220px", background: "#ffffff11",minWidth:"100%"}}>
                    <Grid>
                        <Row>
                            <Column size={1}>
                                <i className={this.state.iconLeft}
                                   style={{
                                       color: "black",
                                       fontSize: "2.5em",
                                       zIndex: "56699",
                                       cursor: "pointer"
                                   }}
                                   onMouseOver={() => {
                                       this.setState({iconLeft: "caret square left outline icon"})
                                   }}
                                   onMouseLeave={() => {
                                       this.setState({iconLeft: "caret square left icon"})
                                   }}
                                   onClick={() => {
                                       if (this.state.startIndex > 0) {
                                           this.setState({startIndex: this.state.startIndex - 1});
                                       }
                                   }}
                                />
                            </Column>
                            {imagesList}
                            <Column size={1}>
                                <i className={this.state.iconRight}
                                   style={{
                                       color: "black",
                                       fontSize: "2.5em",
                                       zIndex: "56699",
                                       cursor: "pointer"
                                   }}
                                   onMouseOver={() => {
                                       this.setState({iconRight: "caret square right outline icon"})
                                   }}
                                   onMouseLeave={() => {
                                       this.setState({iconRight: "caret square right icon"})
                                   }}
                                   onClick={() => {
                                       if (this.props.imagesList.length - this.state.startIndex > 3) {
                                           this.setState({startIndex: this.state.startIndex + 1});
                                       }
                                   }}
                                />
                            </Column>
                        </Row>
                    </Grid>
                </div>
            </Row>
        );
    }

}

export default ImageSlider;