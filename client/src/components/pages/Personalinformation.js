import React, {Component} from 'react';

class Personalinformation extends Component {
    render() {
        return (
            <div id="hero_register">
                <div className="container margin_120_95">
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>It's time to be with us !</h1>
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
                                <form method="post" action="assets/register_doctor.php" id="register_doctor">
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Name"
                                                       name="name_register" id="name_register"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Last Name"
                                                       name="lastname_register" id="lastname_register"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="birthDate"
                                                       name="specialization" id="specialization"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="City"
                                                       name="city_register" id="city_register"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <select className="form-control" name="country_register"
                                                        id="country_register">
                                                    <option value="">Country</option>
                                                    <option value="Europe">Europe</option>
                                                    <option value="Asia">Asia</option>
                                                    <option value="Unated States">Unated States</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Address"
                                                       name="address_register" id="address_register"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Mobile Phone"
                                                       name="mobile_register" id="mobile_register"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="blood_type"
                                                       name="office_phone_register" id="office_phone_register"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="height"
                                                       name="email_register" id="email_register"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" id="verify_register" className="form-control"
                                                       placeholder="weight"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div><input type="submit" className="btn_1" value="Submit" id="submit-register"/>
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

export default Personalinformation;