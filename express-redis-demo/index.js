
const express = require('express');
const Redis = require('ioredis');

const app = express();
app.use(express.json());

// Connect to Redis
const redis = new Redis({
  // Add your Redis connection options here
  // For example:
  // host: 'localhost',
  // port: 6379,
});

// Redis SET command
app.post('/set', async (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).send('Key and value are required');
  }
  try {
    await redis.set(key, value);
    res.send(`Set ${key} to ${value}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Redis GET command
app.get('/get/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const value = await redis.get(key);
    if (value === null) {
      return res.status(404).send('Key not found');
    }
    res.send({ key, value });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Redis DEL command
app.delete('/del/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const result = await redis.del(key);
    if (result === 0) {
      return res.status(404).send('Key not found');
    }
    res.send(`Deleted ${key}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Redis ZADD command for ranking
app.post('/zadd', async (req, res) => {
  const { key, score, member } = req.body;
  if (!key || !score || !member) {
    return res.status(400).send('Key, score, and member are required');
  }
  try {
    await redis.zadd(key, score, member);
    res.send(`Added ${member} with score ${score} to ${key}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Redis ZRANGE command for ranking
app.get('/zrange/:key/:start/:stop', async (req, res) => {
  const { key, start, stop } = req.params;
  try {
    const range = await redis.zrange(key, start, stop, 'WITHSCORES');
    res.send(range);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Redis ZREVRANGE command for ranking
app.get('/zrevrange/:key/:start/:stop', async (req, res) => {
  const { key, start, stop } = req.params;
  try {
    const range = await redis.zrevrange(key, start, stop, 'WITHSCORES');
    res.send(range);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Redis ZSCORE command for ranking
app.get('/zscore/:key/:member', async (req, res) => {
  const { key, member } = req.params;
  try {
    const score = await redis.zscore(key, member);
    if (score === null) {
      return res.status(404).send('Member not found');
    }
    res.send({ member, score });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
