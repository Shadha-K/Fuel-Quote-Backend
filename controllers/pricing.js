class Pricing {
    constructor(state, rateHistory, gallonsRequested) {
        this.state = state;
        this.rateHistory = rateHistory;
        this.gallonsRequested = gallonsRequested;
    }

    calculatePricePerGallon() {
        const currentPricePerGallon = 1.50; 
        let locationFactor = 0.04;
        let gallonsFactor = 0.03; 

        if (this.state === 'TX') {
            locationFactor = 0.02;
        }

        const rateHistoryFactor = this.rateHistory ? 0.01 : 0;

        if (this.gallonsRequested > 1000) {
            gallonsFactor = 0.02; 
        }

        const companyProfitFactor = 0.10;

        const margin = currentPricePerGallon * (locationFactor - rateHistoryFactor + gallonsFactor + companyProfitFactor);
        const suggestedPricePerGallon = currentPricePerGallon + margin;

        return suggestedPricePerGallon;
    }

    calculateTotalPrice() {
        const suggestedPricePerGallon = this.calculatePricePerGallon();
        return parseFloat(this.gallonsRequested) * suggestedPricePerGallon;
    }
}

module.exports = Pricing;
