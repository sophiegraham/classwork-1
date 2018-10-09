## Schema

* Company
    * `name` - String
    * `description` - String
    * `type` - String
    * `address`
        * `street` - String
        * `city` - String
        * `zip` - String
        * `state` - String
    * `size` - Number
    * `founded` - Date
    * `isHip` - Boolean
    * `keywords` - Array of Strings

1. Create a sandbox.js file:
    ```js
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/class', { useNewUrlParser: true })

    // Do Stuff here
    ```
1. Write Test
    * Create data with all required fields and pass to model
    checking that `.toJSON()` gives back all fields
1. Model
    1. Write Schema
    1. Create Model (give singular name `'Company'`)
1. Profit!
