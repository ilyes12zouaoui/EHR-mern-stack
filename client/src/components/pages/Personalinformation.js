import React, {Component} from 'react';
import axios from "axios";
import {NotificationManager} from "react-notifications";

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
            .get('http://localhost:5000/api/patient/getuserById/'+this.props.user.id)
            .then(response => {
                this.setState({user: response.data});
                console.log(this.state.user);
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });

        axios
    .get('http://localhost:5000/api/patient/physical_activity_By_User/'+this.props.user.id)
            .then(response => {
                this.setState({physical_activity: response.data});
                console.log(this.state.physical_activity);
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });

        axios
            .get('http://localhost:5000/api/patient/nutrition_By_User/'+this.props.user.id)
            .then(response => {
                this.setState({nutrition: response.data});
                console.log(this.state.nutrition);
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });
    }


    update = () => {

        this.props.history.push("/UpdateHealthInfoamtions");

    };


    render() {
        let {user} = this.state;
        let {physical_activity} = this.state;
        let {nutrition} = this.state;

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
                        <li><a href="#">Category</a></li>
                        <li>Personal information</li>
                    </ul>
                </div>
            </div>

            <div className="container margin_60">
                <div className="row">
                    <div className="col-xl-8 col-lg-8">
                        <div className="box_general_3 cart">
                            <div className="form_title">
                                <h3><strong>1</strong>Your Details</h3>

                            </div>
                            <div className="step">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>First name</label>
                                            <input type="text" className="form-control" id="firstName"
                                                   name="firstName" placeholder="first Name" value={this.props.user.firstName} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Last name</label>
                                            <input type="text" className="form-control" id="lastName"
                                                   name="lastName" placeholder="last Name" value={this.props.user.lastName}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" id="email" name="email"
                                                   className="form-control" placeholder="E-mail" value={this.props.user.email}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Birth Date</label>
                                            <input type="text" id="birthDate" name="birthDate"
                                                   className="form-control" placeholder="Birth Date" value={_calculateAge(new Date(user.birthDate))+" years"}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Telephone</label>
                                            <input type="text" id="telNum" name="telNum"
                                                   className="form-control" placeholder="Phone Number" value={user.telNum}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>CIN</label>
                                            <input type="text" id="cin" name="cin"
                                                   className="form-control" placeholder="CIN" value={user.cin}/>
                                        </div>
                                    </div>
                                </div>


                                </div>

                            <hr/>

                            <div className="form_title">
                                <h3><strong>2</strong>Billing Address</h3>

                            </div>
                            <div className="step">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input type="text" id="country" name="country"
                                                   className="form-control" placeholder="Country" value={user.country}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input type="text" id="address" name="address"
                                                   className="form-control" placeholder="Address" value={user.address}/>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" id="city" name="city"
                                                   className="form-control" placeholder="City" value={user.city}/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {this.props.user.role == 'Doctor'?
                            <div>
                                <hr/>

                                <div className="form_title">
                                    <h3><strong>3</strong>Doctor information</h3>

                                </div>
                                <div className="step">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Specialty</label>
                                                <input type="text" id="specialty" name="specialty"
                                                       className="form-control" placeholder="Specialty" value={user.specialty}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input type="text" id="description" name="description"
                                                       className="form-control" placeholder="Description" value={user.description}/>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                                : null }

                            {this.props.user.role == 'Patient'?
                          <div>
                            <hr/>

                                    <div className="form_title">
                                        <h3><strong>3</strong>Health information</h3>

                                    </div>
                                    <div className="step">
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

                                    </div>

                            <hr/>


                          </div>
                            : null }


                            <a onClick={() => this.update()}  className="btn_1 medium">  Update</a>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Personalinformation;