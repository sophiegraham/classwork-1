const mongoose = require('mongoose');
mongoose.connect('mongodb://172.17.0.2:27017/class', { useNewUrlParser: true });

const stateSchema = {
    name: String
};

const addressSchema = mongoose.Schema({
    zipcode: String,
    street: String,
    city: String,
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State' }
});

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        shipping: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            required: true
        },
        preferred: Boolean
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

const State = mongoose.model('State', stateSchema);
const Address = mongoose.model('Address', addressSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

Purchase.findById('5bc4f5feede8b153de70768c')
    // .populate('customer')
    .populate({
        path: 'customer',
        populate: {
            path: 'address.shipping',
            populate: {
                path: 'state'
            }
        }
    })
    .then(console.log)
    .finally(() => mongoose.disconnect());
