import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController } from '../controllers/contacts.js';
const ContactRouter = Router();

ContactRouter.get("/contacts", ctrlWrapper(getAllContactsController));

ContactRouter.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));

ContactRouter.post("/contacts", ctrlWrapper(createContactController));

ContactRouter.patch("/contacts/:contactId", ctrlWrapper(patchContactController));

ContactRouter.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));

export default ContactRouter;
