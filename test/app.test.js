const Cube = require('../src/app').Cube;
const expect = require('chai').expect;
const ShoppingCart = require('../src/app').ShoppingCart;
const Item = require('../src/app').Item;

describe('ShoppingCart', () => {
    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    // On aurait pu ici vérifier si le tableau n'était pas vide et rempli avec les bons types
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
            console.log(cart.sumOfItems());
            expect(cart.sumOfItems()).to.equal(90);
        });

        it('should return 0 if the cart is empty', () => {
            expect(cart.sumOfItems()).to.equal(0);
        });
    });


// Partir d'un objet plus complexe avec plus d'articles
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

// On aurait pu tester si on rentre le mauvais type, multiplier les cas d'utilisation (nombres négatifs par ex) checker régulièrement le type de data qu'on a