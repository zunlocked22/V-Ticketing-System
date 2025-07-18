const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

// Route to create a new ticket
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const newTicket = new Ticket({
      title,
      description,
      priority,
    });

    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Route to get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

module.exports = router;
