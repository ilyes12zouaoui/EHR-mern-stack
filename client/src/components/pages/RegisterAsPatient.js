import React, {Component} from 'react';
import axios from "axios";

class RegisterAsPatient extends Component {

    state = {
        patient: {},
        birthDate:"",
        city: "",
        country: "",
        address:"",
        telNum: "",
        blood_type: "",
        height:"",
        weight: "",
        description:"",
        physical_activityy:""

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

    onFormSubmit = (e) => {
        e.preventDefault();

        axios
            .put("http://localhost:5000/api/patient/add/"+this.props.user.id, {
                city: this.state.city,
                country: this.state.country,
                birthDate:this.state.birthDate,
                address: this.state.address,
                telNum: this.state.telNum,
                blood_type: this.state.blood_type,
                height: this.state.height,
                weight: this.state.weight,
                role:"Patient",
                physical_activityy:this.state.physical_activityy,
                physical_activity:"5cae535b1b7d7244d085106e",
                nutrition:"5cae5d7b4b4e8d0934de1e64"

            })
            .then(response => {
                console.log(this.state);
                this.props.history.push("/personalinformation");
                window.location.reload();
                console.log(this.state)

            })
            .catch(error => {
            });

        if (localStorage.user) {
            let user = JSON.parse(localStorage.user);
            user.role = "Patient";
            localStorage.setItem("user", JSON.stringify(user));
            this.setState({user});
        }

    };



/*     _calculateAge = (birthday)=> {
        let age = 0 ;
         let ageDifMs = Date.now() - birthday.getTime();
         let ageDate = new Date(ageDifMs); // miliseconds from epoch
         age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age;
    }*/

    render() {
        let {patient} = this.state;



        return (
            <div id="hero_register">
                <div className="container margin_120_95">
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>It's time to be with us<br></br> as a Patient!</h1>
                            <p className="lead">Te pri adhuc simul. No eros errem mea. Diam mandamus has ad. Invenire
                                senserit ad has, has ei quis iudico, ad mei nonumes periculis.</p>
                            <div className="box_feat_2">
                                <i className="pe-7s-map-2"></i>
                                <h3>Let patients to Find you!</h3>
                                <p>Ut nam graece accumsan cotidieque. Has voluptua vivendum accusamus cu. Ut per
                                    assueverit temporibus dissentiet.</p>
                            </div>
                            <div className="box_feat_2">
                                <i className="pe-7s-date"></i>
                                <h3>Easly manage Bookings</h3>
                                <p>Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet. Eum no
                                    atqui putant democritum, velit nusquam sententiae vis no.</p>
                            </div>
                            <div className="box_feat_2">
                                <i className="pe-7s-phone"></i>
                                <h3>Instantly via Mobile</h3>
                                <p>Eos eu epicuri eleifend suavitate, te primis placerat suavitate his. Nam ut dico
                                    intellegat reprehendunt, everti audiam diceret in pri, id has clita consequat
                                    suscipiantur.</p>
                            </div>
                        </div>
                        <div className="col-lg-5 ml-auto">
                            <div className="box_form">
                                <div id="message-register"></div>
                                <form  onSubmit={this.onFormSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Name"
                                                       name="firstName"
                                                       readOnly={true}
                                                       disabled={true}
                                                       value={this.props.user.firstName}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Last Name"
                                                       name="lastName"
                                                       readOnly={true}
                                                       disabled={true}
                                                       value={this.props.user.lastName}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="date" className="form-control" placeholder="birthDate (years)"
                                                       name="birthDate"
                                                       onChange={this.onInputChange}
                                                       value={patient.birthDate}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">

                                                <input type="text" id="country" name="country"
                                                       className="form-control" placeholder="Country"
                                                       value={patient.country}
                                                       onChange={this.onInputChange}/>
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="City"
                                                       name="city"
                                                       onChange={this.onInputChange} value={patient.city}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Address"
                                                       name="address" id="depart"
                                                       onChange={this.onInputChange} value={patient.address}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="Mobile Phone"
                                                       name="telNum"
                                                       onChange={this.onInputChange} value={patient.telNum}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="blood_type"
                                                       name="blood_type"
                                                       onChange={this.onInputChange} value={patient.blood_type}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="float" className="form-control" placeholder="height"
                                                       name="height"
                                                       onChange={this.onInputChange} value={patient.height}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="number"  className="form-control"
                                                       placeholder="weight"
                                                       name="weight"
                                                       onChange={this.onInputChange}  value={patient.weight}/>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text"  className="form-control"
                                                       placeholder="physical_activityy"
                                                       name="physical_activityy"
                                                       onChange={this.onInputChange}  value={patient.physical_activityy}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="submit" className="btn_1" value="Submit" id="submit-register"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterAsPatient;