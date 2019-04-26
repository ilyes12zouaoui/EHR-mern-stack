import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import Doctor from "./Doctor";

class ListUsers extends Component {

    state = {
        doctor: [],
        search:"",
    };

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        axios
            .get("http://localhost:5000/api/patient/getUserByfirstName?name=" + e.target.value)
            .then(response => {
                this.setState({doctor: response.data});
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });
    };


    componentDidMount() {

            axios
                .get("http://localhost:5000/api/patient/getUserByfirstName?name=" + this.state.search)
               // .get('http://localhost:5000/api/patient/doctors')
                .then(response => {

                    this.setState({doctor: response.data});
                    console.log(this.state.doctor);
                })
                .catch(error => {
                    const {errors} = error.response.data;
                    console.log(errors);
                    this.setState({errors: errors});
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
        let doctor = this.state.doctor;



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
                                           placeholder="Ex. Specialist, Name, Doctor..." name="search"
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
                                    <label htmlFor="doctors">Doctors</label>
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


                            {this.state.doctor != null?
                            <div className="row">

                                {this.state.doctor.map((doc, index) => (
                                    <Doctor key={index}{...this.props} doc={doc}/>
                                ))}




                            </div>
                            :null }


                            {this.state.doctorr != null?
                                <div className="row">

                                    {this.state.doctorr.map((doc, index) => (
                                        <Doctor key={index}{...this.props} doc={doc}/>
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


                    </div>

                </div>
            </React.Fragment>
        )
            ;
    }
}

export default ListUsers;