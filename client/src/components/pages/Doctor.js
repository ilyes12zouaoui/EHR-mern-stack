import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import DoctorSpacePage2 from "./DoctorSpacePage2";




class Doctor extends Component {

    state={
        visible:true,
        sender: "",
        receiver: "",
        message:"",
        Checked:""
    }
    componentWillMount(){
        axios
            .get('http://localhost:5000/api/patient/list_Access_By_Patient_id_And_Doc_Id/'+this.props.user.id+'/'+this.props.doc._id)
            .then((res) => {
            this.setState({visible : res.data});
        })
    }

    authorize = () => {

        axios
            .put('http://localhost:5000/api/patient/give_access/'+this.props.doc._id)
            .then((res) => {
            this.setState({visible : res.data.State});
            NotificationManager.info('Authorization added');
        })

        axios
            .post('http://localhost:5000/api/patient/add_notification',{
                sender: this.props.user.id,
                receiver: this.props.doc._id,
                message:"Authorization added",
                Checked: false,
            })
            .then((res) => {

            })

       /* setTimeout(()=>{


            axios
                .put('http://localhost:5000/api/patient/cancel_access/'+this.props.doc._id)
                .then((res) => {
                    this.setState({visible : res.data.State});
                    NotificationManager.info('UnAuthorization added');
                })

            axios
                .post('http://localhost:5000/api/patient/add_notification',{
                    sender: this.props.user.id,
                    receiver: this.props.doc._id,
                    message:"Authorization Canceled",
                    Checked: false,
                })
                .then((res) => {

                })


        }, 3000); // 18000000 apres une 30min ama hethi apres 3 secondes*/





    }

    unauthorize = () => {
        axios
            .put('http://localhost:5000/api/patient/cancel_access/'+this.props.doc._id)
            .then((res) => {
                this.setState({visible : res.data.State});
                NotificationManager.info('UnAuthorization added');
            })

        axios
            .post('http://localhost:5000/api/patient/add_notification',{
                sender: this.props.user.id,
                receiver: this.props.doc._id,
                message:"Authorization Canceled",
                Checked: false,
            })
            .then((res) => {

            })






    }





    render() {
        const {doc} = this.props;

        const buttonAuth = (
            <li><a onClick={this.authorize}  className="btn_1 medium">  Authorize</a></li>

        );

        const buttonUnAuth =(
            < li > < a onClick = {this.unauthorize} className = "btn_1 medium" > UnAuthorize </a></li >


        );

        return (
            <div className="col-md-6">
                <div className="box_list wow fadeIn">
                    <a href="#0" className="wish_bt"></a>
                    <figure>
                        <NavLink
                            to={`/userdetails/${doc._id}/${this.props.user.id}`}
                            activeClassName="active-link"
                            exact={true}
                        ><img src="images/doctor.jpg"
                              className="img-fluid" alt=""/>
                            <div className="preview"><span>Read more</span></div>
                        </NavLink>
                    </figure>
                    <div className="wrapper">
                        <small>{doc.specialty}</small>
                        <h3>Dr. {doc.firstName} {doc.lastName}</h3>

                        <p>{doc.description}</p>
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
                        { this.state.visible ? buttonUnAuth : buttonAuth }



                    </ul>

                </div>

                <NotificationContainer/>
            </div>

        );
    }
}




export default Doctor;