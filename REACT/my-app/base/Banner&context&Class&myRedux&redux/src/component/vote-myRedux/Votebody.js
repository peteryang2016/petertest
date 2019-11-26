import React from 'react'
export default class Votebody extends React.Component{
    constructor(props){
        super(props)
        this.state={refresh:0}
    }
    componentDidMount() {
        this.props.myRedux.subscribe(()=>{
            this.setState({
                refresh:this.state.refresh+1
            })
        })
    }

    render(){
        let state = this.props.myRedux.getState()
        let {n=0,m=0} = state;
        let rate = n/(m+n)*100;
        rate= isNaN(rate)?0:rate;
        return(
            <div className="panel-body">
                支持：{n}
                <br/>
                反对：{m}
                <br/>
                支持率：{rate.toFixed(2)+'%'}
            </div>
        )
    }
}
