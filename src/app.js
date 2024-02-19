class Cube {
    constructor(length) {
        this.length = length;
    }
    
    getSideLength() {
        return this.length;
    }
    
    getSurfaceArea() {
        return (this.length * this.length) * 6;
    }
    
    getVolume() {
        return Math.pow(this.length, 3);
    }
}

class Item {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

class Discount {
    constructor(discount) {
        this.discount = discount;
    }
}

class Stock {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemName) {
        this.items = this.items.filter(item => item.name !== itemName);
    }

    getItem(itemName) {
        return this.items.find(item => item.name === itemName);
    }

    getTotalQuantity() {
        console.log('THIS ITEMS',this.items);
        let totalQuantity = 0;
        for (let i = 0; i < this.items.length; i++) {
        totalQuantity += this.items[i].quantity;
        }
        console.log('TOTAL QUANTITY', totalQuantity);
        return totalQuantity
    }

    updateItemQuantity(itemName, quantity) {
        const item = this.getItem(itemName);
        if (item) {
            item.quantity = quantity;
        }
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    sumOfItems() {
        let total = 0;
        for (let item of this.items) {
            total += item.quantity * item.price;
        }
        return total;
    }

    addDiscountToItem(discount, item) {

        const discountAmount = (item.price * (discount.discount / 100));
        const afterDiscount = item.price - discountAmount;
        
        return afterDiscount;
    }

    clearShoppingCart() {
        this.items = [];
    }
}

module.exports = {
    Cube, Item, ShoppingCart, Discount, Stock
}