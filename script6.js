window.addEventListener('load',()=>{
 let NET_VEHICLE_GST = 0;
  let LEASE_PAYMERNT_PER_MONTH = NaN
  let CLAIMABLE_TAX = 0
  let LEASE_PERIOD = 0
  let INCOME_TAX_WITHOUT_RENOVATION = NaN
  let INCOME_TAX_STATUTORY =NaN
  let INCOME_TAX_EXEMPT = NaN
  let INCOME_TAX_OPERATING = NaN
  let PRE_TAX_EXEMPT = NaN;
  let PRE_TAX_STATUTORY = NaN;
  let PRE_TAX_OPERATING = NaN;
  let POST_TAX_EXEMPT = NaN;
  let POST_TAX_STATUTORY = NaN;
  let POST_TAX_OPERATING = NaN;
  let GST_POST_TAX_EXEMPT = NaN;
  let GST_POST_TAX_STATUTORY = NaN;
  let GST_POST_TAX_OPERATING = NaN;
  let COST_PER_MONTH = 0
  let COST_PER_WEEK = 0
  
  let OVERALL_GST_SAVING = 0
  let OVERALL_INCOME_TAX_SAVING = 0
  let TOTAL_SAVING_OVERALL = 0
  let TOTAL_SAVING_ANNUAL = 0
  let TOTAL_SAVING_MONTHLY = 0

const taxableSlider = document.getElementById('taxable-slider')
const annualKms = document.getElementById('kms-slider')
const leaseTerm = document.getElementById('terms-slider')
const driveAway = document.getElementById('price-slider')
const taxableSliderValue = document.getElementById('taxable-value')
const annualKmsValue = document.getElementById('kms-value')
const leaseTermValue = document.getElementById('term-value')
const driveAwayValue = document.getElementById('price-value')

taxableSliderValue.innerHTML = taxableSlider.value
  annualKmsValue.innerHTML = annualKms.value
  leaseTermValue.innerHTML = leaseTerm.value
  driveAwayValue.innerHTML = driveAway.value
const assumptions={financeRate:.0875,commissionRate:.08,regoCost:850,dividingFactor:1.042,stampDutyDenominator:200,stampDutyMultiplier:8.4,luxuryCarTaxThreshold:89332,luxuryCarTax:0,FinancingFees:336,documentFees:900,ClaimableGSTCarValueLimit:68108,ResidualValueRate:.2813,PostTaxDeduction:0,StatutoryMethodRate:.2,DaysInFBTDays:366,MinimumThresholdforFBT:2e3,FBTGrossedUpMultiplier:2.0802,FBTRate:.47,LVA:0,ElectricityCostCentsPerkWH:.3524,ElectricityDefaultValue:.195,MedicareSurcharge:"Not Included",MaintenanceMultiplier:3,MaintenanceFee:.013,EmployerFBTType:"Standard",WhoPaysFBT:"Employee - ECM"};
const IncomTax = [
  {  "start": 0,  "end": 18200.99, "Rate":0, "PaidinBrac": 0, "TotalPaid": 0 },
  { "start": 18201.00, "end": 45000.99, "Rate":0.19, "PaidinBrac": 5092.00, "TotalPaid": 5092.00, },
  { "start": 45001.00, "end": 120000.99, "Rate": 0.33, "PaidinBrac": 24375.00, "TotalPaid": 29467.00, },
  { "start": 120001.00, "end": 180000.99,"Rate": 0.37,"PaidinBrac": 22200.00,"TotalPaid": 51667.00, },
  { "start": 180001.00, "end": NaN,"Rate":0.45,"PaidinBrac": NaN,"TotalPaid": NaN, }
]
        
  let electricityInput = document.getElementById('electricity-value')
  let maintenanceInput = document.getElementById('maintenance-value')
  let insuranceInput = document.getElementById('insurance-value')
  let registrationInput = document.getElementById('registration-value')
  let tyresInput = document.getElementById('tyres-value')
  let roadsideInput = document.getElementById('roadside-value')
  let otherInput = document.getElementById('other-value')

  // CUSTOM VARIABLES
  const BUSINESS_USAGE = 1 // 100%
  let GROSS_INCOME =   taxableSlider.value 
  const METHOD = 'Operating Cost Method'





        // Lease Payment (Ex GST Per Month) 	
        function calculateLeasePayment(){

            const driveAwayPrice = driveAway.value;
            const registrationCost = assumptions.regoCost;
            const dividingFactor = assumptions.dividingFactor;
            
            /// Investment Amount
            NET_VEHICLE_GST = (driveAwayPrice - registrationCost) /dividingFactor
            
            // Total Stamp Duty + Rego + Lux Tax 
            const stampDuty = (NET_VEHICLE_GST/assumptions.stampDutyDenominator)*assumptions.stampDutyMultiplier
            const luxuryTax = assumptions.luxuryCarTax;
            const totalStamp = stampDuty + registrationCost + luxuryTax
            
            
            
            // Financing Fees 	
            const financingFee = assumptions.FinancingFees;

            // Document Fee 	
            const documentFee = assumptions.documentFees;

            // Claimable Tax (Choose the Lower) 	
            const carThreshold = (1/11 * assumptions.ClaimableGSTCarValueLimit);
            const claimableGST = (1/11 * NET_VEHICLE_GST);
            const claimableTax = carThreshold>claimableGST?claimableGST:carThreshold;

            CLAIMABLE_TAX = claimableTax
            
            // Commission Fee
            const commissionRate = assumptions.commissionRate;
            const commissionFee = (driveAwayPrice - claimableTax)*commissionRate;
            
            
            
            const investmentAmount = NET_VEHICLE_GST + totalStamp + financingFee + documentFee + commissionFee - claimableTax
            
            
            ///////////// Residual Value
            
            const residualValueRate = assumptions.ResidualValueRate;
            
            const residualValue = (NET_VEHICLE_GST+totalStamp - claimableTax) *residualValueRate;
            
            
            /////////////Final calculation
            
            const financeRate = parseFloat((assumptions.financeRate/12).toFixed(2))
            LEASE_PERIOD = leaseTerm.value*12;
            
            // Calculate periodic payment
            
            LEASE_PAYMERNT_PER_MONTH = -calculatePeriodicPayment(financeRate, LEASE_PERIOD, investmentAmount, residualValue);
            
            LEASE_PAYMERNT_PER_MONTH = parseFloat(LEASE_PAYMERNT_PER_MONTH.toFixed(2))


            const packages = document.querySelectorAll('.package')
            packages.forEach(el => el.classList.remove('active'))
            if(leaseTerm.value<3){
                packages[0].classList.add('active')
                document.getElementById('package-small-price').innerHTML = LEASE_PAYMERNT_PER_MONTH
            }else if(leaseTerm.value>3){
                packages[2].classList.add('active')
                document.getElementById('package-large-price').innerHTML = LEASE_PAYMERNT_PER_MONTH
            }else{
                packages[1].classList.add('active')
                document.getElementById('package-medium-price').innerHTML = LEASE_PAYMERNT_PER_MONTH
            }


            return LEASE_PAYMERNT_PER_MONTH
        }

        //Calculate PMT
        function calculatePeriodicPayment(rate, nper, pv, fv) {

                const r = rate/12; // Monthly interest rate
                const numerator = pv * r * Math.pow(1 + r, nper);
                const denominator = Math.pow(1 + r, nper) - 1;
                
                return -(numerator / denominator);
            }
        function calculateMonthlyRunningCost (){
            const electricityVal = parseFloat(electricityInput.value)
            const maintenanceVal = parseFloat(maintenanceInput.value)
            const insuranceVal = parseFloat(insuranceInput.value)
            const registrationVal = parseFloat(registrationInput.value)
            const tyresVal = parseFloat(tyresInput.value)
            const roadsideVal = parseFloat(roadsideInput.value)
            const otherVal = parseFloat(otherInput.value)
            const leaseManagement = 39

            return electricityVal + maintenanceVal + insuranceVal + registrationVal + tyresVal + roadsideVal + otherVal + leaseManagement
        }


//////////////////////////// Pre Tax Calculation Start 
        function calculateFBTExempt(){
            const LeasePayment = calculateLeasePayment();
            const MonthlyRunningCost = calculateMonthlyRunningCost()
            const  AnnualMonths = 12

            const PreTaxContribution = (parseFloat(LeasePayment) + MonthlyRunningCost) * AnnualMonths

            PRE_TAX_EXEMPT = parseFloat(PreTaxContribution.toFixed(2))
            POST_TAX_EXEMPT = 0
            GST_POST_TAX_EXEMPT = 0

            return PRE_TAX_EXEMPT
        }
        function calculateFBTStatutory(){
            const LeasePayment = calculateLeasePayment();
            const MonthlyRunningCost = calculateMonthlyRunningCost()
            const  AnnualMonths = 12

            const VehicleBaseValue = NET_VEHICLE_GST;
            const StatutoryRate = assumptions.StatutoryMethodRate;
            const FBTDays = assumptions.DaysInFBTDays;
            const FBTYear = assumptions.DaysInFBTDays;

            const  MinimumThreshold  = assumptions.MinimumThresholdforFBT
            const  DaysUnavailableforPrivateUse = 0
            
            
            const   GrossTaxableValue = ((VehicleBaseValue*StatutoryRate)/FBTDays*FBTYear)-((VehicleBaseValue*StatutoryRate)/MinimumThreshold*DaysUnavailableforPrivateUse)

           

            const  FBTGrossedUpMultiplier = assumptions.FBTGrossedUpMultiplier
            const FullGrossedUpTaxableAmount = GrossTaxableValue * FBTGrossedUpMultiplier
            const NonExemptGrossedupAmount = FullGrossedUpTaxableAmount
            const  ExemptGrossedupAmount = FullGrossedUpTaxableAmount - NonExemptGrossedupAmount
            const PostTaxEmployeeContributionMade = GrossTaxableValue
            const  GSTIncludedInPostTaxContribution = parseFloat((PostTaxEmployeeContributionMade/11).toFixed(2))
            const FringeBenefitValueExGST =  GSTIncludedInPostTaxContribution + (LeasePayment + MonthlyRunningCost) * 12;

            
            const  PreTaxContribution = FringeBenefitValueExGST - PostTaxEmployeeContributionMade

            const  EmployeeFBTLiability = 0

            const  FBTTaxAmount = NonExemptGrossedupAmount * assumptions.FBTRate
            
            PRE_TAX_STATUTORY = parseFloat(PreTaxContribution.toFixed(2))
            POST_TAX_STATUTORY = PostTaxEmployeeContributionMade
            GST_POST_TAX_STATUTORY = GSTIncludedInPostTaxContribution

            return PRE_TAX_STATUTORY;
        }
        function calculateFBTOperatingCost(){
            const LeasePayment = calculateLeasePayment();
            const MonthlyRunningCost = calculateMonthlyRunningCost()
            const  AnnualMonths = 12


            const TotalLeaseOperatingCostsIncGST = ((LeasePayment*1.1)+(MonthlyRunningCost*1.1))*12
            const BusinessUsage = BUSINESS_USAGE
            const GrossTaxableValue =(TotalLeaseOperatingCostsIncGST*(1-BusinessUsage))
            const FullGrossedUpTaxableAmount = (GrossTaxableValue*assumptions.FBTGrossedUpMultiplier) 
            const NonExemptGrossedupAmountType1 = FullGrossedUpTaxableAmount 
            const GrosTaxableValueAboveApplicable =  (NonExemptGrossedupAmountType1/assumptions.FBTGrossedUpMultiplier)
            const ExemptGrossedUpAmountType1 = FullGrossedUpTaxableAmount-NonExemptGrossedupAmountType1 
            
            const PostTaxEmployeeContributionMade = GrossTaxableValue 
            const GSTIncludedInPostTaxContribution = (PostTaxEmployeeContributionMade/11) 
            const FringeBenefitValueExGST = ((LeasePayment+MonthlyRunningCost)*12)+GSTIncludedInPostTaxContribution 

            const  PreTaxContribution = FringeBenefitValueExGST - PostTaxEmployeeContributionMade

            const  EmployeeFBTLiability = 0;

            const  FBTTaxAmount = (NonExemptGrossedupAmountType1*assumptions.FBTRate)

            PRE_TAX_OPERATING = parseFloat(PreTaxContribution.toFixed(2))
            POST_TAX_OPERATING = PostTaxEmployeeContributionMade
            GST_POST_TAX_OPERATING = GSTIncludedInPostTaxContribution

            return PRE_TAX_OPERATING

        }
//////////////////////////// Pre Tax Calculation End 

//////////////////////////// FBT Calculation Start 
        
        function calTaxPaidExclOffset(GrossIncome){
            if( (GrossIncome>= IncomTax[0].start) && (GrossIncome<=IncomTax[0].end )){
                return 0;
            }else if((GrossIncome>= IncomTax[1].start) && (GrossIncome<=IncomTax[1].end )){
                return parseFloat( (((GrossIncome-IncomTax[0].end)*IncomTax[1].Rate)+IncomTax[0].TotalPaid).toFixed(2) )
            }else if((GrossIncome>= IncomTax[2].start) && (GrossIncome<=IncomTax[2].end )){
                return parseFloat( (((GrossIncome-IncomTax[1].end)*IncomTax[2].Rate)+IncomTax[1].TotalPaid).toFixed(2) )
            }else if ((GrossIncome>= IncomTax[3].start) && (GrossIncome<=IncomTax[3].end )){
                return parseFloat( (((GrossIncome-IncomTax[2].end)*IncomTax[3].Rate)+IncomTax[2].TotalPaid).toFixed(2) )
            }else if ((GrossIncome>= IncomTax[4].start) && (GrossIncome<=IncomTax[4].end )){
                return parseFloat( (((GrossIncome-IncomTax[4].end)*IncomTax[4].Rate)+IncomTax[3].TotalPaid).toFixed(2) )
            }
            else{
                return 0
            }
        }

        function calculateIncomeTax(type=''){
            let GrossIncome = GROSS_INCOME; 

            if(type==='statutory'){ 
                GrossIncome = GROSS_INCOME - calculateFBTStatutory();
            }else if(type==='exempt'){
                GrossIncome = GROSS_INCOME -  calculateFBTExempt();
            }else if(type==='operating'){
                GrossIncome = GROSS_INCOME -  calculateFBTOperatingCost();
            }

            const  IncludeMedicareLevy = true
            const  TaxPaidExclOffset  = calTaxPaidExclOffset(GrossIncome) 
 
            const  MedicareLevyThreshold = 22801.00; 
            const  MedicareLevyRate = 0.02;
            const  MedicareLevyVal = IncludeMedicareLevy? GrossIncome>MedicareLevyThreshold? GrossIncome*MedicareLevyRate : 0 : 'Not Included' 

            const  MedicareSurcharge = 0

            const TotalPaid = TaxPaidExclOffset+(typeof MedicareLevyVal === 'string'? 0: MedicareLevyVal )+MedicareSurcharge
            const NetIncome =   GrossIncome-TotalPaid


            if(type === '') INCOME_TAX_WITHOUT_RENOVATION = TotalPaid
            if(type === 'statutory') INCOME_TAX_STATUTORY = TotalPaid
            if(type === 'exempt') INCOME_TAX_EXEMPT = TotalPaid
            if(type === 'operating') INCOME_TAX_OPERATING = TotalPaid

            return TotalPaid

        }

//////////////////////////// FBT Calculation END 



        //Calculating Savings

        function calculateSaving(){

            const incomeTaxWR = INCOME_TAX_WITHOUT_RENOVATION //Z5
            const incomeTaxAR = METHOD==='Without Renovation'? INCOME_TAX_WITHOUT_RENOVATION :
                                METHOD==='Statutory Method'? INCOME_TAX_STATUTORY :
                                METHOD==='FBT Exempt Method'? INCOME_TAX_EXEMPT :
                                METHOD==='Operating Cost Method'? INCOME_TAX_OPERATING :INCOME_TAX_WITHOUT_RENOVATION
            
            

            const PreTax =  METHOD==='Without Renovation'? 0 :
                            METHOD==='Statutory Method'? PRE_TAX_STATUTORY :
                            METHOD==='FBT Exempt Method'? PRE_TAX_EXEMPT :
                            METHOD==='Operating Cost Method'? PRE_TAX_OPERATING : 0

            const PostTax = METHOD==='Without Renovation'? 0 :
                            METHOD==='Statutory Method'? POST_TAX_STATUTORY :
                            METHOD==='FBT Exempt Method'? POST_TAX_EXEMPT :
                            METHOD==='Operating Cost Method'? POST_TAX_OPERATING : 0

            const GSTPostTax = METHOD==='Without Renovation'? 0 :
                            METHOD==='Statutory Method'? GST_POST_TAX_STATUTORY :
                            METHOD==='FBT Exempt Method'? GST_POST_TAX_EXEMPT :
                            METHOD==='Operating Cost Method'? GST_POST_TAX_OPERATING : 0

            console.log('PreTax',PreTax);
            console.log('PostTax',PostTax);
            console.log('GSTPostTax',GSTPostTax);
            
            const TaxSavings = (incomeTaxWR - incomeTaxAR)
            const MonthlyTaxSavings = TaxSavings / 12
            console.log('TaxSavings',TaxSavings);
            console.log('MonthlyTaxSavings',MonthlyTaxSavings);
            
            COST_PER_MONTH = PreTax + PostTax - MonthlyTaxSavings
            
            const preTaxPerWeek = PreTax / 52
            const postTaxPerWeek = PostTax / 52
            const WeeklyTaxSavings = TaxSavings / 52

            COST_PER_WEEK = preTaxPerWeek + postTaxPerWeek - WeeklyTaxSavings

            const LeasePayment = calculateLeasePayment();               
            const MonthlyRunningCost = calculateMonthlyRunningCost()  
            const LeaseRunnngCostMonthly =  LeasePayment+ MonthlyRunningCost //z20
            const GSTSavingsMonthly = LeaseRunnngCostMonthly*0.1 //z21
            const GSTPostTaxDeductionMonthly = GSTPostTax/12 //z22

            OVERALL_GST_SAVING = ((GSTSavingsMonthly-GSTPostTaxDeductionMonthly)*LEASE_PERIOD)+CLAIMABLE_TAX

            OVERALL_INCOME_TAX_SAVING = MonthlyTaxSavings*LEASE_PERIOD

            TOTAL_SAVING_OVERALL = OVERALL_INCOME_TAX_SAVING+OVERALL_GST_SAVING
            TOTAL_SAVING_ANNUAL = TOTAL_SAVING_OVERALL/LEASE_PERIOD*12
            TOTAL_SAVING_MONTHLY = TOTAL_SAVING_OVERALL/LEASE_PERIOD

            console.log('COST_PER_MONTH',COST_PER_MONTH);
            console.log('COST_PER_WEEK',COST_PER_WEEK);
            console.log('OVERALL_GST_SAVING',OVERALL_GST_SAVING);
            console.log('OVERALL_INCOME_TAX_SAVING',OVERALL_INCOME_TAX_SAVING);
            console.log('TOTAL_SAVING_OVERALL',TOTAL_SAVING_OVERALL);
            console.log('TOTAL_SAVING_ANNUAL',TOTAL_SAVING_ANNUAL);
            console.log('TOTAL_SAVING_MONTHLY',TOTAL_SAVING_MONTHLY);
            
        }
        


  function updateAllValues(){
    GROSS_INCOME =   parseFloat(taxableSlider.value)
    console.log('GROSS_INCOME',GROSS_INCOME)
  	taxableSliderValue.innerHTML = taxableSlider.value
    annualKmsValue.innerHTML = annualKms.value
    leaseTermValue.innerHTML = leaseTerm.value
    driveAwayValue.innerHTML = driveAway.value
    
    calculateLeasePayment()
    calculateFBTExempt()
    calculateFBTStatutory()
    calculateFBTOperatingCost()
    calculateIncomeTax()
    calculateIncomeTax('statutory')
    calculateIncomeTax('exempt')
    calculateIncomeTax('operating')
    
    calculateSaving()
    
    console.log('NET_VEHICLE_GST',NET_VEHICLE_GST)
    console.log('TOTAL_SAVING_MONTHLY',TOTAL_SAVING_MONTHLY)
    
    document.getElementById('savings').innerHTML = TOTAL_SAVING_MONTHLY?TOTAL_SAVING_MONTHLY:0
  }

  function initialize(){
    leaseTerm.addEventListener('input', updateAllValues)
    taxableSlider.addEventListener('input', updateAllValues)
    annualKms.addEventListener('input', updateAllValues)
    driveAway.addEventListener('input', updateAllValues)
    document.getElementById('monthly-budget').classList.add('close')
    updateAllValues()
    document.getElementById('custom-budget').addEventListener('click', ()=>{
    	document.getElementById('monthly-budget').classList.toggle('close')
    })
  }
  initialize();
})