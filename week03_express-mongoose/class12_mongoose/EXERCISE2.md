Add Validation

* Company
    * `name` - required String
    * `description` - String
    * `type` - String default 'for-profit'
    * `address`
        * `street` - String
        * `city` - String
        * `zip` - required String
        * `state` - String enum of state codes (google it!)
    * `size` - Number, min 0
    * `founded` - Date
    * `isHip` - Boolean
    * `keywords` - Array of Strings each max 100 characters
