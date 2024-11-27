import { SORT_ORDER } from "../constants/index.js";
import { contactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id', filter = {}}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = contactsCollection.find();
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  const [contactsCount, contacts] = await Promise.all([
    contactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {data: contacts,
      ...paginationData
    };
  };

  export const getContactById = async (contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
  };

  export const createContact = async (payload) => {
    const contacts = await contactsCollection.create(payload);
    return contacts;
  };

  export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  };

  export const deleteContact = async (contactId) => {
    const contact = await contactsCollection.findOneAndDelete({
      _id: contactId
    });
    return contact;
  };
