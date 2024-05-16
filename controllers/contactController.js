const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find();
    res.status(200).json({ data: contact, message: "Get all Contact data" })
})
const createContact = asyncHandler(async (req, res) => {
    console.log("the req body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).send({ message: "All Fields are mandatory" });
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json({ contact, message: "contact created successfully" })
})

const getContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json({ contact, message: `Get contact for ${id}` })
})

const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    res.status(200).json({ updatedContact, message: "Contact updated successfully" });
});

const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: ` Contact Deleted Successfully` })
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }