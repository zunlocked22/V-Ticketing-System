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
// Fetch all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find(); // Fetch all tickets from MongoDB
    res.status(200).json(tickets); // Send the list of tickets as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});


// Update ticket status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update ticket status' });
  }
});


module.exports = router;
