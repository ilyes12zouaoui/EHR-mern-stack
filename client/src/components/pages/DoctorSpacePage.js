import React, {Component} from "react";
import "../assets/css/doctorSpacePage.css";
import axios from "axios";
import moment from "moment"
import CallModal from "./CallModal";
import {NavLink} from "react-router-dom";

class DoctorSpacePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {},
            modalShow: false,
            message: "",
            alerts: [],
            plusDetails: {
                date: '',
                title: '',
                message: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        axios
            .get('http://165.165.131.37:3000/api/tn.esprit.ehr.Patient/' + this.props.match.params.id + '?filter[include]=resolve&access_token=8P2boEDOjyVcMjcp6qrj9qOHawCO0ffW5qEWPoJJFbArqZhFqp3XDx6gFjC51ASU')
            .then(response => {
                this.setState({
                    patient: response.data
                });
                axios
                    .get('http://165.165.131.37:3000/api/tn.esprit.ehr.Alert?filter={"patient":"' + response.data.patientId + '", "include":"resolve"}&access_token=8P2boEDOjyVcMjcp6qrj9qOHawCO0ffW5qEWPoJJFbArqZhFqp3XDx6gFjC51ASU')
                    .then(response => {
                        this.setState({
                            alerts: response.data
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });

    }

    onInputChange(e) {
        // console.log({ [e.target.name]: e.target.value });
        //console.log(e.currentTarget);
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://165.165.131.37:3000/api/tn.esprit.ehr.Alert?access_token=8P2boEDOjyVcMjcp6qrj9qOHawCO0ffW5qEWPoJJFbArqZhFqp3XDx6gFjC51ASU', {
            message: this.state.message,
            alertId: Math.floor(Math.random() * 9999) + 1,
            title: 'Alert 3',
            date: new Date(),
            patient: 'tn.esprit.ehr.Patient#' + this.props.match.params.id
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    modalClose = () => this.setState({modalShow: false});

    render() {
        let {patient} = this.state;
        let {alerts} = this.state;
        let n2018 = 0;
        let n2019 = 0;
        let arr2018 = [];
        let arr2019 = [];

        function _calculateAge(birthday) {
            // birthday is a date
            let ageDifMs = Date.now() - birthday.getTime();
            let ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        console.log(patient);
        patient.mriResults && patient.mriResults.forEach(m => {
            if (moment(m.testDate).format('YYYY') == 2019) {
                n2019++;
                arr2019.push(m);
            } else {
                n2018++;
                arr2018.push(m);
            }
        });

        patient.labTestResults && patient.labTestResults.forEach(m => {
            if (moment(m.testDate).format('YYYY') == 2019) {
                n2019++;
                arr2019.push(m);
            } else {
                n2018++;
                arr2018.push(m);
            }
        });
        return (
            <div className="margin_60" style={{paddingLeft: "80px", paddingRight: "80px"}}>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 patientDetails box_general_3">
                        <div className="title">
                            <div className="dropdown">
                                <button id="dropdownMenuPatient" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false" style={{backgroundColor: "transparent"}}>
                                    <h3>Patient details<i className="icon-down-open-mini"/></h3>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuPatient">
                                    <NavLink
                                        to={"/DoctorSpace/0278"}
                                        activeClassName="active-link"
                                        exact={true}
                                    ><b style={{color: "black"}}>Patient details</b></NavLink><br/><br/>

                                    <NavLink
                                        to={"/CreatePrescription/0278"}
                                        activeClassName="active-link"
                                        exact={true}
                                    >
                                        <b style={{color: "black"}}>Create prescription</b>
                                    </NavLink>
                                </div>
                            </div>

                        </div>
                        <p>
                            <b>Name : </b>{patient.firstName + ' ' + patient.lastName}  &emsp;&emsp;
                            <b>Day of birth : </b> {moment(patient.Dob).format('YYYY-MM-DD')} &emsp;&emsp;
                            <b>Age : </b> {_calculateAge(new Date(patient.Dob))} &emsp;&emsp;
                            <b>Allergies : </b> Penicillin &emsp;&emsp;
                            <b>Address : </b> {patient.address && patient.address.city} &emsp;&emsp;
                            {/*<b>Request access </b>*/}
                            {/*<i className="pe-7s-lock text-success video-call">*/}
                            {/*</i> &emsp;&emsp;*/}
                            <b>Live consultation : </b>
                            <i className="icon-videocam video-call"
                               onClick={() => this.setState({modalShow: true})}>
                            </i>
                            <CallModal
                                show={this.state.modalShow}
                                onHide={this.modalClose}
                            />
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-3 col-lg-3 patientDetails box_general_3">
                <span>
                    <img src={"../images/" + patient.ImageURL} alt="" width="150" height="150"
                         className="img-thumbnail"/>
                </span><br/><br/>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <textarea name="message"
                                      className="form-control rounded-0"
                                      rows="10"
                                      placeholder="Your message ..."
                                      value={this.state.message}
                                      onChange={this.onInputChange}
                            >

                            </textarea>
                            </div>
                            <div className="form-group float-right">
                                <button className="btn btn-success" type="submit">Send</button>
                            </div>
                        </form>
                    </div>


                    <div className="col-xl-3 col-lg-3 offset-1 patientDetails box_general_3">
                        <h6 className="text-center">FURTHER PATIENT DETAILS</h6>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                All
                                <span className="badge badge-primary badge-pill">
                                    {"0" && patient.allergies && patient.allergies.length + alerts.length + patient.mriResults.length +
                                    patient.chronicDiseases.length + patient.labTestResults.length}
                                </span>
                            </li>
                            <div className="dropdown">
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    id="dropdownMenuAlert" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Alerts
                                    <span
                                        className="badge badge-primary badge-pill">{alerts.length}</span>
                                </li>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuAlert">
                                    {alerts.map(a => {
                                        return (
                                            <button className="dropdown-item" href="#"
                                                    onClick={() => {
                                                        this.setState({
                                                            plusDetails: {
                                                                date: moment(a.date).format('YYYY-MM-DD'),
                                                                title: a.title,
                                                                message: a.message
                                                            }
                                                        })
                                                    }}
                                            >{a.title}</button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="dropdown">
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    id="dropdownMenuAllergies" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Allergies
                                    <span
                                        className="badge badge-primary badge-pill"
                                    >{"0" && patient.allergies && patient.allergies.length}</span>
                                </li>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuAllergies">
                                    {patient.allergies && patient.allergies.map(a => {
                                        return (
                                            <button className="dropdown-item" href="#"
                                                    onClick={() => {
                                                        this.setState({
                                                            plusDetails: {
                                                                date: '',
                                                                title: '',
                                                                message: a.treatmentBrief
                                                            }
                                                        })
                                                    }}
                                            >{a.name}</button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="dropdown">
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    id="dropdownMenuMriResults" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    MRI Results
                                    <span
                                        className="badge badge-primary badge-pill">
                                    {"0" && patient.mriResults && patient.mriResults.length}</span>
                                </li>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuMriResults">
                                    {patient.mriResults && patient.mriResults.map(a => {
                                        return (
                                            <button className="dropdown-item" href="#"
                                                    onClick={() => {
                                                        this.setState({
                                                            plusDetails: {
                                                                date: moment(a.date).format('YYYY-MM-DD'),
                                                                title: a.title,
                                                                message: a.description
                                                            }
                                                        })
                                                    }}
                                            >{a.title}</button>
                                        )
                                    })}

                                </div>
                            </div>

                            <div className="dropdown">
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    id="dropdownMenuChronicDiseases" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Chronic diseases
                                    <span
                                        className="badge badge-primary badge-pill">
                                    {"0" && patient.chronicDiseases && patient.chronicDiseases.length}</span>
                                </li>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuChronicDiseases">
                                    {patient.chronicDiseases && patient.chronicDiseases.map(a => {
                                        return (
                                            <button className="dropdown-item" href="#"
                                                    onClick={() => {
                                                        this.setState({
                                                            plusDetails: {
                                                                date: '',
                                                                title: a.name,
                                                                message: ''
                                                            }
                                                        })
                                                    }}
                                            >{a.name}</button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="dropdown">
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    id="dropdownMenuLabTestResults" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Lab test Results
                                    <span
                                        className="badge badge-primary badge-pill">
                                    {"0" && patient.labTestResults && patient.labTestResults.length}</span>
                                </li>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLabTestResults">
                                    {patient.labTestResults && patient.labTestResults.map(lab => {
                                        return (
                                            <button className="dropdown-item" href="#"
                                                    onClick={() => {
                                                        this.setState({
                                                            plusDetails: {
                                                                date: moment(lab.testDate).format('YYYY-MM-DD'),
                                                                title: lab.title,
                                                                message: lab.description
                                                            }
                                                        })
                                                    }}
                                            >{lab.title}</button>
                                        )
                                    })}
                                </div>
                            </div>
                        </ul>
                        <br/>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Filter"
                                   style={{border: "2px solid #000000"}}/>
                        </div>
                        <ul className="list-group">
                            <div className="dropdown">
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    id="dropdownMenu2019" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    2019
                                    <span className="badge badge-primary badge-pill">{n2019}</span>
                                </li>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2019">
                                    {arr2019.map(a => {
                                        console.log(arr2019);
                                        return (
                                            <button className="dropdown-item" href="#"
                                                    onClick={() => {
                                                        this.setState({
                                                            plusDetails: {
                                                                date: moment(a.date).format('YYYY-MM-DD'),
                                                                title: a.title,
                                                                message: a.description
                                                            }
                                                        })
                                                    }}
                                            >{a.title}</button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="dropdown">
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    id="dropdownMenu2018" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    2018
                                    <span className="badge badge-primary badge-pill">{n2018}</span>
                                </li>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2018">
                                    {arr2018.map(a => {
                                        return (
                                            <button className="dropdown-item" href="#"
                                                    onClick={() => {
                                                        this.setState({
                                                            plusDetails: {
                                                                date: moment(a.date).format('YYYY-MM-DD'),
                                                                title: a.title,
                                                                message: a.description
                                                            }
                                                        })
                                                    }}
                                            >{a.title}</button>
                                        )
                                    })}
                                </div>
                            </div>
                        </ul>
                    </div>

                    <div className="col-xl-4 col-lg-4 offset-1 patientDetails box_general_3">
                        <h6 className="text-center">{this.state.plusDetails.date + ' ' + this.state.plusDetails.title} </h6>
                        <br/><br/>
                        <p className="text-center"> {this.state.plusDetails.message}</p>
                    </div>


                </div>


            </div>
        );
    }
}

export default DoctorSpacePage;
