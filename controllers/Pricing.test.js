const Pricing = require('./pricing');

describe('Pricing', () => {
    describe('calculatePricePerGallon', () => {
        it('should return the flat rate per gallon', () => {
            const pricing = new Pricing("TX",true,100);
            const pricePerGallon = pricing.calculatePricePerGallon();
            expect(pricePerGallon).toEqual(1.71); 
        });
        it("returns flat rate per gallon based on out-of-state,more than 1000 gallons, and with no history",()=>{
            const pricing = new Pricing("CA",false,2000);
            const pricePerGallon = pricing.calculatePricePerGallon();
            expect(pricePerGallon).toEqual(1.74);
        });
        it("returns flat rate per gallon based on out-of-state,more than 1000 gallons, and with history",()=>{
            const pricing = new Pricing("CA",true,2000);
            const pricePerGallon = pricing.calculatePricePerGallon();
            expect(pricePerGallon).toEqual(1.725);
        });
        it("returns flat rate per gallon based on in state,more than 1000 gallons, and with no history",()=>{
            const pricing = new Pricing("TX",false,2000);
            const pricePerGallon = pricing.calculatePricePerGallon();
            expect(pricePerGallon).toEqual(1.71);
        });
    });

    describe('calculateTotalPrice', () => {
        it('should calculate the total price based on gallons requested', () => {
            const pricing = new Pricing("TX",true,100);
            const totalPrice = pricing.calculateTotalPrice();
            expect(totalPrice).toEqual(171); 
        });
        it("calculates total price for out-of-state,more than 1000 gallons, and no history",()=>{
            const pricing = new Pricing("CA",false,2000);
            const totalPrice = pricing.calculateTotalPrice();
            expect(totalPrice).toEqual(3480); 
        });
        it("calculates total price for out-of-state,more than 1000 gallons, and with history",()=>{
            const pricing = new Pricing("CA",true,2000);
            const totalPrice = pricing.calculateTotalPrice();
            expect(totalPrice).toEqual(3450); 
        });
        it("calculates total price for out-of-state,more than 1000 gallons, and with history",()=>{
            const pricing = new Pricing("TX",false,2000);
            const totalPrice = pricing.calculateTotalPrice();
            expect(totalPrice).toEqual(3420); 
        });
    });
});
