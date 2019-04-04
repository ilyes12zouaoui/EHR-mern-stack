import React, {Component} from "react";
import "../assets/css/doctorSpacePage.css";

class DoctorSpacePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="margin_60" style={{paddingLeft: "80px", paddingRight: "80px"}}>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 patientDetails box_general_3">
                        <div className="title">
                            <h3>Patient details</h3>
                        </div>
                        <p>
                            <b>Name : </b> Haythem Bel Haj Youssef &emsp;&emsp;
                            <b>Day of birth : </b> 27/06/1993 &emsp;&emsp;
                            <b>Age : </b> 26 &emsp;&emsp;
                            <b>Allergies : </b> Penicilin &emsp;&emsp;
                            <b>Address : </b> El Ghazala &emsp;&emsp;
                            <b>NHS : </b> 214 856 7201 &emsp;&emsp;
                            <b>Live consultation : </b><i id="video-call" className="icon-videocam"></i>
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-3 col-lg-3 patientDetails box_general_3">
                <span>
                    <img src="images/patient.jpg" alt="" width="150" height="150"
                         className="img-thumbnail"/>
                </span><br/><br/>
                        <div className="form-group">
                            <textarea className="form-control rounded-0" rows="10"
                                      placeholder="Your message ..."></textarea>
                        </div>
                        <div className="form-group float-right">
                            <button className="btn btn-success">Send</button>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 offset-1 patientDetails box_general_3">
                        <h6 className="text-center">FURTHER PATIENT DETAILS</h6>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                All
                                <span className="badge badge-primary badge-pill">11</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Alerts
                                <span className="badge badge-primary badge-pill">2</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Allergies
                                <span className="badge badge-primary badge-pill">1</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Clinical documents
                                <span className="badge badge-primary badge-pill">3</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Hospital/Clinic attended
                                <span className="badge badge-primary badge-pill">4</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Results
                                <span className="badge badge-primary badge-pill">1</span>
                            </li>
                        </ul>
                        <br/>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Filter"
                                   style={{border: "2px solid #000000"}}/>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                2019
                                <span className="badge badge-primary badge-pill">5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                2018
                                <span className="badge badge-primary badge-pill">2</span>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xl-4 col-lg-4 offset-1 patientDetails box_general_3">
                        <h6 className="text-center">05/02/2019 Cardiology clinic letter</h6><br/><br/>
                        <p className="text-center"> Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat
                            cu pri. In
                            eum omnes molestie
                            Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes
                            molestie
                            Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes
                            molestie
                            Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes
                            molestie
                            Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes
                            molestie
                            Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes
                            molestie</p>
                    </div>


                </div>


            </div>
        );
    }
}

export default DoctorSpacePage;
