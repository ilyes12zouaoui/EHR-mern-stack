import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Button, Modal} from "react-bootstrap";


class Patient extends Component {


    state = {
        notif: [],
        access: {},
        etat: Boolean,
        show: false

    }

    componentDidMount() {

        axios
            .get('http://localhost:5000/api/patient/get_Notification_By_Id/' + this.props.user.id)
            .then(response => {
                this.setState({notif: response.data});


            })
            .catch(error => {
                const {errors} = error.response.data;
                this.setState({errors: errors});
            });


        axios
            .get('http://localhost:5000/api/patient/access_By_DocID_And_PatientID/' + this.props.user.id + '/' + this.props.doc._id)
            .then(response => {
                this.setState({access: response.data[0]});

                //console.log("aaaaa"+response.data)
            })


    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    verifiy = () => {

        //console.log("modallllllllllllll")

        this.setState({show: true});

    };


    render() {
        const {doc} = this.props;
        let {access} = this.state;


        return (
            <div className="col-md-6">
                <div className="box_list wow fadeIn">
                    <a href="#0" className="wish_bt"></a>
                    <figure>

                        {this.state.access && this.state.access.State === true ?

                            (<NavLink
                                to={`/patientdetails/${doc._id}`}
                                activeClassName="active-link"
                                exact={true}
                            ><img src="images/patient.jpg"
                                  className="img-fluid" alt=""/>
                                <div className="preview"><span>Read more</span></div>
                            </NavLink>)

                            : (<React.Fragment><NavLink onClick={() => this.verifiy()}><img src="images/patient.jpg"
                                                                                            className="img-fluid"
                                                                                            alt=""/>
                                    <div className="preview"><span>Read more</span></div>


                                </NavLink>
                                    <Modal show={this.state.show} onHide={this.handleClose} {...this.props}
                                           size="lg"
                                           aria-labelledby="contained-modal-title-vcenter"
                                           centered>
                                        <Modal.Header closeButton>
                                        </Modal.Header>


                                        <Modal.Body>


                                            <h4>You don't have access to {doc.firstName} {doc.lastName}  </h4>


                                        </Modal.Body>


                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                            </Button>

                                        </Modal.Footer>
                                    </Modal>
                                </React.Fragment>
                            )}


                    </figure>
                    <div className="wrapper">
                        <small>{doc.email}</small>
                        <h3>Patient. {doc.firstName} {doc.lastName}</h3>

                        <p>{doc.city}</p>
                        <span className="rating"><i className="icon_star voted"></i><i
                            className="icon_star voted"></i><i
                            className="icon_star voted"></i><i
                            className="icon_star"></i><i className="icon_star"></i> <small>(145)</small></span>
                        <a href="badges.html" data-toggle="tooltip" data-placement="top"
                           data-original-title="Badge Level" className="badge_list_1"><img
                            src="img/badges/badge_1.svg" width="15" height="15" alt=""/></a>
                    </div>
                    <ul>
                        <li hi><a href="#0" onClick="onHtmlClick('Doctors', 0)"></a></li>
                        <li><a
                            href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x0:0xa6a9af76b1e2d899!2sAssistance+%E2%80%93+H%C3%B4pitaux+De+Paris!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361"
                            target="_blank"><i className="icon_pin_alt"></i>Directions</a></li>


                    </ul>

                </div>


            </div>

        );
    }
}


export default Patient;
