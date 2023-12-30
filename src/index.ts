import express, { Request, Response } from "express";
import cors from "cors";
import { Contact } from "./models/contact";

const app = express();
const port = 5000; // Changed port to 5000

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json());

// In-memory data store
let contacts: Contact[] = [];
let currentId = 0;

// POST endpoint to add a new contact
app.post("/contacts", (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  const newContact: Contact = { id: ++currentId, name, email, phone };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// GET endpoint to retrieve all contacts
app.get("/contacts", (req: Request, res: Response) => {
  res.status(200).json(contacts);
});

// GET endpoint to retrieve a specific contact by ID
app.get("/contacts/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((c) => c.id === id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).send("Contact not found");
  }
});

// PUT endpoint to update a contact by ID
app.put("/contacts/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex((c) => c.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...req.body };
    res.status(200).json(contacts[index]);
  } else {
    res.status(404).send("Contact not found");
  }
});

// DELETE endpoint to delete a contact by ID
app.delete("/contacts/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  contacts = contacts.filter((c) => c.id !== id);
  res.status(200).send(`Contact with id ${id} deleted`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
