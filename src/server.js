import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env("PORT","3000"));

export default function setupServer() {
const app = express();
app.use(express.json());
app.use(cors());
app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

app.get("/contacts", async (req, res) => {
  let contacts = await getAllContacts();

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts
});
});
app.get("/contacts/:contactId", async (req, res) => {
  let { contactId } = req.params;
  let contact = await getContactById(contactId);
  if (contact) {
    res.json({
      status: 200,
	message: "Successfully found contact with id {contactId}!",
	data: contact
    });
    return;
  }

  res.status(404).json({
    message: 'Contact not found',
  });
});

app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
