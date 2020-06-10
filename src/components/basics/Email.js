import React from 'react';
import {NONE} from "../../values/ErrorsCode";

class Email extends React.Component {

    state = {
        error: NONE,
        touched: false
    };

    componentDidMount() {
        //this.setState({error: this.props.error, touched: this.props.touched});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({error: nextProps.error, touched: nextProps.touched});
    }

    renderStyleInput = () => {
        if (this.state.error && this.state.touched) {
            return {borderColor: "rgba(200,50,50,0.5)", backgroundColor: "rgba(200,50,50,0.2)"};
        } else {
            return {};
        }
    };


    render() {
        return (
            <div className="ui icon input">
                <input {...this.props}
                       type="text"
                       name="email"
                       autoComplete="on"
                       placeholder="example@domain.com"
                       style={this.renderStyleInput()}
                />
                <i className="user circle icon"/>
            </div>
        );
    }
}

export default Email;