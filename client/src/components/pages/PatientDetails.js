import React, {Component} from 'react';
import axios from "axios";
    import {NotificationContainer, NotificationManager} from "react-notifications";

class Personalinformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            physical_activity: {},
            nutrition: {},
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

    }




    componentDidMount() {
        axios
            .get('http://localhost:5000/api/patient/getuserById/'+this.props.match.params.idpatient)
            .then(response => {
                this.setState({user: response.data});
                console.log(this.state.user);
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });

    }



    render() {
        let {user} = this.state;

        function _calculateAge(birthday) {
            // birthday is a date
            let ageDifMs = Date.now() - birthday.getTime();
            let ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        return (


            <React.Fragment>
                <div id="breadcrumb">
                    <div className="container">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">List users</a></li>
                            <li>Patient details</li>
                        </ul>
                    </div>
                </div>

                <div className="container margin_60">
                    <div className="row">
                        <aside className="col-xl-3 col-lg-4" id="sidebar">
                            <div className="box_profile">
                                <figure>
                                    <img src="/images/patient.jpg" alt="" className="img-fluid"/>
                                </figure>
                                <small></small>
                                <h1>DR. {user.firstName} {user.lastName}</h1>
                                <span className="rating">
							<i className="icon_star voted"></i>
							<i className="icon_star voted"></i>
							<i className="icon_star voted"></i>
							<i className="icon_star voted"></i>
							<i className="icon_star"></i>
							<small>(145)</small>
							<a href="badges.html" data-toggle="tooltip" data-placement="top"
                               data-original-title="Badge Level" className="badge_list_1"><img
                                src="img/badges/badge_1.svg" width="15" height="15" alt=""/></a>
						</span>
                                <ul className="statistic">
                                    <li>854 Views</li>
                                    <li>124 Patients</li>
                                </ul>
                                <ul className="contacts">
                                    <li><h6>Address</h6>{user.address}</li>
                                    <li><h6>Phone</h6><a href="tel://000434323342">+216 {user.telNum}</a></li>
                                </ul>
                            </div>

                        </aside>

                        <div className="col-xl-9 col-lg-8">



                            <div className="tabs_styled_2">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="general-tab" data-toggle="tab" href="#general"
                                           role="tab" aria-controls="general" aria-expanded="true">General info</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab"
                                           aria-controls="reviews">Reviews</a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="general" role="tabpanel"
                                         aria-labelledby="general-tab">


                                        <div className="indent_title_in">
                                            <i className="pe-7s-user"></i>
                                            <h3>Health information</h3>
                                            <p>Mussum ipsum cacilds, vidis litro abertis.</p>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Blood type</label>
                                                    <input type="text" id="blood_type" name="blood_type"
                                                           className="form-control" placeholder="Blood type" value={"Blood " +user.blood_type}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Height</label>
                                                    <input type="text" id="height" name="height"
                                                           className="form-control" placeholder="Height" value={user.height +" metre"}/>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Weight</label>
                                                    <input type="text" id="weight" name="weight"
                                                           className="form-control" placeholder="Weight" value={user.weight +" Kg"}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>physical_activityy</label>
                                                    <input type="text" id="physical_activityy" name="physical_activityy"
                                                           className="form-control" placeholder="physical_activityy" value={user.physical_activityy}/>
                                                </div>
                                            </div>
                                        </div>

                                        <hr/>








                                    </div>


                                    <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                        <div className="reviews-container">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div id="review_summary">
                                                        <strong>4.7</strong>
                                                        <div className="rating">
                                                            <i className="icon_star voted"></i><i
                                                            className="icon_star voted"></i><i
                                                            className="icon_star voted"></i><i
                                                            className="icon_star voted"></i><i className="icon_star"></i>
                                                        </div>
                                                        <small>Based on 4 reviews</small>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="row">
                                                        <div className="col-lg-10 col-9">
                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar"
                                                                     style={{ width: "90%" }} aria-valuenow="90" aria-valuemin="0"
                                                                     aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-3">
                                                            <small><strong>5 stars</strong></small>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-9">
                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar"
                                                                     style={{ width: "95%" }} aria-valuenow="95" aria-valuemin="0"
                                                                     aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-3">
                                                            <small><strong>4 stars</strong></small>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-9">
                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar"
                                                                     style={{ width: "60%" }} aria-valuenow="60" aria-valuemin="0"
                                                                     aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-3">
                                                            <small><strong>3 stars</strong></small>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-9">
                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar"
                                                                     style={{ width: "20%" }} aria-valuenow="20" aria-valuemin="0"
                                                                     aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-3">
                                                            <small><strong>2 stars</strong></small>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-9">
                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar"
                                                                     style={{ width: "0" }} aria-valuenow="0" aria-valuemin="0"
                                                                     aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-3">
                                                            <small><strong>1 stars</strong></small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr/>

                                            <div className="review-box clearfix">
                                                <figure className="rev-thumb"><img
                                                    src="http://via.placeholder.com/150x150.jpg" alt=""/>
                                                </figure>
                                                <div className="rev-content">
                                                    <div className="rating">
                                                        <i className="icon_star voted"></i><i
                                                        className="icon_star voted"></i><i
                                                        className="icon_star voted"></i><i
                                                        className="icon_star voted"></i><i className="icon_star"></i>
                                                    </div>
                                                    <div className="rev-info">
                                                        Admin – April 03, 2016:
                                                    </div>
                                                    <div className="rev-text">
                                                        <p>
                                                            Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo
                                                            pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="review-box clearfix">
                                                <figure className="rev-thumb"><img
                                                    src="http://via.placeholder.com/150x150.jpg" alt=""/>
                                                </figure>
                                                <div className="rev-content">
                                                    <div className="rating">
                                                        <i className="icon-star voted"></i><i
                                                        className="icon_star voted"></i><i
                                                        className="icon_star voted"></i><i
                                                        className="icon_star voted"></i><i className="icon_star"></i>
                                                    </div>
                                                    <div className="rev-info">
                                                        Ahsan – April 01, 2016
                                                    </div>
                                                    <div className="rev-text">
                                                        <p>
                                                            Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo
                                                            pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="review-box clearfix">
                                                <figure className="rev-thumb"><img
                                                    src="http://via.placeholder.com/150x150.jpg" alt=""/>
                                                </figure>
                                                <div className="rev-content">
                                                    <div className="rating">
                                                        <i className="icon-star voted"></i><i
                                                        className="icon_star voted"></i><i
                                                        className="icon_star voted"></i><i
                                                        className="icon_star voted"></i><i className="icon_star"></i>
                                                    </div>
                                                    <div className="rev-info">
                                                        Sara – March 31, 2016
                                                    </div>
                                                    <div className="rev-text">
                                                        <p>
                                                            Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo
                                                            pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>


        );
    }
}

export default Personalinformation;