import React, {Component} from "react";

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            annualIncome : 0, basic : 0, metro : true, lta : 0, C80 : 0, medical : 0, NPS : 0, G80_100 : 0, G80_50 : 0, other : 0, rent : 0
        };
    }
    handleSubmit = (event) => {
        
    };

    generateRequestForm(){
        return (
            <div>
                <label>
                    Annual Income:
                    <input type="number" name= "Annual Income" value= {this.state.annualIncome} onChange={this.handleAnnualIncomeChange} />
                </label>
                <br/>
                <label>
                    Basic Income:
                    <input type="number" name= "Basic Income" value= {this.state.basic} onChange={this.handleBasicChange} />
                </label>
                <br/>
                <label>
                    Actual Rent Paid:
                    <input type="number" name= "rent paid" value= {this.state.rent} onChange={this.handleRentChange} />
                </label>
                    <br/>
                <label>
                    Metro/Non-Metro For HRA :
                    <input type="radio" name="m-nm" value = {true} onChange={this.handleMetroChange} checked /> Metro
                    <input type="radio" name="m-nm" value = {false} onChange={this.handleMetroChange} /> Non Metro <br/>
                </label>
                        <br/>
                <label>
                    LTA:
                    <input type="number" name="LTA" value = {this.state.lta} onChange={this.handleLTAChange} />
                </label>
                            <br/>
                <label>
                    80C:
                    <input type="number" name="80C" value = {this.state.C80} onChange={this.handleC80Change} />
                </label>
                <br/>
                <label>
                    Medical Insurance:
                    <input type="number" name="Medical" value = {this.state.medical} onChange={this.handleMedicalChange} />
                </label>
                <br/>
                <label>
                    NPS:
                    <input type="number" name="NPS" value = {this.state.NPS} onChange={this.handleNPSChange} />
                </label>
                <br/>
                <label>
                    80G(100%):
                    <input type="number" name="80G100" value = {this.state.G80_100} onChange={this.handle80G_100Change} />
                </label>
                <label>
                    80G(50%):
                    <input type="number" name="80G50" value = {this.state.G80_50} onChange={this.handle80G_50Change} />
                </label>
                <label>
                    Any Other Tax Rebate:
                    <input type="number" name="other" value = {this.state.other} onChange={this.handleOtherChange} />
                </label>
                <button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
    render() {
        return this.generateRequestForm();

    }

    handleAnnualIncomeChange = (event) => {
        console.log("sasas");
        this.setState({annualIncome : event.target.value});
    };

    handleBasicChange = (event) => {
        this.setState({basic : event.target.value});
    };

    handleMetroChange = (event) => {
        this.setState({metro : event.target.value});
    };

    handleLTAChange = (event) => {
        this.setState({lta : event.target.value});
    };

    handleC80Change = (event) => {
        this.setState({C80 : event.target.value});
    };


    handleNPSChange = (event) => {
        this.setState({NPS : event.target.value});
    };

    handleMedicalChange = (event) => {
        this.setState({medical : event.target.value});
    };

    handle80G_100Change = (event) => {
        this.setState({G80_100 : event.target.value});
    };

    handle80G_50Change = (event) => {
        this.setState({G80_50 : event.target.value});
    };

    handleOtherChange = (event) => {
        this.setState({other : event.target.value});
    };

    handleRentChange = (event) => {
        this.setState({rent : event.target.value});
    };

}export default MainPage;
