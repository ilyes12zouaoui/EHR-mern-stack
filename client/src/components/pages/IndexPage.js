import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import beep from "../assets/welcome.mp3";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
    };
  }
  
  componentDidMount() {
    const socket = socketIOClient("http://localhost:5000", { transports: ['websocket'] });
    socket.on("FromAPI", data => {
      const { token, user } = data;
      this.props.loginMethod(user.role, user, token);
      new Audio(beep).play();
      this.props.history.push("/");    
      console.log('response:', data);

    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="header-video">
          <div id="hero_video">
            <div className="content">
              <h3>Use your RFID to connect to <br/>healthChain ! </h3><br/>
              <p>
                  You can access to your medical record, share it with<br/>
                  health care providers, and give them permission<br/> to add
                  new data.
              </p>

            </div>
          </div>
          <img
            alt=""
            className="header-video--media"
            data-video-src="video/intro"
            data-teaser-source="video/intro"
            data-provider=""
            data-video-width="1920"
            data-video-height="750"
          />
        </div>

        <div className="container margin_120_95">
          <div className="main_title">
            <h2>
              Discover the <strong>online</strong> appointment!
            </h2>
            <p>
              Usu habeo equidem sanctus no. Suas summo id sed, erat erant
              oporteat cu pri. In eum omnes molestie. Sed ad debet scaevola, ne
              mel.
            </p>
          </div>
          <div className="row add_bottom_30">
            <div className="col-lg-4">
              <div className="box_feat" id="icon_1">
                <span />
                <h3>Find a Doctor</h3>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_feat" id="icon_2">
                <span />
                <h3>View profile</h3>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_feat" id="icon_3">
                <h3>Book a visit</h3>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </div>
            </div>
          </div>
          <p className="text-center">
            <a href="list.html" className="btn_1 medium">
              Find Doctor
            </a>
          </p>
        </div>
        <div  />
      </React.Fragment>
    );
  }
}

export default IndexPage;
