import React, {Component} from 'react';
import axios from "axios";

class List_access extends Component {

    state = {
        user: [],
    };

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/patient/user_From_Access/'+this.props.user.id)
            .then(response => {
                this.setState({user: response.data});

            })
            .catch(error => {
                const {errors} = error.response.data;
                this.setState({errors: errors});
            });

    }


    unauthorize = (id) => {

        window.location.reload();

        axios
            .put('http://localhost:5000/api/patient/cancel_access_byID/'+id)
            .then((res) => {

            })
    }


    render() {
        let {user} = this.state;
        console.log(this.state.user);

        return (

            <React.Fragment>
                <div id="breadcrumb">
                    <div className="container">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Category</a></li>
                            <li>List access</li>
                        </ul>
                    </div>
                </div>

                <div className="container margin_60">
                    <div className="row justify-content-center">

                        <h2>List Access</h2>
                        <br/><br/><br/><br/>
                        <table id="annoncesTable" className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>E-mail</th>
                                <th>Specialty</th>
                                <th>City</th>
                                <th>Phone number</th>
                                <th>Action</th>


                            </tr>
                            </thead>


                            <tbody>
                            {this.state.user.map((userr, index) => (
                            <tr>

                                <td>{userr.SingleUser.firstName}</td>
                                <td>{userr.SingleUser.lastName}</td>
                                <td>{userr.SingleUser.email}</td>
                                <td>{userr.SingleUser.specialty}</td>
                                <td>{userr.SingleUser.city}</td>
                                <td>{userr.SingleUser.telNum}</td>


                                <td><button onClick = { () => this.unauthorize(userr.access)} className = "btn btn-danger" >UnAuthorize</button></td>


                            </tr>
                            ))}


                            </tbody>


                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default List_access;