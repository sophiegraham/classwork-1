const mongoose = require('mongoose');
mongoose.connect('mongodb://172.17.0.2:27017/class', { useNewUrlParser: true });

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    preferredName: String
});

const purchaseSchema = mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    tax: Number,
    shippingAddress: String,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
});

const Customer = mongoose.model('Customer', customerSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

// Create a customer and associate purchase
Customer.create({
    name: 'hello',
    address: 'nowhere',
})
    .then(customer => {
        return Purchase.create({
            totalPrice: 100,
            customer: customer._id
        });
    })
    .finally(() => mongoose.disconnect());


// Retrieve a purchase and populate customer field
Purchase
    .findById('5bbfc52b09ae8679f30fb8dc')
    .populate('customer')
    .then(console.log)
    .finally(mongoose.disconnect.bind(mongoose));

// Retrieve all purchases by a customer
Purchase
    .find({ customer: '5bbfc52b09ae8679f30fb8db' })
    .then(console.log)
    .finally(mongoose.disconnect.bind(mongoose));

// Find all purchases by a customer with access to only one purchase
Purchase
    .findById('5bbfc52b09ae8679f30fb8dc')
    .populate('customer')
    .then(purchase => {
        return Purchase.find({ customer: purchase.customer._id });
    })
    .then(console.log)
    .finally(mongoose.disconnect.bind(mongoose));

// Find a customer by id and all of their purchases
Promise.all([
    Customer.findById('5bbfc52b09ae8679f30fb8db').select({ __v: false }).lean(),
    Purchase.find().where('customer').equals('5bbfc52b09ae8679f30fb8db').select({ totalPrice: true }).lean()
])
    .then(([customer, purchases]) => {
        console.log(purchases);
        console.log(customer);
    })
    .finally(mongoose.disconnect.bind(mongoose));

// Common pattern (not for mongoose!) to save state between promises
// in a chain. Useful when you are attempting to save state outside
// promises
Purchase
    .find()
    .where('customer')
    .equals('5bbfc52b09ae8679f30fb8db')
    .select({ totalPrice: true })
    .lean()
    .then(purchases => {
        return Promise.all([Promise.resolve(purchases), Customer.findById(purchases[0].customer)]);
    })
    .then(([purchases, customer]) => {

    })
    .finally(mongoose.disconnect.bind(mongoose));
