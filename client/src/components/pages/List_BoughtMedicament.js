import React, {Component} from "react";
import axios from "axios";

class ListBoughtMedicament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boughtMedicaments: [],
      patient: {},
      thirdparty: {},
    };
  }

  onInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onFormSubmit = (e) => {}
  onClick = () => {
    this.props.history.push("/sell");
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/PharmacistANDThirdParty/boughtMedicaments")
      .then(response => {
        this.setState({boughtMedicaments: response.data});
        console.log(this.state.boughtMedicaments);
      })
      .catch(error => {
        const {errors} = error.response.data;
        console.log(errors);
        this.setState({errors: errors});
      });
  }
  
  
      onClickSetRefundable = (id) => {
        axios
        .put("http://localhost:5000/api/PharmacistANDThirdParty/approve_refund/"+id)
        .then(response => {
          const bt = this.state.boughtMedicaments.map((bm) => {
            if (bm.medicament._id === response.data._id) {
              bm.medicament = response.data;
              return bm;
            } else {
              return bm;
            }
          });
          this.setState({ boughtMedicaments: bt });
      }).catch(error => {
        const {errors} = error.response.data;
        this.setState({errors: errors});
      });
      }

  onClickRefund = (id) => {
    axios
    .put("http://localhost:5000/api/PharmacistANDThirdParty/refund_boughtMedicament/"+id)
      .then(response => {
        const bt = this.state.boughtMedicaments.map((bm) => {
          if (bm._id === response.data._id) {
            bm = response.data;
            return bm;
          } else {
            return bm;
          }
        });
        this.setState({ boughtMedicaments: bt });
    }).catch(error => {
      const {errors} = error.response.data;
      this.setState({errors: errors});
    });
  };




  render() {
    const setrefundBtn = (id)=>(
      <button style={{ backgroundColor: "#3f4079", marginLeft: "10px", color: "white" }} onClick={()=>this.onClickSetRefundable(id)} className="btn" >Set Refundable</button>
    );

    const refundBtn = (id)=>(
      <button style={{ backgroundColor: "#e74e84", marginLeft: "10px", color: "white" }} onClick={()=>this.onClickRefund(id)} className="btn" >Refund</button>    );

    const med = (medicament,index) => (
      <div key={index} className="strip_list wow fadeIn">
      <figure>
          <img
            src="http://via.placeholder.com/565x565.jpg"
            alt=""
          />
      </figure>
      <h3>{medicament.medicament.name}</h3>
      <p>{medicament.medicament.description}</p>
      <span> {medicament.medicament.price} DT</span>
      {!medicament.medicament.isRefundable ? setrefundBtn(medicament.medicament._id) : refundBtn(medicament._id)}
    </div>
    )

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
              {this.state.boughtMedicaments.map((medicament, index) =>
                 !medicament.isRefunded ? med(medicament,index) : null
              )}
            </div>
          </div>
        </div>
        <h1>Refunded</h1>
        <div className="container margin_60_35">
          <div className="row">
            <div className="col-lg-7">
              {this.state.boughtMedicaments.map((medicament, index) =>
                medicament.isRefunded ?
                <div key={index} className="strip_list wow fadeIn">
                 <figure>
           
                 </figure>
                 <h3>{medicament.medicament.name}</h3>
                 <p>{medicament.medicament.description}</p>
                    <span> {medicament.medicament.price} DT</span>
                    <button style={{ backgroundColor: "grey", marginLeft: "10px", color: "white" }} className="btn" disabled={true}>Refunded</button>    
               </div> : null
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListBoughtMedicament;
