const http = require('http');
const fs = require('fs').promises; // Import fs.promises for async file operations
const path = require('path');

const cron = require('node-cron');

// Schedule a cron job to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Cron job executed every 5 minutes.');
  
});

const server = http.createServer(async (req, res) => {
  // Set the content type to XML
  res.setHeader('Content-Type', 'application/xml');

  // Check if the request URL is for the root path
  if (req.url === '/') {
    try {
      // Read the XML file and send it as the response
      const data = await fs.readFile(path.join(__dirname, 'data', 'my_feed.xml'));
      res.statusCode = 200; // OK
      res.end(data);
    } catch (err) {
      // Handle errors here
      console.error(err);
      res.statusCode = 500; // Internal Server Error
      res.end('Error serving XML file');
    }
  } else {
    // Handle requests for other paths (e.g., 404 Not Found)
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 8910;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
