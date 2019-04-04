import React, { Component } from "react";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.instance = React.createRef();
    this.instance2 = React.createRef();
  }

  componentDidMount() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "templeteAssets/js/modernizr.js";
    this.instance2.appendChild(s);

    const s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.async = true;
    s2.src = "templeteAssets/js/video_header.js";
    this.instance.appendChild(s2);
  }
  render() {
    return (
      <React.Fragment>
        <div ref={el => (this.instance2 = el)} />
        <div class="header-video">
          <div id="hero_video">
            <div class="content">
              <h3>Welcome to our website <br/>healChain ! </h3><br/>
              <p>
                  You can access to your medical record, share it with<br/>
                  health care providers, and give them permission<br/> to add
                  new data.
              </p>

            </div>
          </div>
          <img
            src="img/video_fix.png"
            alt=""
            class="header-video--media"
            data-video-src="video/intro"
            data-teaser-source="video/intro"
            data-provider=""
            data-video-width="1920"
            data-video-height="750"
          />
        </div>

        <div class="container margin_120_95">
          <div class="main_title">
            <h2>
              Discover the <strong>online</strong> appointment!
            </h2>
            <p>
              Usu habeo equidem sanctus no. Suas summo id sed, erat erant
              oporteat cu pri. In eum omnes molestie. Sed ad debet scaevola, ne
              mel.
            </p>
          </div>
          <div class="row add_bottom_30">
            <div class="col-lg-4">
              <div class="box_feat" id="icon_1">
                <span />
                <h3>Find a Doctor</h3>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="box_feat" id="icon_2">
                <span />
                <h3>View profile</h3>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="box_feat" id="icon_3">
                <h3>Book a visit</h3>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </div>
            </div>
          </div>
          <p class="text-center">
            <a href="list.html" class="btn_1 medium">
              Find Doctor
            </a>
          </p>
        </div>
        <div ref={el => (this.instance = el)} />
      </React.Fragment>
    );
  }
}

export default IndexPage;
