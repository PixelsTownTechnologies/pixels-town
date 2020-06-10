import React from 'react';
import Field from "./Field";
class GenderList extends React.Component {

    render() {
        return (
            <Field>
                <label>Gender</label>
                <select className="ui search dropdown" {...this.props}>
                    <option value="">Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                </select>
            </Field>
        );
    }
}

export default GenderList;