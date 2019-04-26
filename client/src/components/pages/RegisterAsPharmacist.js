import React, {Component} from "react";
import axios from "axios";

class RegisterAsPharmacist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pharmacist: {},
      birthDate: "",
      city: "",
      country: "",
      address: "",
      telNum: "",
      cin: ""
    };
  }
  onInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:5000/api/PharmacistANDThirdParty/add_pharmacist/" +
          this.props.user.id,
        {
          birthDate: this.state.birthDate,
          city: this.state.city,
          country: this.state.country,
          address: this.state.address,
          telNum: this.state.telNum,
          cin: this.state.cin,
          role:"Pharmacist"
        }
      )
      .then(response => {
        this.setState({success: response.data.success, errors: {}});
      })
      .catch(error => {
          console.log(        {
              birthDate: this.state.birthDate,
              city: this.state.city,
              country: this.state.country,
              address: this.state.address,
              telNum: this.state.telNum,
              cin: this.state.cin,
              role:"Pharmacist"
          });
        const {errors} = error.response.data;
        this.setState({errors: errors, success: {}});
      });
  }


  render() {
    let {pharmacist} = this.state;

    return (
      <div id="hero_register">
        <div className="container margin_120_95">
          <div className="row">
            <div className="col-lg-6">
              <h1>
                It's time to be with us<br /> as a Pharmacist!
              </h1>
              <p className="lead">
                Te pri adhuc simul. No eros errem mea. Diam mandamus has ad.
                Invenire senserit ad has, has ei quis iudico, ad mei nonumes
                periculis.
              </p>
              <div className="box_feat_2">
                <i className="pe-7s-map-2" />
                <h3>Let patients to Find you!</h3>
                <p>
                  Ut nam graece accumsan cotidieque. Has voluptua vivendum
                  accusamus cu. Ut per assueverit temporibus dissentiet.
                </p>
              </div>
              <div className="box_feat_2">
                <i className="pe-7s-date" />
                <h3>Easly manage Bookings</h3>
                <p>
                  Has voluptua vivendum accusamus cu. Ut per assueverit
                  temporibus dissentiet. Eum no atqui putant democritum, velit
                  nusquam sententiae vis no.
                </p>
              </div>
              <div className="box_feat_2">
                <i className="pe-7s-phone" />
                <h3>Instantly via Mobile</h3>
                <p>
                  Eos eu epicuri eleifend suavitate, te primis placerat
                  suavitate his. Nam ut dico intellegat reprehendunt, everti
                  audiam diceret in pri, id has clita consequat suscipiantur.
                </p>
              </div>
            </div>
            <div className="col-lg-5 ml-auto">
              <div className="box_form">
                <div id="message-register" />
                <form
                  onSubmit={e => {
                    this.onFormSubmit(e);
                  }}
                >
                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          name="firstName"
                          value={this.props.user.firstName}
                          disabled={true}
                          onChange={this.onInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          name="lastName"
                          disabled={true}
                          value={this.props.user.lastName}
                          onChange={this.onInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          placeholder="birthDate"
                          name="birthDate"
                          value={this.state.birthDate}
                          onChange={this.onInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="country"
                          name="country"
                          className="form-control"
                          placeholder="Country"
                          value={pharmacist.country}
                          onChange={this.onInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          name="city"
                          value={this.state.city}
                          onChange={this.onInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          name="address"
                          value={this.state.address}
                          onChange={this.onInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Phone"
                          name="telNum"
                          value={this.state.telNum}
                          onChange={this.onInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="cin"
                          name="cin"
                          value={this.state.cin}
                          onChange={this.onInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <input
                      type="submit"
                      className="btn_1"
                      value="Submit"
                      id="submit-register"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterAsPharmacist;
