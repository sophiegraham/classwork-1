const mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2:27017/class', { useNewUrlParser: true });

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    type: {
        type: String,
        default: 'for-profit'
    },
    address: {
        street: String,
        city: String,
        zip: String,
        state: {
            type: String,
            enum: [
                'AL',
                'AK',
                'AS',
                'AZ',
                'AR',
                'CA',
                'CO',
                'CT',
                'DE',
                'DC',
                'FM',
                'FL',
                'GA',
                'GU',
                'HI',
                'ID',
                'IL',
                'IN',
                'IA',
                'KS',
                'KY',
                'LA',
                'ME',
                'MH',
                'MD',
                'MA',
                'MI',
                'MN',
                'MS',
                'MO',
                'MT',
                'NE',
                'NV',
                'NH',
                'NJ',
                'NM',
                'NY',
                'NC',
                'ND',
                'MP',
                'OH',
                'OK',
                'OR',
                'PW',
                'PA',
                'PR',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VT',
                'VI',
                'VA',
                'WA',
                'WV',
                'WI',
                'WY'
            ]
        }
    },
    size: {
        type: Number,
        min: 0
    },
    founded: Date,
    isHip: Boolean,
    keywords: {
        type: [String],
        validate: {
            validator: (keywords) => {
                return keywords.every(keyword => keyword.length <= 100);
            }
        }
    }
});

const Company = mongoose.model('Company', companySchema);


test('create module', () => {
    const companyToCreate = {
        name: 'myCompany',
        description: 'we are great',
        address: {
            street: '1234 west',
            city: 'noWhere',
            zip: '12345',
            state: 'OR'
        },
        size: 0,
        founded: Date.now(),
        isHip: false,
        keywords: ['n'.repeat(99)]
    };

    return Company.create(companyToCreate)
        .then(company => {
            expect(company.toJSON())
                .toEqual({ ...companyToCreate, type: 'for-profit', _id: expect.any(Object), __v: 0, founded: expect.any(Object) });
        })
        .then(() => mongoose.disconnect());
});
