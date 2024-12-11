import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';
const ContactRouter = Router();

ContactRouter.use(authenticate);

ContactRouter.get("/", ctrlWrapper(getAllContactsController));

ContactRouter.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

ContactRouter.post("/", upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));

ContactRouter.patch("/:contactId", upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

ContactRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default ContactRouter;
