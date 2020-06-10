import React from 'react';
import Grid from "../layout/Grid";
import Row from "../layout/Row";
import Column from "../layout/Column";
import Dimmer from "./Dimmer";
import ImageURL from "../../apis/ImageURL";
import Padding from "./Padding";

class MultiImageViewer extends React.Component {

    state = {
        imageView: undefined,
        imageIndexView: undefined,
        isImageView: false,
    };


    renderImages = () => {
        return this.props.images.map((item, index) => {
            return (
                <Column key={item} size={1}>
                    <div
                        className="ui icon button"
                        style={{width: "40px", height: "38px"}}
                        onClick={
                            () => {
                                this.setState({isImageView: true});
                                this.setState({imageView: item});
                                this.setState({imageIndexView: index});
                            }
                        }
                    >
                        <img
                            src={ImageURL + item}
                            alt={index}
                            style={{
                                width: "40px",
                                height: "38px",
                                padding: "4px",
                                marginLeft: "-11px",
                                marginTop: "-11px"
                            }}
                        />
                    </div>
                </Column>
            );
        });
    };

    render() {
        return (
            <div className="ui segment">
                <Grid>
                    <Row>
                        {this.renderImages()}
                    </Row>
                </Grid>
                <Dimmer active={this.state.isImageView}
                        reset={
                            (value) => {
                                this.setState({isImageView: value});
                            }
                        }>
                    <img src={ImageURL + this.state.imageView} alt="ddd"
                         style={{maxHeight: "460px"}}/>
                         <Padding repeat={2}/>
                </Dimmer>
            </div>
        );
    }
}

export default MultiImageViewer;