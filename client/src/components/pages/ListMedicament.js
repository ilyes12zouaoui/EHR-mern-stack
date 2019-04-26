import React, {Component} from "react";
import axios from "axios";
import moment from "moment";

class ListMedicament extends Component {


  constructor(props) {
    super(props);
    this.state = {
      boughtMedicament: {},
      patient: {},
      thirdparty: {},
      medicament: [],
      firstName: "",
      lastName: "",
      birthDate: "",
      city: "",
      country: "",
      address: "",
      telNum: "",
      blood_type: "",
      height: "",
      weight: ""
    };
  }
  
  onInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  onSell = (id) => {
    this.props.history.push("/sell/"+id);
  }

  componentDidMount() {
    axios
    .get("http://localhost:5000/api/PharmacistANDThirdParty/medicaments")
    .then(response => {
      this.setState({medicament: response.data});
      console.log(this.state.medicament);
    })
    .catch(error => {
      const {errors} = error.response.data;
      console.log(errors);
      this.setState({errors: errors});
    });
    
    // axios
    //     .get('http://localhost:5000/api/PharmacistANDThirdParty/patient_by_boughtMedicaments_By_Pharmacist_id/'+this.props.user.id)
    //     .then(response => {
      //         this.setState({patient: response.data});
      //         console.log(this.state.patient);
      //     })
      //     .catch(error => {
        //         const {errors} = error.response.data;
        //         console.log(errors);
        //         this.setState({errors: errors});
        //     });
        
        // axios
        //     .get('http://localhost:5000/api/PharmacistANDThirdParty/thirdparty_by_boughtMedicaments_By_Pharmacist_id/'+this.props.user.id)
        //     .then(response => {
          //         this.setState({thirdparty: response.data});
          //         console.log(this.state.thirdparty);
          //     })
          //     .catch(error => {
            //         const {errors} = error.response.data;
            //         console.log(errors);
            //         this.setState({errors: errors});
            //     });
            
            // axios
            //     .get('http://localhost:5000/api/PharmacistANDThirdParty/medicament_by_boughtMedicaments_By_Pharmacist_id/'+this.props.user.id)
            //     .then(response => {
              //         this.setState({medicament: response.data});
              //         console.log(this.state.medicament);
              //     })
              //     .catch(error => {
                //         const {errors} = error.response.data;
                //         console.log(errors);
                //         this.setState({errors: errors});
                //     });
              }
              
              render() {
                
                return (
                  <React.Fragment>
      <div id="results">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <strong>All medicaments available</strong>
              </h4>
            </div>
            <div className="col-md-6">
              <div className="search_bar_list">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex. Name, Price, Description..."
                  />
                <input type="submit" value="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="filters_listing">
        <div className="container">
          <ul className="clearfix">
            <li>
              <h6>Type</h6>
              <div className="switch-field">
                <label htmlFor="all">bought Medicaments</label>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container margin_60_35">
        <div className="row">
          <div className="col-lg-7">
            {this.state.medicament.map((medicament, index) => (
              <div key={index} className="strip_list wow fadeIn">
                <figure>
                    <img
                      src="http://via.placeholder.com/565x565.jpg"
                      alt=""
                      />
                </figure>

                <h3>{medicament.name}</h3>
                <p>{medicament.description}</p>
                <span> {medicament.price} DT</span>
                <button style={{ backgroundColor: "#e74e84", marginLeft: "10px", color: "white" }}  className="btn" onClick={() => this.onSell(medicament._id)}>Sell</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
}
export default ListMedicament;