const Cube = require('../src/app').Cube;
const expect = require('chai').expect;
const { describe } = require('mocha');
const { Item, ShoppingCart, Stock, Discount } = require('../src/app');

describe('ShoppingCart', () => {
    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    describe('addItem', () => {
        it('should add an item to the cart', () => {
            const item = new Item('Livre', 2, 20);
            cart.addItem(item);
            expect(cart.items).to.deep.equal([item]);
        });
    });

    describe('sumOfItems', () => {
        it('should return the total sum of items in the cart', () => {
            const item1 = new Item('Livre', 2, 20);
            const item2 = new Item('Chaussures', 1, 50);
            cart.addItem(item1);
            cart.addItem(item2);
            expect(cart.sumOfItems()).to.equal(90);
        });

        it('should return 0 if the cart is empty', () => {
            expect(cart.sumOfItems()).to.equal(0);
        });
    });

    describe('removeItem', () => {
        it('should remove an item from the cart', () => {
            const item = new Item('Livre', 2, 20);
            cart.addItem(item);
            cart.removeItem(item);
            expect(cart.items).to.be.empty;
        });

        it('should not modify the cart if the item is not in the cart', () => {
            const item1 = new Item('Livre', 2, 20);
            const item2 = new Item('Chaussures', 1, 50);
            cart.addItem(item1);
            cart.removeItem(item2);
            expect(cart.items).to.have.lengthOf(1);
        });
    });

    describe('clearShoppingCart', () => {
        it('should remove all items from the cart', () => {
            const item1 = new Item('Livre', 2, 20);
            const item2 = new Item('Chaussures', 1, 50);
            cart.addItem(item1);
            cart.addItem(item2);
            cart.clearShoppingCart();
            expect(cart.items).to.be.empty;
        });
    });
});

describe ('applyDiscount', () => {
    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    it('should apply discount on Item', () => {
        const item1 = new Item('Livre', 1, 100);
        const discount = new Discount(20);
        console.log('ITEM PRICE', item1.price);
        console.log('DISCOUNT', discount.discount);
        const newPrice = cart.addDiscountToItem(discount, item1);
        console.log('NEW PRICE', newPrice);
        expect(newPrice).to.equal(80);
    }),
    it('should not have a negative price after discount', () => {
        const item = new Item('Babiole', 1, 10);
        const discount = new Discount(20);
        const newPrice = cart.addDiscountToItem(discount, item);
        expect(newPrice).to.be.at.least(0);
    });
    it('should apply discount only once', () => {
        const item = new Item('Jolie Babiole', 1, 100);
        const itemId = item.id;
        const discount = new Discount(20);
        console.log('DISPLAY', item.discountApplied);
        const newPrice = cart.addDiscountToItem(discount, item);
        console.log('NEW PRICE 1', newPrice);
        console.log('NEW DISPLAY', item.discountApplied);
        const newPrice2 = cart.addDiscountToItem(discount, item);
        console.log('NEW PRICE 2', newPrice2);
        expect(newPrice2).to.equal(80);
    });
    it('item with specific id has already discounted', () => {
        const items = [
            new Item('Livre', 2, 20),
            new Item('Chaussures', 1, 100),
            new Item('Fraises', 2, 8, true, 7),
            new Item('Fromage', 1, 5, true, 14),
            new Item('Céréales', 2, 6, true, 30),
            new Item("Jus d'orange", 1, 5, true, 5)
        ]
        const testItem = items[1];
        const testItemId = testItem.id;
        const discount = new Discount(20);
        const discount2 = new Discount(10);
        console.log('DISPLAY', testItem.discountApplied);
        const newPrice = cart.addDiscountToItem(discount, testItem);
        console.log('NEW PRICE 1', newPrice);
        console.log('NEW DISPLAY', testItem.discountApplied);
        const newPrice2 = cart.addDiscountToItem(discount,testItem);
        console.log('NEW PRICE 2', newPrice2);
        const newPrice3 = cart.addDiscountToItem(discount2, testItem);
        console.log('NEW PRICE 3', newPrice3);
        const newPrice4 = cart.addDiscountToItem(discount, testItem);
        console.log('NEW PRICE 4', newPrice4);
        expect(newPrice4).to.equal(72);

        // const test = cart.hasDiscountBeenApplied(testItemId, items);
        // expect(test).to.equal(true);
    });
});

describe('Stock', () => {
    it('should add an item to the stock', function() {
        const stock = new Stock();
        const item = new Item('Test Item', 100, 1);

        stock.addItem(item);

        expect(stock.items).to.include(item);
    });

    it('should remove an item from the stock', function() {
        const stock = new Stock();
        const item = new Item('Test Item', 100, 1);
    
        stock.addItem(item);
        stock.removeItem(item.name);
    
        expect(stock.items).to.not.include(item);
    });

    it('should return the correct total quantity after adding an item', function() {
        const stock = new Stock();
        const item = new Item('Test Item', 100, 1);
    
        stock.addItem(item);
    
        const totalQuantity = stock.getTotalQuantity();
    
        expect(totalQuantity).to.equal(item.quantity);
    });

    it('should return the total of items in the stock', () => {

        const itemsData = [
            new Item('Livre', 2, 20),
            new Item('Chaussures', 1, 50),
            new Item('Fraises', 2, 8, true, 7),
            new Item('Fromage', 1, 5, true, 14),
            new Item('Céréales', 2, 6, true, 30),
            new Item("Jus d'orange", 1, 5, true, 5)
        ];
        itemsData.forEach(item => {
            console.log(item.expirationDate);
        })
            
        const stock = new Stock();
        const currentDate = new Date();
        itemsData.forEach(itemData => {
            const item = new Item(itemData.name, itemData.quantity, itemData.price, itemData.food, itemData.daysUntilExpiration, currentDate);
            stock.addItem(item);
        })
        const totalQuantity = stock.getTotalQuantity();
        expect(totalQuantity).to.equal(9);
});

it('should not have a negative total quantity', function() {
    const stock = new Stock();
    const item = new Item('Test Item', 100, 1);

    stock.addItem(item);
    stock.removeItem(item.name, item.quantity + 1);

    const totalQuantity = stock.getTotalQuantity();

    expect(totalQuantity).to.equal(0);
});

});
// On aurait pu tester si on rentre le mauvais type, multiplier les cas d'utilisation (nombres négatifs par ex) checker régulièrement le type de data qu'on a

//TESTS DE NON REGRESSION
// Ex : vérifier les perfs de l'API, vérifier que les calculs ont la même précisions, qu'un type n'a pas sauté etc

//TESTS END TO END
//Tests fonctionnels comme Cypress ou Selenium