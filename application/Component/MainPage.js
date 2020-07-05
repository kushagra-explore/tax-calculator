import React, {Component} from "react";
import {getRupeesDisplayableAmountV2} from "../utils/MathUtils";

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            annualIncome : '', basic : 0.5, metro : true, lta : '', C80 : '', medical : '', NPS : '', G80_100 : '', G80_50 : '', other : '', rent : '',
            otherNew : '', submit : false
        };
        this.mState = {
            annualIncome : 0, basic : 0.5, lta : 0, C80 : 0, medical : 0, NPS : 0, G80_100 : 0, G80_50 : 0, other : 0, rent : 0,
            otherNew : 0
        };
        this.oldTax = 0;
        this.newTax = 0;
        this.oldTaxableSalary = 0;
    }
    handleSubmit = (event) => {
        const taxableSalary = this.calculateTaxableSalary();
        console.log("tax == " + taxableSalary)
        const newTaxableSalary = this.mState.annualIncome - this.mState.otherNew;
        this.oldTax = Math.round(this.findTax(taxableSalary));
        this.newTax = Math.round(this.findTaxNew(newTaxableSalary));
        this.oldTaxableSalary = Math.round(taxableSalary);
        this.newTaxableSalary = Math.round(newTaxableSalary);
        this.setState({submit: true});
    };
    calculateTaxableSalary() {
        const finalIncome = this.mState.annualIncome;
        const G80 = this.mState.G80_50 * 0.5 + this.mState.G80_100;
        const finalHRA = this.calculateFinalHRA();
        console.log(finalIncome, "   ", G80, "  ", finalHRA, "  ", this.mState.medical, "  ", this.mState.NPS, "  ", this.mState.C80, "  ",
            this.mState.lta, "  ", this.mState.other);
        return Math.max(finalIncome - 50000 - G80 - finalHRA - this.mState.medical - this.mState.NPS - this.mState.C80 - this.mState.lta -
            this.mState.other, 0);
    }
    calculateFinalHRA(){
        const actualRent = this.mState.rent;
        const basicSalary = this.mState.basic * this.mState.annualIncome;
        const hra = this.state.metro && this.state.metro === "true" ? (0.5 *  basicSalary) : (0.4 *  basicSalary) ;
        const rentFinal = actualRent - 0.1 *  basicSalary;
        return Math.max(0, Math.min(hra, rentFinal));
    }
    calculateOptimumBasic(){
        const actualRent = this.mState.rent;
        let optHra = []
        for(let basicP of MainPage.basicSlabs){
            const basicSalary = basicP * this.mState.annualIncome;
            const hra = this.state.metro && this.state.metro === "true" ? (0.5 *  basicSalary) : (0.4 *  basicSalary) ;
            const rentFinal = actualRent - 0.1 *  basicSalary;
            const actualHra = Math.min(hra, rentFinal);
            optHra.push({"basicP" : basicP, "hra" : actualHra});
        }
        optHra.sort((h1, h2) => h2.hra - h1.hra);
        return optHra;
    }

    generateOptBasicResponse(){
        const optHra = this.calculateOptimumBasic();

        return optHra.map((tuple, i) =>
            <li key={'optBasic' + i}>
                <p>{tuple.basicP * 100}</p>
            </li>
        );
    }
    generateResponse1(){
        const oldClass = this.oldTax <= this.newTax ? " popular-plan" : "";
        const newClass = this.newTax < this.oldTax ? " popular-plan" : "";
        return(<div className="container" style={{paddingTop : "38px"}}>
            <div id="fdw-pricing-table">
            <div className={"plan plan1" + oldClass }>
                <div className="header">Old Regime</div>
                <div className="price">&#8377;{getRupeesDisplayableAmountV2(this.oldTax/12)}</div>
                <div className="monthly">per month</div>
                <ul>
                    <li><b>Total Tax Liability</b>&#8377;{getRupeesDisplayableAmountV2(this.oldTax)}</li>
                    <li><b>Taxable Salary</b>&#8377;{getRupeesDisplayableAmountV2(this.oldTaxableSalary)}</li>
                    <li><b>Best Basic Basket</b></li>
                    {this.generateOptBasicResponse()}
                    <li>This is just an approximation</li>
                </ul>
            </div>
            <div className={"plan plan2" + newClass}>
                <div className="header">New Regime</div>
                <div className="price">&#8377;{getRupeesDisplayableAmountV2(this.newTax/12)}</div>
                <div className="monthly">per month</div>
                <ul>
                    <li><b>Total Tax Liability</b>&#8377;{getRupeesDisplayableAmountV2(this.newTax)}</li>
                    <li><b>Taxable Salary</b>&#8377;{getRupeesDisplayableAmountV2(this.newTaxableSalary)}</li>
                    <li>This is just an approximation</li>
                </ul>
            </div>
            </div></div>);
    }
    generateRequestForm(){
        return (
            <div className="form">
                <div className="banner">
                    <p>Choosing best tax strategy is as important as choosing best trade</p>
                </div>
                <p>We <strong>do not track</strong> anything</p>
                <div className="item">
                    <label>
                        Annual Income:
                    </label>
                        <input type="number" placeholder="Annual Salary" name= "Annual Income" value= {this.state.annualIncome} onChange={this.handleAnnualIncomeChange} required/>
                </div>
                <div className="item">
                    <p>Basic Percentage:</p>
                    <select onChange={this.handleBasicChange} placeholder="In % (The percentage of your annual salary, Generally it is 50% of your total annual salary)">
                        <option value="0.5" selected>50%</option>
                        <option value="0.4">40%</option>
                        <option value="0.3">30%</option>
                    </select>

                </div>
                <div className="item">
                    <label>
                        Actual Rent Paid:
                    </label>
                    <input type="number" placeholder="Annual Rent Paid" name= "rent paid" value= {this.state.rent} onChange={this.handleRentChange} />
                </div>
                <div className="question">
                    <label>
                        Metro/Non-Metro For HRA :
                    </label>
                    <div className="question-answer">
                        <div>
                            <input type="radio" id="radio_1" name="m-nm" value = {true} onChange={this.handleMetroChange} />
                            <label htmlFor="radio_1" className="radio"><span>Metro</span></label>
                        </div>
                        <div>
                            <input type="radio" name="m-nm" id ="radio_2" value = {false} onChange={this.handleMetroChange} />
                            <label htmlFor="radio_2" className="radio"><span>Non-Metro</span></label>
                        </div>
                    </div>
                          </div><div className="item">
                <label>
                    LTA:
                    <input type="number" placeholder="Leave Travel Allowance"  name="LTA" value = {this.state.lta} onChange={this.handleLTAChange} />
                </label>
                              </div><div className="item">
                <label>
                    80C:
                    <input type="number"  name="80C" placeholder="80C Investments" value = {this.state.C80} onChange={this.handleC80Change} />
                </label>
                  </div><div className="item">
                <label>
                    Medical Insurance:
                    <input type="number"  name="Medical"  value = {this.state.medical} onChange={this.handleMedicalChange} />
                </label>
                  </div><div className="item">
                <label>
                    NPS:
                    <input type="number" name="NPS" placeholder="National Pension Scheme"  value = {this.state.NPS} onChange={this.handleNPSChange} />
                </label>
                   </div><div className="item">
                <label>
                    80G(100%):
                    <input type="number" name="80G100"  placeholder="Fully Exempt Donations" value = {this.state.G80_100} onChange={this.handle80G_100Change} />
                </label>
                   </div><div className="item">
                <label>
                    80G(50%):
                    <input type="number"  name="80G50" placeholder="Partially Exempt Donations" value = {this.state.G80_50} onChange={this.handle80G_50Change} />
                </label>
                  </div><div className="item">
                <label>
                    Any Other Tax Rebate:
                    <input type="number" name="other"  value = {this.state.other} onChange={this.handleOtherChange} />
                </label>
                  </div><div className="item">
                <label>
                    Tax Rebates on New Regime :
                    <input type="number" name="otherNew" placeholder="Include all like housing loan interest etc"  value = {this.state.otherNew} onChange={this.handleNewTaxDeductionsChange} />
                </label>
                  </div>
                <div className="btn-block">
                <button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
                </div>

                {this.state.submit ? this.generateResponse1() : ''}

                </div>
        );
    }
    render() {
        return(<React.Fragment>
            <div className="testbox">
                {this.generateRequestForm() }

            </div>
            </React.Fragment>);

    }

    handleAnnualIncomeChange = (event) => {
        this.setState({annualIncome : event.target.value});
        this.mState.annualIncome = event.target.value;
    };

    handleBasicChange = (event) => {
        this.setState({basic : event.target.value});
        this.mState.basic = Integer.parseInt(event.target.value);
    };

    handleMetroChange = (event) => {
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
    static basicSlabs = [0.5, 0.4, 0.3];

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
