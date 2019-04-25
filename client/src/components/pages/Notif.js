import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';




class Notif extends Component {

    state={
        visible:true,
        sender: "",
        receiver: "",
        message:"",
        Checked:"",
        notif: this.props
    }







    render() {
        const {notif} = this.props;



        if(notif.Checked === false)
        {
            NotificationManager.info(notif.message);

            axios
                .put('http://localhost:5000/api/patient/check_notification/'+notif._id)
                .then((res) => {
                })


        }

        return (


            <NotificationContainer/>


               // <></>


        );
    }
}




export default Notif;