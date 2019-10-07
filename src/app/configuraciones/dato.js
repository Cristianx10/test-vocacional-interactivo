import React from "react";

export class D extends React.Component{
    
    render(){

        let className = getTag(tags.default);

        if(this.props.t){
            className = getTag(tags.t);
        }

        return (<span className={className}>{this.props.children}</span>);
    }
}

function getTag(dato){
    let result = dato.replace(".", "");
    return result;
}

export var tags = {
    default:".dato",
    t:".dato__titulo"
};

