import { contactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const students = await contactsCollection.find();
    return students;
  };

  export const getContactById = async (contactId) => {
    const student = await contactsCollection.findById(contactId);
    return student;
  };
