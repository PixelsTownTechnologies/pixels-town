import React from 'react';

class DDSearchBar extends React.Component {

    render() {
        return (
            <div className="ui icon input" style={{margin:'5px',width:'350px',height:'70%',top:'5%'}}>
                <input type="text" placeholder="Search..." {...this.props}/>
                <i className="search icon"/>
            </div>
        );
    }
}

export default DDSearchBar;