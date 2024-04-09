class Pricing {
    constructor() {
        
    }

    calculatePricePerGallon(gallonsRequested) {
        const flatRatePerGallon = 0.50; 
        return flatRatePerGallon;
    }

    calculateTotalPrice(gallonsRequested) {
        const flatRatePerGallon = 0.50; 
        return parseFloat(gallonsRequested) * flatRatePerGallon;
    }
}

module.exports = Pricing;