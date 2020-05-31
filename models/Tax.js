class Tax {
    
    constructor() {
        
        this.taxConfig = [
            {
                "minNetIncome": 5000000,
                "taxRate": 35
            },
            {
                "minNetIncome": 2000000,
                "taxRate": 30
            },
            {
                "minNetIncome": 1000000,
                "taxRate": 25
            },
            {
                "minNetIncome": 750000,
                "taxRate": 20
            },
            {
                "minNetIncome": 500000,
                "taxRate": 15
            },
            {
                "minNetIncome": 300000,
                "taxRate": 10
            },
            {
                "minNetIncome": 150000,
                "taxRate": 5
            },
            {
                "minNetIncome": 0,
                "taxRate": 0
            }
        ];
    }

    calculateTax(netIncome) {
        
        let result = { 'pit': 0, 'netIncome': netIncome };

        let pit = this.processCalculateTax(netIncome);
        result.pit = pit;
        
        return result;
    }

    processCalculateTax(netIncome) {
        let result = 0;
        const taxConfig = this.taxConfig;
        
        for(let i=0; i<(taxConfig.length-1); i++) {
            let minNetIncome = taxConfig[i].minNetIncome;
            let taxRate = taxConfig[i].taxRate;

            if( netIncome > minNetIncome ) {
                result = ((netIncome - minNetIncome) * (taxRate / 100)) + this.processCalculateTax(minNetIncome);
                break;
            }
            
        }
        
        return result;
    }

}

module.exports = Tax;