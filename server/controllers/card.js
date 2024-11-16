const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample route to send data
app.get('/api/cards', (req, res) => {
  res.json([
    { id: 1, title: 'Card 1', description: 'This is card 1' },
    { id: 2, title: 'Card 2', description: 'This is card 2' },
    { id: 3, title: 'Card 3', description: 'This is card 3' },
  ]);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
