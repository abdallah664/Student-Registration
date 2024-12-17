const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;


let records = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Smith', age: 25 }
];

app.use(bodyParser.json());
app.use(express.static('public')); 


app.get('/api/records', (req, res) => {
  res.json(records);
});


app.post('/api/records', (req, res) => {
  const record = req.body;

  
  if (!record.name || !record.age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  records.push(record);
  res.status(201).json(record);
});

app.put('/api/records/:index', (req, res) => {
  const { index } = req.params;
  const updatedRecord = req.body;


  if (!records[index]) {
    return res.status(404).json({ error: 'Record not found' });
  }


  if (!updatedRecord.name || !updatedRecord.age) {
    return res.status(400).json({ error: 'Name and age are required' });
  
  records[index] = updatedRecord;
  res.json(updatedRecord);
});

app.delete('/api/records/:index', (req, res) => {
  const { index } = req.params;


  if (!records[index]) {
    return res.status(404).json({ error: 'Record not found' });
  }


  records.splice(index, 1);
  res.sendStatus(204);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
