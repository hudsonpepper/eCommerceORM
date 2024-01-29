
  # Mockup E-Commerce Backend[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description

  This project is designed to be a mockup mysql database with CRUD functionality through a sequelize backend to emulate an e-commerce database interface.

  You may look at a walkthrough of the functionality here: 
  https://screenrec.com/share/XhoJy5FVQK

  ## Table of Contents
  - [Database Layout](#database)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)


  ## Database

  ### Database Models


* `Category`

  * `id`

    * Integer.
  
    * Doesn't allow null values.
  
    * Set as primary key.
  
    * Uses auto increment.

  * `category_name`
  
    * String.
  
    * Doesn't allow null values.

* `Product`

  * `id`
  
    * Integer.
  
    * Doesn't allow null values.
  
    * Set as primary key.
  
    * Uses auto increment.

  * `product_name`
  
    * String.
  
    * Doesn't allow null values.

  * `price`
  
    * Decimal.
  
    * Doesn't allow null values.
  
    * Validates that the value is a decimal.

  * `stock`
  
    * Integer.
  
    * Doesn't allow null values.
  
    * Set a default value of `10`.
  
    * Validates that the value is numeric.

  * `category_id`
  
    * Integer.
  
    * References the `Category` model's `id`.

* `Tag`

  * `id`
  
    * Integer.
  
    * Doesn't allow null values.
  
    * Set as primary key.
  
    * Uses auto increment.

  * `tag_name`
  
    * String.

* `ProductTag`

  * `id`

    * Integer.

    * Doesn't allow null values.

    * Set as primary key.

    * Uses auto increment.

  * `product_id`

    * Integer.

    * References the `Product` model's `id`.

  * `tag_id`

    * Integer.

    * References the `Tag` model's `id`.

  ### Database Relationships

  * `Category` - `Product` Relationships: 
    * `Product` belongs to `Category`
    * `Category` has many `Product` models

  * `Product` - `Tag` Relationships:
    * `Product` belongs to many `Tag` models
    * `Tag` belongs to many `Product` models. 
    * Products can have many tags and tags can have many products by using the `ProductTag` through model.
  ## Installation

  You can follow the steps in the associated video, or you may follow these steps: open mysql and run "SOURCE ./db/schema.sql", quit out of mysql, run the command "npm i" in the terminal, then you may type "npm run start" to start the server. 

  Optional: you may run "npm run seed" before starting the server if you would like to look at some example seed data. 

  ## Usage

  This may follow the video along the appropriate routes, and this will allow you to utilize the database.

  <!---
      ![alt text](assets/images/screenshot.png)
  -->
  ## Credits

  
  Much of this code comes from coursework from the UPenn Fullstack Development Bootcamp.

  ## License

   The MIT License (MIT)

    Copyright © 2023 Hudson Pepper
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    


  ## Badges

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## How to Contribute

  Feel free to fork and do whatever changes you would like.

  ## Tests

  There is no testing suite, however you may test the routes within Insomnia.

  