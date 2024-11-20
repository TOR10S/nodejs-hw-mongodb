import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactController, GetAllContactsController, GetContactByIdController, patchContactController } from '../controllers/contacts.js';
const ContactRouter = Router();

ContactRouter.get("/contacts", ctrlWrapper(GetAllContactsController));

ContactRouter.get("/contacts/:contactId", ctrlWrapper(GetContactByIdController));

ContactRouter.post("/contacts", ctrlWrapper(createContactController));

ContactRouter.patch("/contacts/:contactId", ctrlWrapper(patchContactController));

ContactRouter.delete("/contacts/:contactId", ctrlWrapper(patchContactController));

export default ContactRouter;
