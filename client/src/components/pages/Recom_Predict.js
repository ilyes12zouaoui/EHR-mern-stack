import React, { Component } from "react";
import axios from "axios";
import { Button,Modal} from 'react-bootstrap';


class Recom_Predict extends Component {


   /* state = {
        patient: {},
        description:"",
        show: false

    };*/

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleShow1 = this.handleShow1.bind(this);
        this.handleClose1 = this.handleClose1.bind(this);


        this.state = {
            patient: {},
            description:"",
            show: false,
            show1: false,
            predict:{},
            drug:""



        };
    }


    /*componentDidMount() {
        axios
            .get('http://localhost:5000/api/brain/recomm/'+this.props.user.id)
            .then(response => {
                this.setState({user: response.data});
                console.log(this.state.user);
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });



    }*/



    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    handleClose1() {
        this.setState({ show1: false });
    }

    handleShow1() {
        this.setState({ show1: true });
    }


    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        axios
            .put("http://localhost:5000/api/patient/add/"+this.props.user.id, {
                description: e.target.value,

            })
            .then(response => {

            })
            .catch(error => {
            });
    };



    Predict = () => {

        axios
            .get('http://localhost:5000/api/brain/predict/'+this.props.user.id)
            .then( response => {
               // console.log("=Respponse"+JSON.stringify(response.data))

                 this.setState({predict: response.data});


                console.log(response.data);


                         })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });



        this.setState({ show: true });

    };


    recommendation = () => {

        axios
            .get('http://localhost:5000/api/brain/recomm/'+this.props.user.id)
            .then(response => {
                this.setState({drug: response.data});

            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });



        this.setState({ show1: true });

    };








    render() {
        let {patient} = this.state;
        let {predict} = this.state;
        let {drug} = this.state;

        console.log("aaaaaaa"+this.state.predict)


        return (
            <div id="error_page">
            <div class="container margin_60">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 offset-lg-2">
                        <nav id="secondary_nav">
                            <div class="container">
                                <ul class="clearfix">
                                    <li>
                                        <a href="#section_1" class="active">

                                        </a>
                                    </li>
                                    <li>
                                        <a href="#section_2" />
                                    </li>
                                    <li>
                                        <a href="#sidebar" />
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div id="section_1">
                            <div class="box_general_3">
                                <div class="profile">
                                    <div class="row">
                                        <div className="col-xl-12 col-lg-8">
                                            <div className="box_general_3 cart">
                                                <div className="form_title">
                                                    <h3><strong></strong>Recommendation/Prediction</h3>

                                                </div>
                                                <div className="step">

                                                    <div className="row">
                                                        <div className="col-md-12 col-sm-4">
                                                            <div className="form-group">
                                                                <label>First name</label>
                                                                     <textarea type="text" className="form-control"
                                                                       id="description"
                                                                       name="description" placeholder="your Symptoms" required
                                                                                   onChange={this.onInputChange}
                                                                                   value={patient.description}/>

                                                                <div id="pass-info" className="clearfix">
                                                                    {this.state.errors && this.state.errors.description && (
                                                                        <div
                                                                            style={{
                                                                                color: "red",
                                                                                fontWeight: 500,
                                                                                margin: "5px"
                                                                            }}
                                                                        >
                                                                            {this.state.errors.description}
                                                                        </div>
                                                                    )}


                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                        <Button onClick={this.Predict} className="btn_1 medium">
                                                            prediction (diseases)
                                                        </Button>

                                                    <br/><br/>

                                                    <Button onClick={this.recommendation} className="btn_1 medium">
                                                        Recommendation (drugs)
                                                    </Button>




                                                    <Modal show={this.state.show} onHide={this.handleClose} {...this.props}
                                                           size="lg"
                                                           aria-labelledby="contained-modal-title-vcenter"
                                                           centered>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Your prediction about diseases</Modal.Title>
                                                        </Modal.Header>



                                                        <Modal.Body>


                                                            <h4> You probably have : <h2 >   Grippe : {(this.state.predict &&
                                                                parseFloat(Math.round(Number(this.state.predict.Grippe) * 10000) / 100).toFixed(2)
                                                                 )} % <br/>

                                                                Rhume : {(this.state.predict &&
                                                                    parseFloat(Math.round(Number(this.state.predict.Rhume) * 10000) / 100).toFixed(2)
                                                                )} % <br/>

                                                                Angine : {(this.state.predict &&
                                                                    parseFloat(Math.round(Number(this.state.predict.Angine) * 10000) / 100).toFixed(2)
                                                                )} % <br/>

                                                                Diarrhee : {(this.state.predict &&
                                                                    parseFloat(Math.round(Number(this.state.predict.Diarrhee) * 10000) / 100).toFixed(2)
                                                                )} % <br/>










                                                            </h2> </h4>


                                                        </Modal.Body>



                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={this.handleClose}>
                                                                Close
                                                            </Button>

                                                        </Modal.Footer>
                                                    </Modal>



                                                    <Modal show={this.state.show1} onHide={this.handleClose1} {...this.props}
                                                           size="lg"
                                                           aria-labelledby="contained-modal-title-vcenter"
                                                           centered>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Your recommendation about drugs</Modal.Title>
                                                        </Modal.Header>



                                                        <Modal.Body>



                                                            <h4> We advise you to take the medicine : <h1 style={{ color: 'red' }}> {drug} </h1> </h4>

                                                        </Modal.Body>



                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={this.handleClose1}>
                                                                Close
                                                            </Button>

                                                        </Modal.Footer>
                                                    </Modal>






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
            </div>
        );
    }
}

export default Recom_Predict;
