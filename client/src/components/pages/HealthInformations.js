import React, {Component} from 'react';
import axios from "axios";
import {NotificationManager} from "react-notifications";

class HealthInformations extends Component {

    state = {
        patient: {},
        blood_type: "",
        height:"",
        weight: "",
        physical_activityy:"",
        user:[]


    };

    //instance = React.createRef();

    /*componentDidMount() {

        const s2 = document.createElement("script");
        s2.type = "text/javascript";
        s2.async = true;
        s2.src = "templeteAssets/js/map.js";
        this.instance.appendChild(s2);
    }*/


    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
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


    }

    onFormSubmit = (e) => {
        e.preventDefault();

        axios
            .put("http://localhost:5000/api/patient/add/"+this.props.user.id, {

                blood_type: this.state.blood_type,
                height: this.state.height,
                weight: this.state.weight,
                physical_activityy: this.state.physical_activityy,


            })
            .then(response => {
                console.log(this.state);
                this.props.history.push("/personalinformation");
                window.location.reload();
                console.log(this.state)

            })
            .catch(error => {
            });



    };



    /*     _calculateAge = (birthday)=> {
            let age = 0 ;
             let ageDifMs = Date.now() - birthday.getTime();
             let ageDate = new Date(ageDifMs); // miliseconds from epoch
             age = Math.abs(ageDate.getUTCFullYear() - 1970);
            return age;
        }*/





    render() {
        let {user} = this.state;
        let {patient} = this.state;

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
                            <li>Update your Personal information</li>
                        </ul>
                    </div>
                </div>

                <div className="container margin_60">

                    <form  onSubmit={this.onFormSubmit}>
                    <div className="row">
                        <div className="col-xl-8 col-lg-8">
                            <div className="box_general_3 cart">








                                {this.props.user.role == 'Patient'?
                                    <div>


                                        <div className="form_title">
                                            <h3><strong>1</strong>Health information</h3>

                                        </div>
                                        <div className="step">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Blood type</label>
                                                        <input type="text" id="blood_type" name="blood_type"
                                                               className="form-control" placeholder={user.blood_type}
                                                               onChange={this.onInputChange}
                                                               value={patient.blood_type}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Height</label>
                                                        <input type="text" id="height" name="height"
                                                               className="form-control" placeholder={user.height}
                                                               onChange={this.onInputChange}
                                                               value={patient.height}/>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">

                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Weight</label>
                                                        <input type="text" id="weight" name="weight"
                                                               className="form-control" placeholder={user.weight}
                                                               onChange={this.onInputChange}
                                                               value={patient.weight}/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>physical_activityy</label>
                                                    <input type="text" id="physical_activityy" name="physical_activityy"
                                                           className="form-control" placeholder={user.physical_activityy}
                                                           onChange={this.onInputChange}
                                                           value={patient.physical_activityy}/>
                                                </div>
                                            </div>
                                            </div>


                                        </div>

                                        <hr/>


                                    </div>
                                    : null }


                                <input type="submit" className="btn_1 medium" value="Submit" id="submit-register"/>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default HealthInformations;