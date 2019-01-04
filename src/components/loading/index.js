import React from "react";
import "./index.css";
import loadingGif from "../../assets/img/loading.gif";
import emitter from "../../utils/events"

export default class Loading extends React.Component {
  state = {
    show: false,
    defaultClass: "loading-panel",
    activeClass: "loading-panel active"
  };
  componentDidMount(){
    //claim events to show/hide loading panel
    this.eventEmitter = emitter.addListener("showLoading",()=>{
        this.setState({
            show: true
        })
    });
    this.eventEmitter = emitter.addListener("hideLoading",()=>{
      this.setState({
          show: false
      })
  });
}
  render() {
    return (
      <div
        className={
          this.state.show ? this.state.activeClass : this.state.defaultClass
        }
      >
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }
}
