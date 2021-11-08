import { Button, Modal } from "bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import createNetwork from "../../slices/networks";

class AddNetworkModal extends Component {
    // constructor(props) {
    //     super(props);
    //     this.onChangeTitle = this.onChangeTitle.bind(this);
    //     this.onChangeDescription = this.onChangeDescription.bind(this);
    //     this.saveNetwork = this.saveNetwork.bind(this);
    //     this.newNetwork = this.newNetwork.bind(this);
    //     this.onHide = props.onHide;

    //     this.state = {
    //         id: null,
    //         title: "",
    //         description: "",
    //         published: false,
    //         submitted: false,
    //     };
    // }

    // onChangeTitle(e) {
    //     this.setState({
    //         title: e.target.value,
    //     });
    // }

    // onChangeDescription(e) {
    //     this.setState({
    //         description: e.target.value,
    //     });
    // }

    // saveNetwork() {
    //     const { title, description } = this.state;

    //     this.props
    //         .createNetwork({ title, description })
    //         .unwrap()
    //         .then((data) => {
    //             this.setState({
    //                 id: data.id,
    //                 title: data.title,
    //                 description: data.description,
    //                 published: data.published,
    //                 submitted: true,
    //             });
    //             console.log(data);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // }

    // newNetwork() {
    //     this.setState({
    //         id: null,
    //         title: "",
    //         description: "",
    //         submitted: false,
    //     });
    // }

    render() {
        return (
            <Modal
                show={true}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Network
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
test
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(null, { createNetwork })(AddNetworkModal);