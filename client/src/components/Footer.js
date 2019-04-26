import React, { Component } from "react";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <footer>
          <div class="container margin_60_35">
            <div class="row">
              <div class="col-lg-3 col-md-12">
                <p>
                  <a href="index.html" title="Findoctor">
                    <img
                      src="img/logo.png"
                      data-retina="true"
                      alt=""
                      width="163"
                      height="36"
                      class="img-fluid"
                    />
                  </a>
                </p>
              </div>
              <div class="col-lg-3 col-md-4">
                <h5>About</h5>
                <ul class="links">
                  <li>
                    <a href="#0">About us</a>
                  </li>
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="#0">FAQ</a>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="register.html">Register</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-4">
                <h5>Useful links</h5>
                <ul class="links">
                  <li>
                    <a href="#0">Doctors</a>
                  </li>
                  <li>
                    <a href="#0">Clinics</a>
                  </li>
                  <li>
                    <a href="#0">Specialization</a>
                  </li>
                  <li>
                    <a href="#0">Join as a Doctor</a>
                  </li>
                  <li>
                    <a href="#0">Download App</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-4">
                <h5>Contact with Us</h5>
                <ul class="contacts">
                  <li>
                    <a href="tel://61280932400">
                      <i class="icon_mobile" /> + 61 23 8093 3400
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@findoctor.com">
                      <i class="icon_mail_alt" /> help@findoctor.com
                    </a>
                  </li>
                </ul>
                <div class="follow_us">
                  <h5>Follow us</h5>
                  <ul>
                    <li>
                      <a href="#0">
                        <i class="social_facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#0">
                        <i class="social_twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#0">
                        <i class="social_linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="#0">
                        <i class="social_instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-8">
                <ul id="additional_links">
                  <li>
                    <a href="#0">Terms and conditions</a>
                  </li>
                  <li>
                    <a href="#0">Privacy</a>
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <div id="copy">© 2017 Findoctor</div>
              </div>
            </div>
          </div>
        </footer>
        <div id="toTop" />
      </React.Fragment>
    );
  }
}

export default Footer;
