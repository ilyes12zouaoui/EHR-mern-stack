import React, {Component} from 'react';
import axios from "axios";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Userdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
            user: {},
            visible:true,
            sender: "",
            receiver: "",
            message:"",
            Checked:""
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/patient/getuserById/'+this.props.match.params.iddoc)
            .then(response => {
                this.setState({doctor: response.data});
                console.log(this.state.doctor);
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });

        axios
            .get('http://localhost:5000/api/patient/list_Access_By_Patient_id_And_Doc_Id/'+this.props.match.params.iduser+'/'+this.props.match.params.iddoc)
            .then((res) => {
                this.setState({visible : res.data});
            })
    }

    authorize = () => {

        axios
            .put('http://localhost:5000/api/patient/give_access/'+this.props.match.params.iddoc)
            .then((res) => {

                this.setState({visible : res.data.State});
                NotificationManager.info('Authorization added');
            })

        axios
            .post('http://localhost:5000/api/patient/add_notification',{
                sender: this.props.match.params.iduser,
                receiver: this.props.match.params.iddoc,
                message:"Authorization added",
                Checked: false,
            })
            .then((res) => {

            })



    }

    unauthorize = () => {
        axios
            .put('http://localhost:5000/api/patient/cancel_access/'+this.props.match.params.iddoc)
            .then((res) => {
                this.setState({visible : res.data.State});
                NotificationManager.info('UnAuthorization added');
            })

        axios
            .post('http://localhost:5000/api/patient/add_notification',{
                sender: this.props.match.params.iduser,
                receiver: this.props.match.params.iddoc,
                message:"Authorization Canceled",
                Checked: false,
            })
            .then((res) => {

            })


    }

    render() {
        let {doctor} = this.state;


        const buttonAuth = (
            <a onClick={this.authorize} className="btn_1 medium"> Authorize</a>
        );

        const buttonUnAuth =(
            < a onClick = {this.unauthorize} className = "btn_1 medium" > UnAuthorize </a>
        );

        return (
            <React.Fragment>
            <div id="breadcrumb">
                <div className="container">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">List users</a></li>
                        <li>Doctor details</li>
                    </ul>
                </div>
            </div>

        <div className="container margin_60">
            <div className="row">
                <aside className="col-xl-3 col-lg-4" id="sidebar">
                    <div className="box_profile">
                        <figure>
                            <img src="/images/doctor.jpg" alt="" className="img-fluid"/>
                        </figure>
                        <small>{doctor.specialty}</small>
                        <h1>DR. {doctor.firstName} {doctor.lastName}</h1>
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
                            <li><h6>Address</h6>{doctor.address}</li>
                            <li><h6>Phone</h6><a href="tel://000434323342">+216 {doctor.telNum}</a></li>
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
                                    <h3>Professional statement</h3>
                                    <p>Mussum ipsum cacilds, vidis litro abertis.</p>
                                </div>
                                <div className="wrapper_indent">
                                    <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget
                                        blandit nunc tortor eu nibh. Lorem ipsum dolor sit amet, consectetuer adipiscing
                                        elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
                                        aliquet vel, dapibus id, mattis vel, nisi. Nullam mollis. Phasellus hendrerit.
                                        Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapi.</p>
                                    <h6>Specializations</h6>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul className="bullets">
                                                <li>Abdominal Radiology</li>
                                                <li>Addiction Psychiatry</li>
                                                <li>Adolescent Medicine</li>
                                                <li>Cardiothoracic Radiology</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="bullets">
                                                <li>Abdominal Radiology</li>
                                                <li>Addiction Psychiatry</li>
                                                <li>Adolescent Medicine</li>
                                                <li>Cardiothoracic Radiology</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <hr/>

                                    <div className="indent_title_in">
                                        <i className="pe-7s-news-paper"></i>
                                        <h3>Education</h3>
                                        <p>Mussum ipsum cacilds, vidis litro abertis.</p>
                                    </div>
                                    <div className="wrapper_indent">
                                        <p>Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
                                            aliquet vel, dapibus id, mattis vel, nisi. Nullam mollis. Phasellus
                                            hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel,
                                            dapi.</p>
                                        <h6>Curriculum</h6>
                                        <ul className="list_edu">
                                            <li><strong>New York Medical College</strong> - Doctor of Medicine</li>
                                            <li><strong>Montefiore Medical Center</strong> - Residency in Internal
                                                Medicine
                                            </li>
                                            <li><strong>New York Medical College</strong> - Master Internal Medicine
                                            </li>
                                        </ul>
                                    </div>

                                    <hr/>

                                        <div className="indent_title_in">
                                            <i className="pe-7s-cash"></i>
                                            <h3>Prices &amp; Payments</h3>
                                            <p>Mussum ipsum cacilds, vidis litro abertis.</p>
                                        </div>
                                        <div className="wrapper_indent">
                                            <p>Zril causae ancillae sit ea. Dicam veritus mediocritatem sea ex, nec id
                                                agam eius. Te pri facete latine salutandi, scripta mediocrem et sed, cum
                                                ne mundi vulputate. Ne his sint graeco detraxit, posse exerci volutpat
                                                has in.</p>
                                            <table className="table table-responsive table-striped">
                                                <thead>
                                                <tr>
                                                    <th>Service - Visit</th>
                                                    <th>Price</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>New patient visit</td>
                                                    <td>$34</td>
                                                </tr>
                                                <tr>
                                                    <td>General consultation</td>
                                                    <td>$60</td>
                                                </tr>
                                                <tr>
                                                    <td>Back Pain</td>
                                                    <td>$40</td>
                                                </tr>
                                                <tr>
                                                    <td>Diabetes Consultation</td>
                                                    <td>$55</td>
                                                </tr>
                                                <tr>
                                                    <td>Eating disorder</td>
                                                    <td>$60</td>
                                                </tr>
                                                <tr>
                                                    <td>Foot Pain</td>
                                                    <td>$35</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <hr/>
                                            <div className="text-center">{ this.state.visible ? buttonUnAuth : buttonAuth }</div>
                            </div>
                            <NotificationContainer/>

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

export default Userdetails;