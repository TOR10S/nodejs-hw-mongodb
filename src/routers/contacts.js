import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
const ContactRouter = Router();

ContactRouter.get("/contacts", ctrlWrapper(getAllContactsController));

ContactRouter.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactByIdController));

ContactRouter.post("/contacts", validateBody(createContactSchema), ctrlWrapper(createContactController));

ContactRouter.patch("/contacts/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

ContactRouter.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default ContactRouter;
