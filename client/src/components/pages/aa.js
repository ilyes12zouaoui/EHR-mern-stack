import React from "react";

<React.Fragment>
    <div id="breadcrumb">
        <div className="container">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Category</a></li>
                <li>Patient information</li>
            </ul>
        </div>
    </div>

    <div className="container margin_60">
        <div className="row">
            <div className="col-xl-8 col-lg-8">
                <div className="box_general_3 cart">
                    <div className="form_title">
                        <h3><strong>1</strong>Details of {user.firstName} {user.lastName}</h3>

                    </div>
                    <div className="step">

                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" id="email" name="email"
                                           className="form-control" placeholder="E-mail" value={user.email}/>
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
                            </div>

                        </div>

                        <hr/>


                    </div>




                </div>
            </div>
        </div>
    </div>
</React.Fragment>