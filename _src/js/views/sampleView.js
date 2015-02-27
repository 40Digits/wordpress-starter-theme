module.exports = function() {
	console.log('Sample EJS Template');

	var sampleTemplate = require('../templates/sampleTemplate.ejs');
	console.log(sampleTemplate({ data: "Hello" }));
}