const processForm = (req, res, next) => {
    // Process form data here
    // For now, just return a response to confirm form submission
    res.send('Form submission processed');
    next(); // Call next to move to the next middleware/route handler
  };
  
  module.exports = { processForm };
  