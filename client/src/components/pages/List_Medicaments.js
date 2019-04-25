import React, {Component} from 'react';
import axios from "axios";

class List_Medicaments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            medicament: {},
            firstName: "",
            lastName: "",
            birthDate:"",
            city: "",
            country: "",
            address:"",
            telNum: "",
            blood_type: "",
            height:"",
            weight: "",

        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(e) {
        // console.log({ [e.target.name]: e.target.value });
        //console.log(e.currentTarget);
        this.setState({ [e.target.name]: e.target.value });
    }

    onFormSubmit(e) {
        window.location.reload();

        axios
            .put("http://localhost:5000/api/patient/add/"+this.props.user.id, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthDate: this.state.birthDate,
                city: this.state.city,
                country: this.state.country,
                address: this.state.address,
                telNum: this.state.telNum,
                blood_type: this.state.blood_type,
                height: this.state.height,
                weight: this.state.weight
            })
            .then(response => {
                this.setState({ success: response.data.success, errors: {} });
            })
            .catch(error => {
                const { errors } = error.response.data;
                this.setState({ errors: errors, success: {} });
            });
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/PharmacistANDThirdParty/medicaments')
            .then(response => {
                this.setState({medicament: response.data[0]});
                console.log(this.state.medicament);
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });
    }


    render() {
        let {medicament} = this.state;

        function _calculateAge(birthday) {
            // birthday is a date
            let ageDifMs = Date.now() - birthday.getTime();
            let ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        return (

            <React.Fragment>
                <div id="results">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h4><strong>Showing 10</strong> of 140 results</h4>
                            </div>
                            <div className="col-md-6">
                                <div className="search_bar_list">
                                    <input type="text" className="form-control"
                                           placeholder="Ex. Name, Price, Description..."/>
                                        <input type="submit" value="Search"/>
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
                                    <input type="radio" id="all" name="type_patient" value="all" checked/>
                                        <label htmlFor="all">Medicaments</label>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="container margin_60_35">
                    <div className="row">
                        <div className="col-lg-7">

                            <div className="strip_list wow fadeIn">
                                <a href="#0" className="wish_bt"></a>
                                <figure>
                                    <a href="detail-page.html"><img src="http://via.placeholder.com/565x565.jpg" alt=""/></a>
                                </figure>

                                <h3>{medicament.name}</h3>
                                <p>{medicament.description}</p>
                                <span> {medicament.price} DT</span>
                                <a href="badges.html" data-toggle="tooltip" data-placement="top"
                                   data-original-title="Badge Level" className="badge_list_1"><img
                                    src="img/badges/badge_1.svg" width="15" height="15" alt=""/></a>
                                <ul>
                                    <li ><a href="#0" onClick="onHtmlClick('Doctors', 0)" className="btn_listing">
                                        </a></li>
                                    <li></li>
                                    <li><a href="detail-page.html">Approve refund</a></li>
                                </ul>
                            </div>



                            <nav aria-label="" className="add_top_20">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" tabIndex="-1">Previous</a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>


                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default List_Medicaments;