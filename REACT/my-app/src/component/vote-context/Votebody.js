import React from 'react'
import PropTypes from 'prop-types'
export default class Votebody extends React.Component{
    static contextTypes={
        m:PropTypes.number,
        n:PropTypes.number
    }

    constructor(props,context){
        super(props,context)
    }
    render(){
        let {m,n} = this.context;

        let rate = m/(m+n)*100;
        rate= isNaN(rate)?rate=0:rate
        return(
            <div className="panel-body">
                支持：{m}
                <br/>
                反对：{n}
                <br/>
                支持率：{rate.toFixed(2)}
            </div>
        )
    }
}
