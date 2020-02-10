import React, {Component} from "react";

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            annualIncome : '', basic : '', metro : true, lta : '', C80 : '', medical : '', NPS : '', G80_100 : '', G80_50 : '', other : '', rent : '',
            otherNew : '', submit : false
        };
        this.mState = {
            annualIncome : 0, basic : 0, lta : 0, C80 : 0, medical : 0, NPS : 0, G80_100 : 0, G80_50 : 0, other : 0, rent : 0,
            otherNew : 0
        };
        this.oldTax = 0;
        this.newTax = 0;
        this.oldTaxableSalary = 0;
    }
    handleSubmit = (event) => {
        const taxableSalary = this.calculateTaxableSalary();
        const newTaxableSalary = this.mState.annualIncome - this.mState.otherNew;
        this.oldTax = this.findTax(taxableSalary);
        this.newTax = this.findTaxNew(newTaxableSalary);
        this.oldTaxableSalary = taxableSalary;
        this.setState({submit: true});
    };
    calculateTaxableSalary(){
        const finalIncome = this.mState.annualIncome;
        const G80 = this.mState.G80_50 * 0.5 + this.mState.G80_100;
        const finalHRA = this.calculateFinalHRA();
        console.log(finalIncome, "   ", G80, "  ", finalHRA, "  ", this.mState.medical, "  ", this.mState.NPS, "  ", this.mState.C80, "  ",
            this.mState.lta, "  ", this.mState.other);
        return finalIncome - 50000 - G80 - finalHRA - this.mState.medical - this.mState.NPS - this.mState.C80 - this.mState.lta -
            this.mState.other ;
    }
    calculateFinalHRA(){
        const actualRent = this.mState.rent;
        const hra = this.state.metro && this.state.metro === "true" ? (0.5 *  this.mState.basic) : (0.4 *  this.mState.basic) ;
        const rentFinal = actualRent - 0.1 *  this.mState.basic;
        return Math.min(hra, rentFinal);
    }
    generateResponse(){
        return (
            <div>
                <h2>Tax under old regime : {this.oldTax} (Taxable Salary : {this.oldTaxableSalary})</h2>
                <h2>Tax under new regime : {this.newTax}</h2>
                <br/>
                <h4>Disclaimer: This is just an approximation the actual values might differ</h4>
            </div>
        );
    }
    generateRequestForm(){
        return (
            <div>
                <h3>This Form is just for salaried people as non salaried people will definitely benefit from new regime</h3>
                <label>
                    Annual Income:
                    <input type="number" name= "Annual Income" value= {this.state.annualIncome} onChange={this.handleAnnualIncomeChange} required/>
                </label>
                <br/>
                <label>
                    Basic Income:
                    <input type="number" name= "Basic Income" value= {this.state.basic} onChange={this.handleBasicChange} required />
                </label>
                <br/>
                <label>
                    Actual Rent Paid:
                    <input type="number" name= "rent paid" value= {this.state.rent} onChange={this.handleRentChange} />
                </label>
                    <br/>
                <label>
                    Metro/Non-Metro For HRA :
                    <input type="radio" name="m-nm" value = {true} onChange={this.handleMetroChange} /> Metro
                    <input type="radio" name="m-nm" value = {false} onChange={this.handleMetroChange} /> Non Metro <br/>
                </label>
                        <br/>
                <label>
                    LTA:
                    <input type="number"  name="LTA" value = {this.state.lta} onChange={this.handleLTAChange} />
                </label>
                            <br/>
                <label>
                    80C:
                    <input type="number"  name="80C" value = {this.state.C80} onChange={this.handleC80Change} />
                </label>
                <br/>
                <label>
                    Medical Insurance:
                    <input type="number"  name="Medical" value = {this.state.medical} onChange={this.handleMedicalChange} />
                </label>
                <br/>
                <label>
                    NPS:
                    <input type="number" name="NPS"  value = {this.state.NPS} onChange={this.handleNPSChange} />
                </label>
                <br/>
                <label>
                    80G(100%):
                    <input type="number" name="80G100"   value = {this.state.G80_100} onChange={this.handle80G_100Change} />
                </label>
                <br/>
                <label>
                    80G(50%):
                    <input type="number"  name="80G50" value = {this.state.G80_50} onChange={this.handle80G_50Change} />
                </label>
                <br/>
                <label>
                    Any Other Tax Rebate:
                    <input type="number" name="other"  value = {this.state.other} onChange={this.handleOtherChange} />
                </label>
                <br/>
                <label>
                    Tax Rebates on New Regime (Include all like housing loan interest etc) :
                    <input type="number" name="otherNew"  value = {this.state.otherNew} onChange={this.handleNewTaxDeductionsChange} />
                </label>
                <br/>
                <button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
    render() {
        return(<React.Fragment>
                {this.generateRequestForm() }
                {this.state.submit ? this.generateResponse() : ''}
            </React.Fragment>);

    }

    handleAnnualIncomeChange = (event) => {
        this.setState({annualIncome : event.target.value});
        this.mState.annualIncome = event.target.value;
    };

    handleBasicChange = (event) => {
        this.setState({basic : event.target.value});
        this.mState.basic = event.target.value;
    };

    handleMetroChange = (event) => {
        console.log(event.target.value);
        this.setState({metro : event.target.value});
    };

    handleLTAChange = (event) => {
        this.setState({lta : event.target.value});
        this.mState.lta = event.target.value;
    };

    handleC80Change = (event) => {
        const value = Math.min(event.target.value, 150000);
        this.setState({C80 : value});
        this.mState.C80 = value;
    };

    handleNPSChange = (event) => {
        const value = Math.min(event.target.value, 50000);
        this.setState({NPS : value});
        this.mState.NPS = value;
    };

    handleMedicalChange = (event) => {
        this.setState({medical : event.target.value});
        this.mState.medical = event.target.value;
    };

    handle80G_100Change = (event) => {
        this.setState({G80_100 : event.target.value});
        this.mState.G80_100 = event.target.value;
    };

    handle80G_50Change = (event) => {
        this.setState({G80_50 : event.target.value});
        this.mState.G80_50 = event.target.value;
    };

    handleOtherChange = (event) => {
        this.setState({other : event.target.value});
        this.mState.other = event.target.value;
    };
    handleNewTaxDeductionsChange = (event) => {
        this.setState({otherNew : event.target.value});
        this.mState.otherNew = event.target.value;
    };

    handleRentChange = (event) => {
        this.setState({rent : event.target.value});
        this.mState.rent = event.target.value;
    };
    static lakh = 100000;
    static K = 1000;
    static slab0 = 2.5;
    static slab1 = 5;
    static slab2 = 7.5;
    static slab3 = 10;
    static slab4 = 12.5;
    static slab5 = 15;

    static newSlabTax = [0 , 12.5, 37.5, 75, 125, 187.5];
    static newSlabRate = [0 , 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];
    static slabRate = [0 , 0.05, 0.2, 0.3];
    static newSlab = [MainPage.slab0, MainPage.slab1, MainPage.slab2, MainPage.slab3, MainPage.slab4, MainPage.slab5];
    static slab = [MainPage.slab0, MainPage.slab1, MainPage.slab3];
    static slabTax = [0, 12.5, 112.5];

    findTax(income){
        const normalisedIncome = income / MainPage.lakh;
        let slabIndex = 0;
        let slabRateIndex = 2;
        if(normalisedIncome <= 5){
            return MainPage.slabTax[slabIndex] * MainPage.K;
        }
        slabIndex++;
        if(normalisedIncome > 5 && normalisedIncome <= 10){
            let finalTax = MainPage.slabTax[slabIndex] * MainPage.K;
            finalTax += (normalisedIncome - MainPage.slab[slabRateIndex - 1]) * MainPage.lakh * MainPage.slabRate[slabRateIndex];
            return this.addEdSurcharge(finalTax);
        }
        slabIndex++;
        slabRateIndex++;
        if(normalisedIncome > 10){

            let finalTax = MainPage.slabTax[slabIndex] * MainPage.K;


            finalTax += (normalisedIncome - MainPage.slab[slabRateIndex - 1]) * MainPage.lakh * MainPage.slabRate[slabRateIndex];
            return this.addEdSurcharge(finalTax);
        }
    }
    findTaxNew(income){
        const normalisedIncome = income / MainPage.lakh;
        let slabIndex = 0;
        let slabRateIndex = 2;
        if(normalisedIncome <= 5){
            return MainPage.newSlabTax[slabIndex] * MainPage.K;
        }
        slabIndex++;
        if(normalisedIncome > 5 && normalisedIncome <= 7.5){
            let finalTax = MainPage.newSlabTax[slabIndex] * MainPage.K;
            finalTax += (normalisedIncome - MainPage.newSlab[slabRateIndex - 1]) * MainPage.lakh * MainPage.newSlabRate[slabRateIndex];
            return this.addEdSurcharge(finalTax);
        }
        slabIndex++;
        slabRateIndex++;
        if(normalisedIncome > 7.5 && normalisedIncome <= 10){
            let finalTax = MainPage.newSlabTax[slabIndex] * MainPage.K;
            finalTax += (normalisedIncome - MainPage.newSlab[slabRateIndex - 1]) * MainPage.lakh * MainPage.newSlabRate[slabRateIndex];
            return this.addEdSurcharge(finalTax);
        }
        slabIndex++;
        slabRateIndex++;
        if(normalisedIncome > 10 && normalisedIncome <= 12.5){
            let finalTax = MainPage.newSlabTax[slabIndex] * MainPage.K;
            finalTax += (normalisedIncome - MainPage.newSlab[slabRateIndex - 1]) * MainPage.lakh * MainPage.newSlabRate[slabRateIndex];
            return this.addEdSurcharge(finalTax);
        }
        slabIndex++;
        slabRateIndex++;
        if(normalisedIncome > 12.5 && normalisedIncome <= 15){
            let finalTax = MainPage.newSlabTax[slabIndex] * MainPage.K;
            finalTax += (normalisedIncome - MainPage.newSlab[slabRateIndex - 1]) * MainPage.lakh * MainPage.newSlabRate[slabRateIndex];
            return this.addEdSurcharge(finalTax);
        }
        slabIndex++;
        slabRateIndex++;
        if(normalisedIncome > 15){
            let finalTax = MainPage.newSlabTax[slabIndex] * MainPage.K;
            finalTax += (normalisedIncome - MainPage.newSlab[slabRateIndex - 1]) * MainPage.lakh * MainPage.newSlabRate[slabRateIndex];
            return this.addEdSurcharge(finalTax);
        }
    }

    addEdSurcharge(tax){
        return 1.04 * tax;
    }


}export default MainPage;
