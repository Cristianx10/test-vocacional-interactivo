import React, { Component } from "react";

interface IPropsD{
    t?:any;
}

export class D extends Component<IPropsD>{
    
    render(){

        let className = getTag(tags.default);

        if(this.props.t){
            className = getTag(tags.t);
        }

        return (<span className={className}>{this.props.children}</span>);
    }
}

function getTag(dato:string){
    let result = dato.replace(".", "");
    return result;
}

export var tags = {
    default:".dato",
    t:".dato__titulo"
};

export default D;

