module.exports = function(height)
{
	var max = height * 0.50; // max is 50% of height
	var min = height * 0.40; // min is 40% of height

	return Math.floor(Math.random() * (max - min + 1)) + min;
};
