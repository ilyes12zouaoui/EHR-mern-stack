import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";

class Medicament extends Component {

    state={
        visible:true
    }
    componentDidMount() {
        axios
            .get('http://localhost:5000/api/PharmacistANDThirdParty/medicaments')
            .then(response => {
                this.setState({medicament: response.data,visible : response.data.isRefundable});
            })
            .catch(error => {
                const {errors} = error.response.data;
                console.log(errors);
                this.setState({errors: errors});
            });
    }

    authorize =(id) => {
        console.log(id+"aaaaa")
        axios
            .put('http://localhost:5000/api/PharmacistANDThirdParty/approve_refund/'+id,
                {
                    "isRefundable": "true"
                })

            .then((res) => {

                    this.setState({visible : !res.data.isRefundable});
                }

            )


    };


    unauthorize =(id) => {
        console.log(id+"aaaaa")
        axios
            .put('http://localhost:5000/api/PharmacistANDThirdParty/approve_refund/'+id,
                {
                    "isRefundable": "false"
                })

            .then((res) => {

                    this.setState({visible : !res.data.isRefundable});
                }

            )


    };



    render() {
        const {medicament} = this.props;

        const buttonAuth = (
            <li><a onClick={this.authorize()}> Approve Refund</a></li>
        );

        const buttonUnAuth =(
            <li> < a onClick = {this.unauthorize()} > Disapprove Refund </a></li >
        );

        return (
            <div className="container margin_60_35">
                <div className="row">




                    <div className="col-lg-7">

                        {this.state.medicament.map((medicament,index)=>(

                            <div className="strip_list wow fadeIn">
                                <a href="#0" className="wish_bt"></a>
                                <figure>
                                    <a href="detail-page.html"><img src="http://via.placeholder.com/565x565.jpg" alt=""/></a>
                                </figure>

                                <h3>{medicament.name}</h3>
                                <p>{medicament.description}</p>
                                <span> {medicament.price} DT</span>
                                <a href="badges.html" data-toggle="tooltip" data-placement="top"
                                   data-original-title="Badge Level" className="badge_list_1"><img
                                    src="img/badges/badge_1.svg" width="15" height="15" alt=""/></a>
                                <ul>
                                    <li ><a href="#0" onClick="onHtmlClick('Doctors', 0)" className="btn_listing">
                                    </a></li>
                                    <li></li>
                                    { this.state.visible ? buttonAuth : buttonUnAuth }
                                </ul>
                            </div>

                        ))}

                        <nav aria-label="" className="add_top_20">
                            <ul className="pagination pagination-sm">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1">Previous</a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>







                </div>
            </div>
        );
    }
}

export default Medicament;