function Operator(precedence, associative, doGroup, expression, arity, rank, symbol, op)
{
	this.precedence = precedence;
	this.associative = associative;
	this.doGroup = doGroup;
	this.expression = expression;
	this.arity = arity;
	this.op = op;
	this.rank = rank;
	this.symbol = symbol;
}

Operator.prototype.toString = function()
{
	return this.symbol;
}

function GenerateText(minOperations, maxOperations)
{
	this.values =		[
	             		 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
	             		];

	this.characters =	[
	                 	 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd',
	                 	 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'N', 'n',
	                 	 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'X', 'x', 'Y', 'y',
	                 	 'Z', 'z', '@', '#', '$', '%', '&', '*', '-', '+', '=', '?', '.', '!'
	                 	];

	this.operators = [];

	this.minOperations = ((!minOperations || minOperations < 1) ? 2: minOperations);
	this.maxOperations = ((!maxOperations || this.minOperations > maxOperations) ? this.minOperations + 4 : maxOperations);

	this.string = '';
	this.operation = [];
	this.solution = null;

	this.operators.push(new Operator(5, true, true, '$1 + $2', 2, 0, '+', function(a, b) { return a + b; }));
	this.operators.push(new Operator(5, false, true, '$1 - $2', 2, 0, '-', function(a, b) { return a - b; }));
	this.operators.push(new Operator(3, true, true, '$1 x $2', 2, 1, 'x', function(a, b) { return a * b; }));
	this.operators.push(new Operator(3, false, false, '$1 / $2', 2, 1, '/', function(a, b) { return a / b; }));

	this.operators.push(new Operator(6, true, true, '($1 + $2)', 2, 2, '+', function(a, b) { return a + b; }));
	this.operators.push(new Operator(6, false, true, '($1 - $2)', 2, 2, '-', function(a, b) { return a - b; }));
	this.operators.push(new Operator(6, true, true, '($1 x $2)', 2, 2, 'x', function(a, b) { return a * b; }));
	this.operators.push(new Operator(6, false, false, '($1 / $2)', 2, 2, '/', function(a, b) { return a / b; }));
}

GenerateText.prototype.randInt = function(n, m)
{
	return n + Math.floor(Math.random() * (m - n + 1));
}

GenerateText.prototype.generateMath = function()
{
	var operations = this.randInt(this.minOperations, this.maxOperations);

	var operationsArray = [];
	var expressionString = '';

	for (var counter = 0; counter < operations; counter++)
	{
		// Make sure that if we're on our last operation that we
		// don't add a parenthetical, since those count as two
		// operations.
		var operatorObject = null;
		if ((counter + 1) == operations)
		{
			operatorObject = this.operators[this.randInt(0, 3)];
		}
		else
		{
			operatorObject = this.operators[this.randInt(0, this.operators.length - 1)];
		}

		var indexOne = this.randInt(0, this.values.length - 1);
		var valueOne = this.values[indexOne];
		var indexTwo = this.randInt(0, this.values.length - 1);
		var valueTwo = this.values[indexTwo];

		// If we're on the first item we need to add two values to
		// our operations array
		if (counter == 0)
		{
			// Sanity check, make sure any division operation returns
			// a whole number and not a decimal.
			if (!operatorObject.associative && !operatorObject.doGroup)
			{
				while (valueOne % valueTwo != 0)
				{
					indexTwo = this.randInt(0, this.values.length - 1);
					valueTwo = this.values[indexTwo];
				}
			}
			// Sanity check, make sure any subtraction returns
			// a positive number and not a negative one.
			else if (!operatorObject.associative && operatorObject.doGroup)
			{
				while (valueOne - valueTwo < 1)
				{
					indexTwo = this.randInt(0, this.values.length - 1);
					valueTwo = this.values[indexTwo];
				}
			}

			operationsArray.push(valueOne);
			operationsArray.push(operatorObject);
			operationsArray.push(valueTwo);

			expressionString = operatorObject.expression.replace('$1', valueOne).replace('$2', valueTwo);
		}
		// If we're doing a parenthetical this joins it to the main
		// equation with an extra operator.
		else if (operatorObject.rank > 1)
		{
			// Since we're adding an extra operator we want to make sure
			// that we count that towards our total operations.
			counter++;
			var joiningOperator = this.operators[this.randInt(0, 3)];

			if (!operatorObject.associative && !operatorObject.doGroup)
			{
				while (valueOne % valueTwo != 0)
				{
					indexTwo = this.randInt(0, this.values.length - 1);
					valueTwo = this.values[indexTwo];
				}
			}
			else if (!operatorObject.associative && operatorObject.doGroup)
			{
				while (valueOne - valueTwo < 1)
				{
					indexTwo = this.randInt(0, this.values.length - 1);
					valueTwo = this.values[indexTwo];
				}
			}

			operationsArray.push(joiningOperator);
			operationsArray.push(operatorObject);
			operationsArray.push(valueOne);
			operationsArray.push(valueTwo);

			var subExpressionString = operatorObject.expression.replace('$1', valueOne).replace('$2', valueTwo);
			expressionString = joiningOperator.expression.replace('$1', expressionString).replace('$2', subExpressionString);
		}
		// Otherwise we're just appending an operator and the next value
		else
		{
			operationsArray.push(operatorObject);
			operationsArray.push(valueOne);

			expressionString = operatorObject.expression.replace('$1', expressionString).replace('$2', valueOne);
		}
	}

	this.operation = operationsArray;
	this.string = expressionString;

	return this.operation;
};

GenerateText.prototype.generateEquationString = function()
{
	if (!this.operation || this.operation.length < 1)
	{
		this.makeMath();
	}

	return this.string;
};

GenerateText.prototype.generateText = function(length)
{
	this.operation = [];

	if (length < 5)
	{
		length = 5;
	}

	var captcha_string = '';
	for (var counter = 0; counter < length; counter++)
	{
		captcha_string += this.characters[this.randInt(0, this.characters.length - 1)];
	}

	this.string = captcha_string;
	this.solution = this.string;

	return this.string;
};

GenerateText.prototype.solveMath = function(operationsArray)
{
	if ((!operationsArray || operationsArray.length < 1) && this.operation.length > 0)
	{
		operationsArray = this.operation;
	}
	
	var answer = 0;

	var parsedOperationsArray = [];
	var leftValue = null;

	// To solve the equation correctly we need to complete the problems
	// in the correct order of operations.
	for (var precedence = 2; precedence > -1; precedence--)
	{
		// As we cycle through the order of operations the answers
		// to previous problems become operands for the next
		// set of problems.
		var currentOperationsArray = null;
		if (precedence == 2)
		{
			currentOperationsArray = [].concat(operationsArray);
		}
		else
		{
			currentOperationsArray = [].concat(parsedOperationsArray);
			parsedOperationsArray = [];
		}

		while (currentOperationsArray.length > 0)
		{
			var currentExpression = currentOperationsArray.shift();

			// If we've hit an operator for an equation
			if (currentExpression instanceof Operator)
			{
				var firstValue = leftValue;
				var secondValue = currentOperationsArray.shift();

				// If we're parsing this level of math right now
				if (currentExpression.rank == precedence || secondValue instanceof Operator)
				{
					var joiningOperator = null;
					var joiningValue = null;

					var operator = null;

					// For parentheticals we make sure to parse the parenthetical but
					// leave the joining operator alone. Joining operators will always
					// be non parentheticals.
					if (secondValue instanceof Operator)
					{
						joiningOperator = currentExpression;
						operator = secondValue;

						firstValue = currentOperationsArray.shift();
						secondValue = currentOperationsArray.shift();

						answer = operator.op.apply(null, [firstValue, secondValue]);
						parsedOperationsArray.push(joiningOperator);
						parsedOperationsArray.push(answer);
					}
					// Otherwise for standard expressions we just take the last
					// value we parsed and apply the operation to it and the next
					// value in the chain. Since we're proceeding along according
					// to the order of operations then we don't need to worry about
					// what appears to the left or right of a given equation.
					else
					{
						operator = currentExpression;

						answer = operator.op.apply(null, [firstValue, secondValue]);
						if (precedence > 0)
						{
							parsedOperationsArray.splice((parsedOperationsArray.length - 1), 1, answer);
						}
					}

					leftValue = answer;
				}
				// Or if we're just saving the math for a future round of parsing
				else
				{
					operator = currentExpression;

					parsedOperationsArray.push(currentExpression)
					parsedOperationsArray.push(secondValue);

					leftValue = secondValue;
				}
			}
			// If we hit a raw value then store it appropriately.
			else
			{
				leftValue = currentExpression;
				parsedOperationsArray.push(currentExpression);
			}
		}
	}

	this.solution = answer;
	return this.solution;
};

module.exports = GenerateText;