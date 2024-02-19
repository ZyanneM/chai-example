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

    clearShoppingCart() {
        this.items = [];
    }
}

module.exports = {
    Cube, Item, ShoppingCart
}