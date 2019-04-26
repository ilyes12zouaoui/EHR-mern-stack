import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import Patient from "./Patient";
import Notif from "./Notif";
import {NotificationContainer} from "react-notifications";

class DoctorSpacePage2 extends Component {

    state = {
        patient: [],
        search:"",
        notif:[]
    };

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        axios
            .get("http://localhost:5000/api/patient/getPatientByfirstName?name=" + e.target.value)
            .then(response => {
                this.setState({patient: response.data});
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });
    };


    componentDidMount() {

        axios
            .get('api/patient/get_Notification_By_Id/' + this.props.user.id)
            .then(response => {
                this.setState({notif: response.data});

            });





        axios
            .get("api/patient/getPatientByfirstName?name=" + this.state.search)
            // .get('http://localhost:5000/api/patient/doctors')
            .then(response => {

                this.setState({patient: response.data});
                console.log(this.state.patient);
            });


    }

    /*onFormSubmit = (e) => {
        e.preventDefault();

            axios
                .get("http://localhost:5000/api/patient/getUserByfirstName?name=" + this.state.search)
                .then(response => {
                    this.setState({doctor: response.data});
                })
                .catch(error => {
                    const {errors} = error.response.data;
                    console.log(errors);
                    this.setState({errors: errors});
                });


    };
*/


    Search = (val) =>{


    }

    render() {
        let patient = this.state.patient;
        let notif = this.state.notif;


        return (
            <React.Fragment>
                <div id="results">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h4><strong>Showing 10</strong> of 140 results</h4>
                            </div>
                            <div className="col-md-6">
                                <form  onSubmit={this.onFormSubmit}>
                                    <div className="search_bar_list">
                                        <input type="text" className="form-control"
                                               placeholder="Ex. Specialist, Name, Patient..." name="search"
                                               onChange={this.onInputChange} value={this.state.search}
                                        />

                                    </div>
                                </form>
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
                                    <label htmlFor="all">All</label>
                                    <input type="radio" id="doctors" name="type_patient" value="doctors"/>
                                    <label htmlFor="doctors">Patients</label>
                                    <input type="radio" id="clinics" name="type_patient" value="clinics"/>
                                    <label htmlFor="clinics">Clinics</label>
                                </div>
                            </li>
                            <li>
                                <h6>Layout</h6>
                                <div className="layout_view">
                                    <a href="#0" className="active"><i className="icon-th"></i></a>
                                    <a href="list.html"><i className="icon-th-list"></i></a>
                                    <a href="list-map.html"><i className="icon-map-1"></i></a>
                                </div>
                            </li>
                            <li>
                                <h6>Sort by</h6>
                                <select name="orderby" className="selectbox">
                                    <option value="Closest">Closest</option>
                                    <option value="Best rated">Best rated</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="container margin_60_35">
                    <div className="row">
                        <div className="col-lg-8">


                            {this.state.patient != null?
                                <div className="row">

                                    {this.state.patient.map((doc, index) => (
                                        <Patient key={index}{...this.props} doc={doc}/>
                                    ))}




                                </div>
                                :null }


                            {this.state.doctorr != null?
                                <div className="row">

                                    {this.state.doctorr.map((doc, index) => (
                                        <Patient key={index}{...this.props} doc={doc}/>
                                    ))}




                                </div>
                                :null }



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

                        {this.state.notif.map((notif, index) => (

                            <Notif key={index}{...this.props} notif={notif}/>

                        ))}
                    </div>



                </div>

            </React.Fragment>
        )
            ;
    }
}

export default DoctorSpacePage2;
