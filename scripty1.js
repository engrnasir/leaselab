 let budgetedAmount = []
const vehicles = [
    {
        make:'Tesla',
        modelName:'Model 3',
        model:'model-3-rwd',
        version:'Rear-Wheel Drive',
        bestMethod:'FBT Exempt Method',
        driveAwayPrice:67406.00,
        potentialSaving:1000
    },
    {
        make:'Kia',
        modelName:'Niro',
        model:'niro',
        version:'SG2 GT-Line Single Speed',
        driveAwayPrice: 78344.81,
        bestMethod:'FBT Exempt Method',
        potentialSaving:42999
    },
    {
        make:'MG',
        modelName:'ZS EV',
        model:'zs-ev',
        version:'Essenve EV',
        driveAwayPrice:33990.00,
        bestMethod:'FBT Exempt Method',
        potentialSaving:25194
    },
    {
        make:'Kia',
        modelName:'EV 6 GT',
        model:'ev-6-gt',
        version:'GT-Line AWD',
        driveAwayPrice:94293.56,
        bestMethod:'Statutory Method',
        potentialSaving:49916 
    },
    {
        make:'Kia',
        modelName:'EV6',
        model:'ev6-air',
        version:'GT-Line AWD',
        driveAwayPrice:78584,
        bestMethod:'Statutory Method',
        potentialSaving:43103 
    },
    {
        make:'Hyundai',
        modeNamel:'Ioniq 5',
        model:'ioniq-5',
        version:'Dynamiq 2WD Ne.V3',
        driveAwayPrice:77542.50,
        bestMethod:'FBT Exempt Method',
        potentialSaving:42651 
    },
    {
        make:'Polestar',
        modelName:'2',
        model:'2',
        version:'Long Range Dual Motor',
        driveAwayPrice:81421.30,
        bestMethod:'FBT Exempt Method',
        potentialSaving:44334 
    },
    {
        make:'BYD',
        modelName:'Atto 3',
        model:'atto-3',
        version:'Extended',
        driveAwayPrice:53979.45,
        bestMethod:'FBT Exempt Method',
        potentialSaving:33107 
        
    },
    {
        make:'Volvo',
        modelName:'XC40',
        model:'xc-40-awd',
        version:'Recharge Pure Electric FWD MY23',
        driveAwayPrice:76990.00,
        bestMethod:'FBT Exempt Method',
        potentialSaving:42416 
    },
    {
        make:'Tesla',
        modelName:'Model 3',
        model:'model-3-lr',
        version:'Long Range',
        driveAwayPrice:77826.00,
        bestMethod:'FBT Exempt Method',
        potentialSaving:42850 
    },
    {
        make:'Tesla',
        modelName:'Model Y',
        model:'model-y-lr',
        version:'Long Range',
        driveAwayPrice:84595.00,
        bestMethod:'FBT Exempt Method',
        potentialSaving:45886 
    },
    {
        make:'Tesla',
        modelName:'Model Y',
        model:'model-y-rw',
        version:'Rear-Wheel Drive',
        driveAwayPrice:71049.00,
        bestMethod:'FBT Exempt Method',
        potentialSaving:39864 
    },
    {
        make:'Tesla',
        modelName:'Model Y',
        model:'model-3-p',
        version:'Performance',
        driveAwayPrice:99351.00,
        bestMethod:'Statutory Method',
        potentialSaving:0 
    },
    
    
    
   
    
    
    {
        make:'Volvo',
        modelName:'C40',
        model:'c-40-awd',
        version:'Recharge Twin Pure AWD',
        driveAwayPrice:87342.00,
        bestMethod:'FBT Exempt Method'
    },
    
   
    
]
let assumptions={};

const IncomTax = [
    {  "start": 0,  "end": 18200.99, "Rate":0, "PaidinBrac": 0, "TotalPaid": 0 },
    { "start": 18201.00, "end": 45000.99, "Rate":0.19, "PaidinBrac": 5092.00, "TotalPaid": 5092.00, },
    { "start": 45001.00, "end": 120000.99, "Rate": 0.33, "PaidinBrac": 24375.00, "TotalPaid": 29467.00, },
    { "start": 120001.00, "end": 180000.99,"Rate": 0.37,"PaidinBrac": 22200.00,"TotalPaid": 51667.00, },
    { "start": 180001.00, "end": NaN,"Rate":0.45,"PaidinBrac": NaN,"TotalPaid": NaN, }
  ]

  let NET_VEHICLE_GST = 0;
  let LEASE_PAYMERNT_PER_MONTH = 0
  let CLAIMABLE_TAX = 0
  let LEASE_PERIOD = 0
  let INCOME_TAX_WITHOUT_RENOVATION = 0
  let INCOME_TAX_STATUTORY = 0
  let INCOME_TAX_EXEMPT = 0
  let INCOME_TAX_OPERATING = 0
  let PRE_TAX_EXEMPT = 0;
  let PRE_TAX_STATUTORY = 0;
  let PRE_TAX_OPERATING = 0;
  let POST_TAX_EXEMPT = 0;
  let POST_TAX_STATUTORY = 0;
  let POST_TAX_OPERATING = 0;
  let GST_POST_TAX_EXEMPT = 0;
  let GST_POST_TAX_STATUTORY = 0;
  let GST_POST_TAX_OPERATING = 0;
  let COST_PER_MONTH = 0
  let COST_PER_WEEK = 0
  
  let OVERALL_GST_SAVING = 0
  let OVERALL_INCOME_TAX_SAVING = 0
  let TOTAL_SAVING_OVERALL = 0
  let TOTAL_SAVING_ANNUAL = 0
  let TOTAL_SAVING_MONTHLY = 0

  let GROSS_INCOME =   0;    //Taxable values
  let KM_PER_YEAR = 15000
  let MONTHLY_RUNNING_COST = 0
  let BUSINESS_USAGE = 20 // 20%
  let METHOD = 'Operating Cost Method'
  let DRIVE_AWAY_PRICE = 0;

   // MONTHLY RUNNING COSTS VARIABLES
    let ELECTRICITY_FEE = 0
    let MAINTENANCE_FEE = 0
    let INSURANCE_FEE = 0
    let REGISTRATION_FEE = 0
    let TYRES_FEE = 0
    let ROADSIDE_FEE = 0
    let OTHERS_FEE = 0
    let LEASE_MANAGEMENT_FEE = 0

    let SELECTED_VEHICLE = ""
    let VEHICLE_M = {}

   function getModel(){
       const url = window.location.href
       const url_arr = url.split('/')
       const len = url_arr.length;
       const model = url_arr[len-1]
        return model
    }
    function calculateBudgets(){
        budgetedAmount =  [
            {
                "Make": "Tesla",
                "Model": "Model Y",
                "Category": "Electricity",
                "Amount": ((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "Tesla",
                "Model": "Model Y",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "Tesla",
                "Model": "Model Y",
                "Category": "Insurance",
                "Amount": "148.64"
            },
            {
                "Make": "Tesla",
                "Model": "Model Y",
                "Category": "Registration",
                "Amount": "57.60"
            },
            {
                "Make": "Tesla",
                "Model": "Model Y",
                "Category": "Tyres",
                "Amount": "32.40"
            },
            {
                "Make": "Tesla",
                "Model": "Model Y",
                "Category": "Roadsite Assistance",
                "Amount": "29.44"
            },
            {
                "Make": "Tesla",
                "Model": "Model Y",
                "Category": "Other",
                "Amount": "6.15"
            },
            {
                "Make": "Tesla",
                "Model": "Model Y",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "Tesla",
                "Model": "Model 3",
                "Category": "Electricity",
                "Amount": ((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "Tesla",
                "Model": "Model 3",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "Tesla",
                "Model": "Model 3",
                "Category": "Insurance",
                "Amount": "151.25"
            },
            {
                "Make": "Tesla",
                "Model": "Model 3",
                "Category": "Registration",
                "Amount": "56.49"
            },
            {
                "Make": "Tesla",
                "Model": "Model 3",
                "Category": "Tyres",
                "Amount": "38.04"
            },
            {
                "Make": "Tesla",
                "Model": "Model 3",
                "Category": "Roadsite Assistance",
                "Amount": "7.65"
            },
            {
                "Make": "Tesla",
                "Model": "Model 3",
                "Category": "Other",
                "Amount": "4.54"
            },
            {
                "Make": "Tesla",
                "Model": "Model 3",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "BYD",
                "Model": "Atto 3",
                "Category": "Electricity",
                "Amount": ((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "BYD",
                "Model": "Atto 3",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "BYD",
                "Model": "Atto 3",
                "Category": "Insurance",
                "Amount": "123.54"
            },
            {
                "Make": "BYD",
                "Model": "Atto 3",
                "Category": "Registration",
                "Amount": "44.67"
            },
            {
                "Make": "BYD",
                "Model": "Atto 3",
                "Category": "Tyres",
                "Amount": "24.29"
            },
            {
                "Make": "BYD",
                "Model": "Atto 3",
                "Category": "Roadsite Assistance",
                "Amount": "1.97"
            },
            {
                "Make": "BYD",
                "Model": "Atto 3",
                "Category": "Other",
                "Amount": "5.00"
            },
            {
                "Make": "BYD",
                "Model": "Atto 3",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "Volvo",
                "Model": "XC40",
                "Category": "Electricity",
                "Amount": ((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "Volvo",
                "Model": "XC40",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "Volvo",
                "Model": "XC40",
                "Category": "Insurance",
                "Amount": "194.40"
            },
            {
                "Make": "Volvo",
                "Model": "XC40",
                "Category": "Registration",
                "Amount": "53.13"
            },
            {
                "Make": "Volvo",
                "Model": "XC40",
                "Category": "Tyres",
                "Amount": "52.81"
            },
            {
                "Make": "Volvo",
                "Model": "XC40",
                "Category": "Roadsite Assistance",
                "Amount": "0.00"
            },
            {
                "Make": "Volvo",
                "Model": "XC40",
                "Category": "Other",
                "Amount": "14.78"
            },
            {
                "Make": "Volvo",
                "Model": "XC40",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "Polestar",
                "Model": "2",
                "Category": "Electricity",
                "Amount":((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "Polestar",
                "Model": "2",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "Polestar",
                "Model": "2",
                "Category": "Insurance",
                "Amount": "136.09"
            },
            {
                "Make": "Polestar",
                "Model": "2",
                "Category": "Registration",
                "Amount": "73.89"
            },
            {
                "Make": "Polestar",
                "Model": "2",
                "Category": "Tyres",
                "Amount": "42.61"
            },
            {
                "Make": "Polestar",
                "Model": "2",
                "Category": "Roadsite Assistance",
                "Amount": "59.09"
            },
            {
                "Make": "Polestar",
                "Model": "2",
                "Category": "Other",
                "Amount": "21.22"
            },
            {
                "Make": "Polestar",
                "Model": "2",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "Hyundai",
                "Model": "Ioniq 5",
                "Category": "Electricity",
                "Amount": ((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "Hyundai",
                "Model": "Ioniq 5",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "Hyundai",
                "Model": "Ioniq 5",
                "Category": "Insurance",
                "Amount": "88.53"
            },
            {
                "Make": "Hyundai",
                "Model": "Ioniq 5",
                "Category": "Registration",
                "Amount": "66.67"
            },
            {
                "Make": "Hyundai",
                "Model": "Ioniq 5",
                "Category": "Tyres",
                "Amount": "36.11"
            },
            {
                "Make": "Hyundai",
                "Model": "Ioniq 5",
                "Category": "Roadsite Assistance",
                "Amount": "0.00"
            },
            {
                "Make": "Hyundai",
                "Model": "Ioniq 5",
                "Category": "Other",
                "Amount": "0.00"
            },
            {
                "Make": "Hyundai",
                "Model": "Ioniq 5",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "Volvo",
                "Model": "C40",
                "Category": "Electricity",
                "Amount":((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "Volvo",
                "Model": "C40",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "Volvo",
                "Model": "C40",
                "Category": "Insurance",
                "Amount": "133.91"
            },
            {
                "Make": "Volvo",
                "Model": "C40",
                "Category": "Registration",
                "Amount": "73.33"
            },
            {
                "Make": "Volvo",
                "Model": "C40",
                "Category": "Tyres",
                "Amount": "39.00"
            },
            {
                "Make": "Volvo",
                "Model": "C40",
                "Category": "Roadsite Assistance",
                "Amount": "0.00"
            },
            {
                "Make": "Volvo",
                "Model": "C40",
                "Category": "Other",
                "Amount": "0.00"
            },
            {
                "Make": "Volvo",
                "Model": "C40",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "Kia",
                "Model": "EV6",
                "Category": "Electricity",
                "Amount":((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "Kia",
                "Model": "EV6",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "Kia",
                "Model": "EV6",
                "Category": "Insurance",
                "Amount": "172.08"
            },
            {
                "Make": "Kia",
                "Model": "EV6",
                "Category": "Registration",
                "Amount": "56.67"
            },
            {
                "Make": "Kia",
                "Model": "EV6",
                "Category": "Tyres",
                "Amount": "52.00"
            },
            {
                "Make": "Kia",
                "Model": "EV6",
                "Category": "Roadsite Assistance",
                "Amount": "0.00"
            },
            {
                "Make": "Kia",
                "Model": "EV6",
                "Category": "Other",
                "Amount": "0.00"
            },
            {
                "Make": "Kia",
                "Model": "EV6",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "MG",
                "Model": "ZS EV",
                "Category": "Electricity",
                "Amount": ((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "MG",
                "Model": "ZS EV",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "MG",
                "Model": "ZS EV",
                "Category": "Insurance",
                "Amount": "100.85"
            },
            {
                "Make": "MG",
                "Model": "ZS EV",
                "Category": "Registration",
                "Amount": "50.57"
            },
            {
                "Make": "MG",
                "Model": "ZS EV",
                "Category": "Tyres",
                "Amount": "30.51"
            },
            {
                "Make": "MG",
                "Model": "ZS EV",
                "Category": "Roadsite Assistance",
                "Amount": "0.00"
            },
            {
                "Make": "MG",
                "Model": "ZS EV",
                "Category": "Other",
                "Amount": "0.00"
            },
            {
                "Make": "MG",
                "Model": "ZS EV",
                "Category": "Lease Management",
                "Amount": "39.00"
            },
            {
                "Make": "Kia",
                "Model": "Niro",
                "Category": "Electricity",
                "Amount": ((KM_PER_YEAR* assumptions.ElectricityDefaultValue*assumptions.ElectricityCostCentsPerkWH)/12).toFixed(2)
            },
            {
                "Make": "Kia",
                "Model": "Niro",
                "Category": "Service & Maintenance",
                "Amount": ((KM_PER_YEAR* assumptions.MaintenanceMultiplier*assumptions.MaintenanceFee)/12).toFixed(2)
            },
            {
                "Make": "Kia",
                "Model": "Niro",
                "Category": "Insurance",
                "Amount": "163.25"
            },
            {
                "Make": "Kia",
                "Model": "Niro",
                "Category": "Registration",
                "Amount": "56.67"
            },
            {
                "Make": "Kia",
                "Model": "Niro",
                "Category": "Tyres",
                "Amount": "26.00"
            },
            {
                "Make": "Kia",
                "Model": "Niro",
                "Category": "Roadsite Assistance",
                "Amount": "0.00"
            },
            {
                "Make": "Kia",
                "Model": "Niro",
                "Category": "Other",
                "Amount": "0.00"
            },
            {
                "Make": "Kia",
                "Model": "Niro",
                "Category": "Lease Management",
                "Amount": "39.00"
            }
        ]
        return budgetedAmount
    }

    function calculateOperatingItemValue(category){
        let Make = VEHICLE_M.make;
        let Model = VEHICLE_M.modelName;
        let Category = category;
        let budget = budgetedAmount.find(el => el.Make===Make && el.Category === Category && el.Model === Model)
        return budget? parseFloat(budget.Amount) : 0;
    }
function initializeCalculations(){

console.log('calculations initialized');

const taxableSlider = document.getElementById('taxable-slider')
const annualKms = document.getElementById('kms-slider')
const leaseTerm = document.getElementById('terms-slider')
const driveAway = document.getElementById('price-slider')
const taxableSliderValue = document.getElementById('taxable-value')
const annualKmsValue = document.getElementById('kms-value')
const leaseTermValue = document.getElementById('term-value')
const driveAwayValue = document.getElementById('price-value')
// const methodSwitch = document.getElementById('Checkbox-2')

    const electricityInput = document.getElementById('electricity-value')
  const maintenanceInput = document.getElementById('maintenance-value')
  const insuranceInput = document.getElementById('insurance-value')
  const registrationInput = document.getElementById('registration-value')
  const tyresInput = document.getElementById('tyres-value')
  const roadsideInput = document.getElementById('roadside-value')
  const otherInput = document.getElementById('other-value')

    annualKms.value = KM_PER_YEAR
    const model = getModel()
    const vehicle = VEHICLE_M = vehicles.find(el => el.model === model)
    SELECTED_VEHICLE = vehicle.make + " " + vehicle.modelName
    DRIVE_AWAY_PRICE = driveAway.value = vehicle.driveAwayPrice
    METHOD = vehicle.driveAwayPrice < 94000? 'FBT Exempt Method': vehicle.driveAwayPrice>94000? 'Operating Cost Method' : 'Statutory Method'

    calculateAssumptions()
    calculateBudgets()

    function updateOperatingCostItems(){
        ELECTRICITY_FEE = calculateOperatingItemValue('Electricity')
        MAINTENANCE_FEE = calculateOperatingItemValue('Service & Maintenance')
        INSURANCE_FEE = calculateOperatingItemValue('Insurance')
        REGISTRATION_FEE = calculateOperatingItemValue('Registration')
        TYRES_FEE = calculateOperatingItemValue('Tyres')
        ROADSIDE_FEE = calculateOperatingItemValue('Roadsite Assistance')
        OTHERS_FEE = calculateOperatingItemValue('Other')
        LEASE_MANAGEMENT_FEE = calculateOperatingItemValue('Lease Management')

        electricityInput.value = ELECTRICITY_FEE
        maintenanceInput.value = MAINTENANCE_FEE
        insuranceInput.value = INSURANCE_FEE
        registrationInput.value = REGISTRATION_FEE
        tyresInput.value = TYRES_FEE
        roadsideInput.value = ROADSIDE_FEE
        otherInput.value = OTHERS_FEE
    }
    updateOperatingCostItems()


    taxableSliderValue.innerHTML = taxableSlider.value
    annualKmsValue.innerHTML = annualKms.value
    leaseTermValue.innerHTML = leaseTerm.value
    driveAwayValue.innerHTML = driveAway.value


 

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
            if(leaseTerm.value==1){
                packages[0].classList.add('active')  
                document.getElementById('package-small-price').innerHTML = `$${numberWithCommas(parseFloat(COST_PER_WEEK.toFixed(0)))}pw`

                document.getElementById('package-large-price').innerHTML = ''
                document.getElementById('package-medium-price').innerHTML = ''

            }else if(leaseTerm.value==5){
                packages[2].classList.add('active')
                document.getElementById('package-large-price').innerHTML = `$${numberWithCommas(parseFloat(COST_PER_WEEK.toFixed(0)))}pw`

                document.getElementById('package-small-price').innerHTML = ''
                document.getElementById('package-medium-price').innerHTML = ''
            }else{
                packages[1].classList.add('active')
                document.getElementById('package-medium-years').innerHTML = `${leaseTerm.value} Yr.`
                document.getElementById('package-medium-price').innerHTML = `$${numberWithCommas(parseFloat(COST_PER_WEEK.toFixed(0)))}pw`

                document.getElementById('package-small-price').innerHTML = ''
                document.getElementById('package-large-price').innerHTML = ''
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
            ELECTRICITY_FEE = parseFloat(electricityInput.value?electricityInput.value: 85.90)
            MAINTENANCE_FEE = parseFloat(maintenanceInput.value?maintenanceInput.value:  48.75)
            INSURANCE_FEE  = parseFloat(insuranceInput.value?insuranceInput.value: 148.64)
            REGISTRATION_FEE = parseFloat(registrationInput.value?registrationInput.value:  57.60)
            TYRES_FEE = parseFloat(tyresInput.value?tyresInput.value: 32.40)
            ROADSIDE_FEE = parseFloat(roadsideInput.value?roadsideInput.value:  29.44)
            OTHERS_FEE = parseFloat(otherInput.value?otherInput.value:  6.15)
            LEASE_MANAGEMENT_FEE = 39
            electricityInput.value = ELECTRICITY_FEE
            maintenanceInput.value = MAINTENANCE_FEE
            insuranceInput.value = INSURANCE_FEE
            registrationInput.value = REGISTRATION_FEE
            tyresInput.value = TYRES_FEE
            roadsideInput.value = ROADSIDE_FEE
            otherInput.value = OTHERS_FEE
                
            MONTHLY_RUNNING_COST = ELECTRICITY_FEE + MAINTENANCE_FEE + INSURANCE_FEE + REGISTRATION_FEE + TYRES_FEE +  ROADSIDE_FEE + OTHERS_FEE + LEASE_MANAGEMENT_FEE
            
            return MONTHLY_RUNNING_COST
        }


//////////////////////////// Pre Tax Calculation Start 
        function calculateFBTExempt(){
            const LeasePayment = calculateLeasePayment();
            const  AnnualMonths = 12

            const PreTaxContribution = (parseFloat(LeasePayment) + MONTHLY_RUNNING_COST) * AnnualMonths

            PRE_TAX_EXEMPT = parseFloat(PreTaxContribution.toFixed(2))
            POST_TAX_EXEMPT = 0
            GST_POST_TAX_EXEMPT = 0

            return PRE_TAX_EXEMPT
        }
        function calculateFBTStatutory(){
            const LeasePayment = calculateLeasePayment();
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
            const FringeBenefitValueExGST =  GSTIncludedInPostTaxContribution + (LeasePayment + MONTHLY_RUNNING_COST) * 12;

            
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
            const  AnnualMonths = 12


            const TotalLeaseOperatingCostsIncGST = ((LeasePayment*1.1)+(MONTHLY_RUNNING_COST*1.1))*12
            const BusinessUsage = BUSINESS_USAGE
            const GrossTaxableValue =(TotalLeaseOperatingCostsIncGST*(1-BusinessUsage))
            const FullGrossedUpTaxableAmount = (GrossTaxableValue*assumptions.FBTGrossedUpMultiplier) 
            const NonExemptGrossedupAmountType1 = FullGrossedUpTaxableAmount 
            const GrosTaxableValueAboveApplicable =  (NonExemptGrossedupAmountType1/assumptions.FBTGrossedUpMultiplier)
            const ExemptGrossedUpAmountType1 = FullGrossedUpTaxableAmount-NonExemptGrossedupAmountType1 
            
            const PostTaxEmployeeContributionMade = GrossTaxableValue 
            const GSTIncludedInPostTaxContribution = (PostTaxEmployeeContributionMade/11) 
            const FringeBenefitValueExGST = ((LeasePayment+MONTHLY_RUNNING_COST)*12)+GSTIncludedInPostTaxContribution 

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
        
        const TaxSavings = (incomeTaxWR - incomeTaxAR)
        const MonthlyTaxSavings = TaxSavings / 12
        
        COST_PER_MONTH = PreTax + PostTax - MonthlyTaxSavings
        
        const preTaxPerWeek = PreTax / 52
        const postTaxPerWeek = PostTax / 52
        const WeeklyTaxSavings = TaxSavings / 52

        COST_PER_WEEK = preTaxPerWeek + postTaxPerWeek - WeeklyTaxSavings

        const LeasePayment = calculateLeasePayment();               
        const LeaseRunnngCostMonthly =  LeasePayment+ MONTHLY_RUNNING_COST //z20
        const GSTSavingsMonthly = LeaseRunnngCostMonthly*0.1 //z21
        const GSTPostTaxDeductionMonthly = GSTPostTax/12 //z22

        OVERALL_GST_SAVING = ((GSTSavingsMonthly-GSTPostTaxDeductionMonthly)*LEASE_PERIOD)+CLAIMABLE_TAX

        OVERALL_INCOME_TAX_SAVING = MonthlyTaxSavings*LEASE_PERIOD

        TOTAL_SAVING_OVERALL = OVERALL_INCOME_TAX_SAVING+OVERALL_GST_SAVING
        TOTAL_SAVING_ANNUAL = TOTAL_SAVING_OVERALL/LEASE_PERIOD*12
        TOTAL_SAVING_MONTHLY = TOTAL_SAVING_OVERALL/LEASE_PERIOD

        // console.log('COST_PER_MONTH',COST_PER_MONTH);
        // console.log('COST_PER_WEEK',COST_PER_WEEK);
        // console.log('OVERALL_GST_SAVING',OVERALL_GST_SAVING);
        // console.log('OVERALL_INCOME_TAX_SAVING',OVERALL_INCOME_TAX_SAVING);
        // console.log('TOTAL_SAVING_OVERALL',TOTAL_SAVING_OVERALL);
        // console.log('TOTAL_SAVING_ANNUAL',TOTAL_SAVING_ANNUAL);
        // console.log('TOTAL_SAVING_MONTHLY',TOTAL_SAVING_MONTHLY);
        
    }
        
    function updateMethod(){

        if(driveAway.value < 94000){
            METHOD = 'FBT Exempt Method'
            document.getElementById('FBT_Slider').classList.add('closed')
            document.getElementById('monthlyBudgetWrap').classList.add('closed')
            document.getElementById('method-name').innerText = 'Exempt Method'
            
        }else if(driveAway.value > 94000){
            METHOD = 'Operating Cost Method'
            document.getElementById('FBT_Slider').classList.remove('closed')
            document.getElementById('monthlyBudgetWrap').classList.remove('closed')
            document.getElementById('method-name').innerText = 'Operating Cost Method'

            const businessSlider = document.getElementById('business-slider')
            const businessUseValue = document.getElementById('business-use-value')
            businessSlider.addEventListener('input',()=> updateAllValues(false))
            BUSINESS_USAGE = METHOD === 'Operating Cost Method' ? parseFloat(businessSlider.value)/100: 20/100;
            businessUseValue.innerHTML = parseFloat((BUSINESS_USAGE*100).toFixed(0)) + ' %'
        }else{
            document.getElementById('FBT_Slider').classList.add('closed')
            document.getElementById('monthlyBudgetWrap').classList.add('closed')
            METHOD = 'Statutory Method'
            document.getElementById('method-name').innerText = 'Statutory Method'
        }

    }

async function  updateAllValues(costItem){
    GROSS_INCOME = parseFloat(taxableSlider.value)
    KM_PER_YEAR = parseFloat(annualKms.value)
    DRIVE_AWAY_PRICE = parseFloat(driveAway.value)
    
    await calculateAssumptions()

    await calculateBudgets()

    if(!costItem){
        updateOperatingCostItems()
    }

    await updateMethod()

  	taxableSliderValue.innerHTML = `$${ taxableSlider.value>220000? '220,000+': numberWithCommas(taxableSlider.value) }/year`
    annualKmsValue.innerHTML = `${ annualKms.value>30000? '30,000+' : numberWithCommas(annualKms.value) } km's`
    leaseTermValue.innerHTML = `${leaseTerm.value} Years`
    driveAwayValue.innerHTML = `$${ numberWithCommas(driveAway.value) }`
    
    await calculateMonthlyRunningCost()
    await calculateLeasePayment()
    await calculateFBTExempt()
    await calculateFBTStatutory()
    await calculateFBTOperatingCost()
    await calculateIncomeTax()
    await calculateIncomeTax('statutory')
    await calculateIncomeTax('exempt')
    await calculateIncomeTax('operating')
    
    await calculateSaving()
    
    document.getElementById('monthlyBudgetVal').innerHTML = numberWithCommas(parseFloat(MONTHLY_RUNNING_COST.toFixed(0)) ) 
    document.getElementById('savings').innerHTML =  numberWithCommas(parseFloat(TOTAL_SAVING_MONTHLY?TOTAL_SAVING_MONTHLY.toFixed(0):0))
    
    if(leaseTerm.value==1){
        document.getElementById('package-small-savings').innerText =`Up to $${numberWithCommas(parseFloat(TOTAL_SAVING_ANNUAL.toFixed(0)))} Saved`
    }else if(leaseTerm.value==5){
        document.getElementById('package-large-savings').innerText = `Up to $${numberWithCommas(parseFloat(TOTAL_SAVING_ANNUAL.toFixed(0)))} Saved`
    }else{
        document.getElementById('package-medium-savings').innerText = `Up to $${numberWithCommas(parseFloat(TOTAL_SAVING_ANNUAL.toFixed(0)))} Saved`
    }
  }

  function calculateAssumptions(){
    let residualRate = parseFloat((0.75-(0.75/8)*(leaseTerm.value)).toFixed(4))
    assumptions = {financeRate:.0875,commissionRate:.08,regoCost:850,dividingFactor:1.042,stampDutyDenominator:200,stampDutyMultiplier:8.4,luxuryCarTaxThreshold:89332,luxuryCarTax:0,FinancingFees:336,documentFees:900,ClaimableGSTCarValueLimit:68108,ResidualValueRate:residualRate,PostTaxDeduction:0,StatutoryMethodRate:.2,DaysInFBTDays:366,MinimumThresholdforFBT:2e3,FBTGrossedUpMultiplier:2.0802,FBTRate:.47,LVA:0,ElectricityCostCentsPerkWH:.3524,ElectricityDefaultValue:.195,MedicareSurcharge:"Not Included",MaintenanceMultiplier:3,MaintenanceFee:.013,EmployerFBTType:"Standard",WhoPaysFBT:"Employee - ECM"}
    return assumptions;
  }

  function initialize(){
    leaseTerm.addEventListener('input',()=> updateAllValues(false))
    taxableSlider.addEventListener('input', ()=> updateAllValues(false))
    annualKms.addEventListener('input', ()=> updateAllValues(false))
    driveAway.addEventListener('input', ()=> updateAllValues(false))
    // methodSwitch.addEventListener('input', updateAllValues)

    electricityInput.addEventListener('input',()=> updateAllValues(true))
    maintenanceInput.addEventListener('input', ()=> updateAllValues(true))
    insuranceInput.addEventListener('input', ()=> updateAllValues(true))
    registrationInput.addEventListener('input', ()=> updateAllValues(true))
    tyresInput.addEventListener('input', ()=> updateAllValues(true))
    roadsideInput.addEventListener('input', ()=> updateAllValues(true))
    otherInput.addEventListener('input', ()=> updateAllValues(true))

    document.getElementById('get-quote-button').addEventListener('click', gotoForm)

    document.getElementById('package-small').addEventListener('click',()=>{ leaseTerm.value = 1; updateAllValues(false)})
    document.getElementById('package-medium').addEventListener('click',()=>{ leaseTerm.value = leaseTerm.value; updateAllValues(false)})
    document.getElementById('package-large').addEventListener('click',()=>{ leaseTerm.value = 5; updateAllValues(false)})


    updateAllValues(false)
  }

  function roundoff(x){
    return parseFloat(x.toFixed(2))
  }

  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    function gotoForm(){
        //firstName=${"oskar"}&lastName=${"rutten"}&phone=${"477440329"}&email=${"rutten.oskar@gmail.com"}&employer=${''}&
        const URL = `/form?car=${SELECTED_VEHICLE}&businessUse=${BUSINESS_USAGE}&term=${LEASE_PERIOD/12}&income=${roundoff(OVERALL_INCOME_TAX_SAVING)}&carPrice=${DRIVE_AWAY_PRICE}&fbtMethod=${METHOD}&electricty=${ELECTRICITY_FEE}&service=${MAINTENANCE_FEE}&insurance=${INSURANCE_FEE}&regisration=${REGISTRATION_FEE}&tyres=${TYRES_FEE}&roadside=${ROADSIDE_FEE}&incidentalother=${OTHERS_FEE}&carColour=${''}&quoteCPW=${roundoff(COST_PER_WEEK)}&savingsPm=${roundoff(OVERALL_INCOME_TAX_SAVING)}&kmPerYear=${KM_PER_YEAR}&totalSavedTax=${roundoff(TOTAL_SAVING_OVERALL)}`
        location.href = URL
    }
    initialize();
}