import React, {Component} from "react";
import axios from "axios";

class SellMedicament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: "",
      medicament: "",
      thirdparty: "",
      pharmacist: {},
      thirdpartys: [],
      patients: []
    };
  }

  handleChange = e => {
    this.setState({thirdparty: this.state.thirdpartys[e.target.value]._id});
    console.log(this.state.thirdpartys[e.target.value]);
  };

  handleChangepatient = e => {
    this.setState({patient: this.state.patients[e.target.value]._id});
    console.log(this.state.patients[e.target.value]);
  };

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
    console.log({[e.target.name]: e.target.value});
  };

  onFormSubmit = e => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/PharmacistANDThirdParty/add_boughtMedicament",
        {
          patient_id: this.state.patient,
          pharmacist_id: this.props.user.id,
          medicament_id: this.state.medicament,
          thirdparty_id: this.state.thirdparty
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        const {errors} = error.response.data;
        console.error(errors);
      });
  };

  componentDidMount() {
    this.setState({medicament: this.props.match.params.id});

    axios
      .get("http://localhost:5000/api/patient/")
      .then(response => {
        this.setState({patients: response.data});
        console.log("patient" + response.data);
      })
      .catch(error => {
        const {errors} = error.response.data;
        console.log(errors);
        this.setState({errors: errors});
      });
    axios
      .get("http://localhost:5000/api/PharmacistANDThirdParty/thirdpartys")
      .then(response => {
        this.setState({thirdpartys: response.data});
        console.log("thirdpartys" + response.data);
      })
      .catch(error => {
        const {errors} = error.response.data;
        console.log(errors);
        this.setState({errors: errors});
      });
  }

  render() {
    return (
      <div id="hero_register">
        <div className="container margin_120_95">
          <div className="row">
            <div className="col-lg-6">
              <h1>
                Sell a Medicament<br />
              </h1>
              <p className="lead">All fields are required</p>
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
                    <div className="col-md-12 ">
                                        <div className="form-group">
                                            Reference
                        <input
                          type="text"
                          className="form-control"
                          placeholder="medicament"
                          name="medicament"
                          value={this.state.medicament}
                          onChange={this.onInputChange}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <select onClick={this.handleChange}>
                          {this.state.thirdpartys.map((thirdparty, index) => (
                            <option key={index} value={index}>
                              {thirdparty.comapanyName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">

                        <select onClick={this.handleChangepatient}>
                          {this.state.patients.map((patient, index) => (
                            <option key={index} value={index}>
                              {patient.firstName}
                            </option>
                          ))}
                        </select>
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

export default SellMedicament;
