const Pricing = require('./pricing');

describe('Pricing', () => {
    describe('calculatePricePerGallon', () => {
        it('should return the flat rate per gallon', () => {
            const pricing = new Pricing();
            const pricePerGallon = pricing.calculatePricePerGallon(100);
            expect(pricePerGallon).toEqual(0.50); 
        });
    });

    describe('calculateTotalPrice', () => {
        it('should calculate the total price based on gallons requested', () => {
            const pricing = new Pricing();
            const totalPrice = pricing.calculateTotalPrice(100);
            expect(totalPrice).toEqual(50); 
        });
    });
});
