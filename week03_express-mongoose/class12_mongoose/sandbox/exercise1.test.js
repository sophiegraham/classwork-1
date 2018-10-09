const mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2:27017/class', { useNewUrlParser: true });

const companySchema = mongoose.Schema({
    name: String,
    description: String,
    type: String,
    address: {
        street: String,
        city: String,
        zip: String,
        state: String
    },
    size: Number,
    founded: Date,
    isHip: Boolean,
    keywords: [String]
});

const Company = mongoose.model('Company', companySchema);


xtest('create module', () => {
    const companyToCreate = {
        name: 'myCompany',
        description: 'we are great',
        type: 'nothing',
        address: {
            street: '1234 west',
            city: 'noWhere',
            zip: '12345',
            state: 'someWhere'
        },
        size: 500,
        founded: Date.now(),
        isHip: false,
        keywords: ['nothing']
    };

    return Company.create(companyToCreate)
        .then(company => {
            expect(company.toJSON())
                .toEqual({ ...companyToCreate, _id: expect.any(Object), __v: 0, founded: expect.any(Object) });
        })
        .then(() => mongoose.disconnect());
});
