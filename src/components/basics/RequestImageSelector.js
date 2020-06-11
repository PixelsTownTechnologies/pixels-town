import React from 'react';
import Grid from "../layout/Grid";
import Row from "../layout/Row";
import Column from "../layout/Column";
import Padding from "./Padding";
import EmptyButton from "./EmptyButton";
import Dimmer from "./Dimmer";
import ImageURL from "../../apis/ImageURL";

class RequestImageSelector extends React.Component {

    state = {
        files: [],
        filesResult: [],
        fileValue: "",
        fileReader: new FileReader(),
        imageView: undefined,
        imageIndexView: undefined,
        isImageView: false,
        selectedImage: undefined,
        selectedUrl: false,
    };

    handleFileRead = (e) => {
        this.setState({filesResult: [...this.state.filesResult, this.state.fileReader.result]});
    };

    renderImages = () => {

        const List1 = this.state.filesResult.map((item, index) => {
            if (this.state.selectedImage !== undefined && this.state.selectedImage === item) {
                return (
                    <Column key={item} size={1}>
                        <div
                            className="ui icon button"
                            style={{width: "40px", height: "38px", background: "green"}}
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
            }
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

        const List2 = this.props.images.map((item, key) => {
            if (this.state.selectedImage !== undefined && this.state.selectedImage === item) {
                return (<Column key={key} size={1}>
                    <div
                        className="ui icon button"
                        style={{width: "40px", height: "38px", background: "green"}}
                        onClick={
                            () => {
                                this.setState({urlImage: true});
                                this.setState({imageView: item});
                            }
                        }
                    >
                        <img
                            src={ImageURL + item.image}
                            alt={key}
                            style={{
                                width: "40px",
                                height: "38px",
                                padding: "4px",
                                marginLeft: "-11px",
                                marginTop: "-11px"
                            }}
                        />
                    </div>
                </Column>);
            }
            return (<Column key={key} size={1}>
                <div
                    className="ui icon button"
                    style={{width: "40px", height: "38px"}}
                    onClick={
                        () => {
                            this.setState({urlImage: true});
                            this.setState({imageView: item});
                        }
                    }
                >
                    <img
                        src={ImageURL + item.image}
                        alt={key}
                        style={{
                            width: "40px",
                            height: "38px",
                            padding: "4px",
                            marginLeft: "-11px",
                            marginTop: "-11px"
                        }}
                    />
                </div>
            </Column>);
        });

        return [...List2, ...List1];
    };

    renderDimmer = () => {
        if (this.state.isImageView) {
            return (
                <Dimmer active={this.state.isImageView}
                        reset={
                            (value) => {
                                this.setState({isImageView: value});
                            }
                        }>
                    <img src={this.state.imageView} alt="ddd"
                         style={{maxHeight: "460px"}}/>
                    <Padding repeat={1}/>
                    <EmptyButton text="Select" onClick={
                        () => {
                            this.setState({
                                selectedImage: this.state.imageView,
                                isImageView: false,
                                selectedUrl: false
                            });
                            if (this.props.pushImages !== undefined) {
                                this.props.pushImages(this.state.files[this.state.imageIndexView], false);
                            }
                        }}/>
                </Dimmer>
            );
        }
        if (this.state.urlImage) {
            return (
                <Dimmer active={this.state.urlImage}
                        reset={
                            (value) => {
                                this.setState({urlImage: value});
                            }
                        }>
                    <img src={ImageURL + this.state.imageView.image} alt="ddd"
                         style={{maxHeight: "460px"}}/>
                    <Padding repeat={1}/>
                    <EmptyButton text="Select" onClick={
                        () => {
                            this.setState({selectedImage: this.state.imageView, urlImage: false, selectedUrl: true});
                            if (this.props.pushImages !== undefined) {
                                this.props.pushImages(this.state.imageView, true);
                            }
                        }}/>
                </Dimmer>
            );
        }
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
                {this.renderDimmer()}
            </div>
        );
    }
}

export default RequestImageSelector;