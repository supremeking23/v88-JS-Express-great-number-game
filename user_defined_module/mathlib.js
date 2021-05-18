module.exports = () => {
	return {
		add: (num1, num2) => {
			return num1 + num2;
		},
		multiply: (num1, num2) => {
			return num1 * num2;
		},
		square: (num) => {
			return num * num;
		},
		random: (min, max) => {
			//returns a number between num1 and num2 inclusive
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
	};
};
