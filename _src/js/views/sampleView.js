
module.exports = function() {
	console.log('Sample View');

	var sampleTemplate = require('./../templates/sampleTemplate.ejs');
	console.log(sampleTemplate({ data: "Hello" }));
}