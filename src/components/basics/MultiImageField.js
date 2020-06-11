import React from 'react';
import Grid from "../layout/Grid";
import Row from "../layout/Row";
import Column from "../layout/Column";
import Padding from "./Padding";
import EmptyButton from "./EmptyButton";
import Dimmer from "./Dimmer";

class MultiImageField extends React.Component {

    state = {
        files: [],
        filesResult: [],
        fileValue: "",
        fileReader: new FileReader(),
        imageView: undefined,
        imageIndexView: undefined,
        isImageView: false,
    };

    handleFileRead = (e) => {
        this.setState({filesResult: [...this.state.filesResult, this.state.fileReader.result]});
    };

    renderImages = () => {
        return this.state.filesResult.map((item, index) => {
            //console.log(item);
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
                            src={item}
                            alt="lll"
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
                        <Column size={5}>
                            <input
                                type="file"
                                className="ui icon button"
                                style={{height: "38px", padding: "7px"}}
                                onChange={
                                    (e) => {
                                        this.setState({files: [...this.state.files, e.target.files[0]]});
                                        this.state.fileReader.onloadend = this.handleFileRead;
                                        this.state.fileReader.readAsDataURL(e.target.files[0]);
                                        if (this.props.pushImages !== undefined) {
                                            this.props.pushImages([...this.state.files, e.target.files[0]]);
                                        }
                                    }
                                }
                                src={undefined}
                                value={""}
                            />
                        </Column>
                    </Row>
                </Grid>
                <Dimmer active={this.state.isImageView}
                        reset={
                            (value) => {
                                this.setState({isImageView: value});
                            }
                        }>
                    <img src={this.state.imageView} alt="ddd"
                         style={{maxHeight: "460px"}}/>
                    <Padding repeat={1}/>
                    <EmptyButton text="Remove" onClick={
                        () => {
                            this.state.files.splice(this.state.imageIndexView, 1);
                            this.state.filesResult.splice(this.state.imageIndexView, 1);
                            this.setState({isImageView: false});
                            if (this.props.pushImages !== undefined) {
                                this.props.pushImages(this.state.files);
                            }
                        }}/>
                </Dimmer>
            </div>
        );
    }
}

export default MultiImageField;