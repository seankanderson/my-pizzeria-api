const request = require("supertest");
const express = require("express");
const app = express();
const db = require('./_helpers/db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

jest.mock('./_helpers/db')
jest.mock('bcryptjs')
jest.mock('mongoose')
describe('My Test Suite', () => {
    
    mongoose.fineOne.mockResolvedValue({
        email: 'sean.anderson@',
        isVerified: true
    })
    bcrypt.compareSync.mockReturnValue(true)
    
    it('My Test Case', async () => {
       const result = await request(app)
            .post("/authenticate")
            .type("body")
            .send({ body: {email: '', password:''}})
        console.log('result...', result)
        })
    });

