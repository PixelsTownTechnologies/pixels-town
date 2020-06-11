import React from 'react';

class Column extends React.Component {

    sizes = {
        1:"one",2: "two", 3: "three", 4: "four", 5: "five", 6: "six",
        7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven",
        12: "twelve", 13: "thirteen",14:"fourteen"
    };


    renderSize = () => {
        if (this.props.size === 1) {
            return "column"
        } else {
            return this.sizes[this.props.size] + " wide column"
        }
    };


    render() {
        return (
            <div className={this.renderSize()}  {...this.props}>
                {this.props.children}
            </div>
        );
    }
}

export default Column;