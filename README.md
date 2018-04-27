# NodeJS Form Validator
A form validator build for node js.

With NodeJS Form validator, you can compare your form input or the user input with a schema that you have previously built.

## Installation
In order to install NodeJS Form Validator, you need to run:

  npm install nodejs-form-validator

Once you have installed, you need to import the package inside your project. You can do it with:

  //Using Node.js `require()`
  const Validate = require('nodejs-form-validator');

  //Using ES6 imports
  import Validate from 'nodejs-form-validator';

Easy, isn't it?

## Overview
NodeJS Form Validator can be very helpful to help you to validate user input based on your fixed schema. It can be used both front-end and back-end to validate, for example, forms.

Before you use NodeJS Form Validator, you need to create 'validation schemas', which are simple js objects very easy to configure.
Something like this:

  //USER MODEL
  const userSchema = {
    firstName: {
      minLength: {
        value: 2,
        error: "The first name must be at least 5 chars long"
      },
      maxLength: {
        value: 5,
        error: "The first name must be maximum 20 chars long"
      }
    },
    lastName: {
      minLength: {
        value: 5,
        error: "The last name must be at least 5 chars long"
      },
      maxLength: {
        value: 20,
        error: "The last name must be maximum 20 chars long"
      }
    },
    age: {
      isNumber: "The age must be a valid number"
    },
    dateOfBirth: {
      isDate: "The date of birth must be a valid date"
    },
    email: {
      required: "E-mail is required",
      isEmail: "E-mail not valid"
    }
  }

As you can see, you can use it to validate several things. You can check if the input has a minimum (or a maximum) number of chars, if it's a valid email, if it's a valid number, if it's a valid date and finally if it's required.
Also, you can configure the error message, in case the condition doesn't come true.

Now let's try to validate our user input. We have an object like this:

  const userInput = {
    name: "John",
    surname: "Doe",
    email: "john@example.com"
  }

Now, in order to validate, we need to run the following code:

  const errors = Validate(userSchema, userInput);

If there are errors, they'll be stored in the 'errors' var.

Another useful thing that NodeJS Form Validator does is to check that the only input provided by the user are the ones in the schema, so if for example we try to validate an object like the following, we'll get an error:

  const wrongUserInput = {
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    address: "Jonh's address"
  }

We'll get the following json error:

  {
    field: "address",
    error: "Missing field in the model"
  }

This happens because the user has provided an information that is not expected in the schema.
