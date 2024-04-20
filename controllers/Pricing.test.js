const Pricing = require('./pricing');

describe('Pricing', () => {
    describe('calculatePricePerGallon', () => {
        it('should return the calculated price per gallon', () => {
            const pricing = new Pricing('VA', false, 1500);
            const pricePerGallon = pricing.calculatePricePerGallon();
            const expectedPricePerGallon = 1.5 + 1.5 * (0.04 - 0.00 + 0.02 + 0.10);
            expect(pricePerGallon).toEqual(expectedPricePerGallon); 
        });
    });

    describe('calculateTotalPrice', () => {
        it('should calculate the total price based on gallons requested', () => {
            const pricing = new Pricing('TX', true, 100);
            const totalPrice = pricing.calculateTotalPrice();
            const expectedTotalPrice = 100 * (1.5 + 1.5 * (0.02 - 0.01 + 0.03 + 0.10));
            expect(totalPrice).toEqual(expectedTotalPrice); 
        });
    });
});
