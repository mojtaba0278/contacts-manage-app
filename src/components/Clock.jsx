import {Component} from 'react'

class Clock extends Component{
    constructor(){
        super();
        this.state={date:new Date(),showClock:true, color:false};
    }

componentDidMount(){
    this.timer=setInterval(()=>this.tick(),1000)
}
tick(){
    this.setState({date:new Date()})
}
    render(){
        return(
<div style={{color:'cyan'}}>
    <p>ساعت در حال حاضر برابر است با:{this.state.date.toLocaleTimeString()}</p>
</div>
        )
    }
}

export default Clock;