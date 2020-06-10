import React from 'react';

class Padding extends React.Component {

    state = {
        element: [],
    };

    componentDidMount() {
        const newList = [];
        for (let i = 0; i < this.props.repeat; i++) {
            newList.push(i);
        }
        this.setState({element: newList});
    }

    renderPadding = () => {
        return this.state.element.map(key => {
            return <br key={key}/>;
        })
    };

    render() {
        if (this.props.small) {
            return <p/>;
        } else {
            return (
                <div>
                    {this.renderPadding()}
                </div>
            );
        }

    }
}

export default Padding;