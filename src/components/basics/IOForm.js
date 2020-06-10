import React from 'react';
import Padding from "./Padding";
import Container from "../layout/Container";
import Grid from "../layout/Grid";
import Row from "../layout/Row";
import Column from "../layout/Column";
import Field from "./Field";
import Button from "./Button";

class IOForm extends React.Component {

    state = {
        title: "",
        jsonName: "",
        is_file: "",
        fields: [...this.props.fields],
        change: true,
    };

    removeAction = (key) => {
        this.state.fields.splice(key, 1);
        this.setState({change: true});
        console.log(this.state);
    };

    addButtonAction = () => {
        if (this.state.title === "" || this.state.jsonName === "" || this.state.is_file === "") {
            return undefined;
        }
        this.setState(
            {
                fields: [
                    ...this.state.fields,
                    {
                        title: this.state.title,
                        json_name: this.state.jsonName,
                        is_file: this.state.is_file,
                        is_input: this.props.input
                    }
                ],
                title: "",
                jsonName: "",
                is_file: "",
                change: true,
            }
        );
    };

    header = () => {
        if (this.props.input) {
            return "Config model inputs";
        } else {
            return "Config model outputs";
        }
    };

    renderFields = () => {
        return this.state.fields.map(
            (item, key) => {
                return (
                    <Row key={key}
                         style={{
                             width: "100%",
                             borderLeft: "3px solid #2196F3",
                             backgroundColor: "rgba(120,197,184,0.4)"
                         }}>
                        <Column size={4}>
                            <Field>
                                <input type="text" placeholder="Title" value={item.title}/>
                            </Field>
                        </Column>
                        <Column size={4}>
                            <Field>
                                <input type="text" placeholder="Json name" value={item.json_name}/>
                            </Field>
                        </Column>
                        <Column size={4}>
                            <Field>
                                <select className="ui dropdown" placeholder="Type" value={item.is_file}>
                                    <option value={false}>Text</option>
                                    <option value="" placeholder="Type">Type</option>
                                    <option value={false}>Text</option>
                                    <option value={true}>File</option>
                                </select>
                            </Field>
                        </Column>
                        <Column size={2}/>
                        <Column size={2}>
                            <Field>
                                <Button
                                    text="Remove"
                                    onClick={
                                        () => {
                                            this.removeAction(key)
                                        }
                                    }
                                    style={{width: "100%"}}
                                />
                            </Field>
                        </Column>
                    </Row>
                );
            }
        );
    };

    render() {
        if (this.props.pushFields !== undefined && this.state.change) {
            this.props.pushFields(this.state.fields);
            this.setState({change: false});
        }
        return (
            <div className="ui form">
                <Padding repeat={2}/>
                <Container style={{padding: "2.5%"}}>
                    <Grid>
                        <Row style={{width: "100%"}}>
                            <Column size={16}>
                                <Field>
                                    <div className="ui medium header">
                                        <i className="cogs icon"/>
                                        {this.header()}
                                    </div>
                                </Field>
                            </Column>
                        </Row>
                        {this.renderFields()}
                        <Row style={{
                            width: "100%",
                            borderLeft: "4px solid #2196F3",
                            backgroundColor: "rgba(120,197,184,0.4)"
                        }}>
                            <Column size={4}>
                                <Field>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={this.state.title}
                                        onChange={(e) => {
                                            this.setState({title: e.target.value})
                                        }}
                                    />
                                </Field>
                            </Column>
                            <Column size={4}>
                                <Field>
                                    <input
                                        type="text"
                                        placeholder="Json name"
                                        value={this.state.jsonName}
                                        onChange={(e) => {
                                            this.setState({jsonName: e.target.value})
                                        }}
                                    />
                                </Field>
                            </Column>
                            <Column size={4}>
                                <Field>
                                    <select
                                        className="ui dropdown"
                                        placeholder="Type"
                                        value={this.state.is_file}
                                        onChange={(e) => {
                                            this.setState({is_file: e.target.value})
                                        }}>
                                        <option value="" placeholder="Type">Type</option>
                                        <option value={false}>Text</option>
                                        <option value={true}>Image</option>
                                    </select>
                                </Field>
                            </Column>
                            <Column size={2}/>
                            <Column size={2}>
                                <Field>
                                    <Button text="Add" style={{width: "100%"}} onClick={this.addButtonAction}/>
                                </Field>
                            </Column>
                        </Row>
                        <Padding repeat={5}/>
                        {this.props.buttons}
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default IOForm;