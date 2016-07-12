function Stack() {
    // initialize an empty array
    this.items = [];
}

// push a new item to the last index
Stack.prototype.push = function(item) {
    this.items.push(item);
};

// remove the last item
Stack.prototype.pop = function() {

    // if the stack is empty, return null
    // (it would also be reasonable to throw an exception)
    if (!this.items.length) return null;

    return this.items.pop();
};

// see what the last item is
Stack.prototype.peek = function() {
    if (!this.items.length) return null;
    return this.items[this.items.length -1];
};


// wrong solution

// MaxStack.prototype = new Stack()

// MaxStack.prototype.getMax = function() {
// 	if (!peek) return null;

// 	if this.items.

// 	var i = this.items.length;
// 	var m = this.items[0]

// 	while (i) {
// 		if (this.items[i] < m) m = this.items[i]
// 		i--;
// 	}
// }


function MaxStack() {
	this.stack = new Stack();
	this.maxStack = new Stack();
}

MaxStack.prototype.push = function(item) {
	this.stack.push(item);

    // every time we push a new item
    // we check if that item is greater than or
    // equal to what is in maxStack
    // if so, then we add it
	if (!this.maxStack.peek() || 
		item >= this.maxStack.peek()) {
        this.maxStack.push(item);
    }
    return item;
}

MaxStack.prototype.pop = function() {
    var item = this.stack.pop();
    // if item is in maxStack, then
    // remove it, leaving previous max
    // this gets O(1) time
    if (item === this.maxStack.peek()) {
        this.maxStack.pop();
    }
    return item;
};

MaxStack.prototype.getMax = function() {
    return this.maxStack.peek();
};

var stack = new MaxStack()
for (var i=0;i<100000;i++) {
	max = 122300
	min = 1
	stack.push(
		Math.floor(Math.random() * (max - min + 1) + min)
		)
}

// console.log(stack)
console.log(stack.getMax())

for (var x=0;x<50000;x++) stack.pop()

// console.log(stack)
console.log(stack.getMax())
