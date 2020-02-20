import React, { Component } from "react";

import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

import "./mfa.css";

class MFA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RegistrationCode: "",
      handshake: "",
      phone: "",
      status: ""
    };

    this.handlePhone = this.handlePhone.bind(this);
    this.handleSMS = this.handleSMS.bind(this);
    this.handleVerification = this.handleVerification.bind(this);
  }

  async handleVerification(event) {
    this.setState({ status: "" });
    if (
      event.target.value.toString() === this.state.RegistrationCode.toString()
    ) {
      this.setState({ handshake: "OK" });
    }
  }

  componentDidMount() {
    let RegistrationCode = Math.floor(1000 + Math.random() * 9000);
    this.setState({ RegistrationCode });
  }

  handlePhone(event) {
    this.setState({ phone: "1" + event.target.value });
  }

  async handleSMS(event) {
    this.setState({ status: "Sending Text Message..." });
    let message = {
      number: this.state.phone,
      message: "Your code is : " + this.state.RegistrationCode,
      subject: "Test"
    };

    event.preventDefault();
    await fetch(`YOUR_API_GATEWAY_STAGE_URL`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
    this.setState({ status: "Text sent!" });
  }

  render() {
    return (
      <div>
        <Container className="border mfarow col-4 offset-4">
          <div className="row pos ">
            <div className="col-12">
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <div className="row">
                    <div className="col-12">
                      <Label for="exampleCheckbox">
                        <h3>Cell Phone</h3>
                      </Label>
                    </div>
                    <div className="col-12">
                      <Input
                        type="phone"
                        name="Phone"
                        id="Phone"
                        required
                        onChange={this.handlePhone}
                      />
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="row">
                    <div className="col-6">
                      <Button
                        className="btn btn-block btn-success"
                        onClick={this.handleSMS}
                      >
                        Send Text
                      </Button>
                    </div>

                    <div className="col-6">
                      <Input
                        type="number"
                        name="code"
                        id="code"
                        placeholder="Entre the code"
                        onChange={this.handleVerification}
                        required
                      />
                    </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className="text-danger">
                    {this.state.handshake === "OK"
                      ? " Your code is valid! "
                      : ""}
                  </div>
                </FormGroup>
                <h4 className="status-update">{this.state.status}</h4>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default MFA;
