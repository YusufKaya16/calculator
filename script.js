const calculator = document.getElementById('calculator');
const display = document.getElementById('display');

displayInit();

function displayInit() {
    display.textContent = '0';
}

calculator.addEventListener('click', (event) => {

    if (!event.target.closest('button')) return;
    // click eventi oluşan element eğer bir button(tagname) değilse  işlemi sonlandır, eğer buttonsa alltaki işlemlere devam et.

    const button = event.target;
    const buttonValue = button.textContent;
    const buttontype = button.dataset.type;
    //html'de veri tipi ataması yaparak kontrolleri dataset üzerinden yapıyorum.
    const prevKeyType = calculator.dataset.previousKeyType;
    //number  sonrası eğer bir operator'e basılırsa calculator'ın dataset'i değiştilerek operator  display'de görüntülenmeden işlemleri yaparım.

    // for clear the display
    if (buttontype === 'clear') displayInit();

    // for numbers button.classList.contains('number')
    if (buttontype === 'number') {
        if (display.textContent === '0') {
            display.textContent = buttonValue;
        }

        else if (prevKeyType === 'operator') {
            display.textContent = buttonValue;
        }

        else {
            display.textContent += buttonValue;
        }

        calculator.dataset.previousKeyType = 'number';
        // calculator'ın dataset değerini değiştiriyorum ki ikinci bir sayı girdiğinde yanına yazsın.
    }

    // button.dataset.type === 'operator' -> html data-set-type = "operator" not contains classList 'operator'
    // button.classList.contains('operator')
    if (buttontype === 'operator') {
        calculator.dataset.previousKeyType = 'operator';
        // calculator'ın dataset değerini operator olarak değiştiriyorum ve yukarıda eğer calculator'ın dataset değeri operator ise ekrana yeni bir sayı girildiğinde gözüken sayının üzerine yazsın.
        calculator.dataset.firstNumber = display.textContent;
        calculator.dataset.operator = button.dataset.key;
        // button.dataset.key -> operatorlere özel atanmış dataset verisi
        // plus, minus, times, divide 
    }

    if (buttontype === 'equal') {
        // for calculation operation
        // firstNumber + secondNumber
        // firstNumber - secondNumber
        // firstNumber * secondNumber
        // firstNumber / secondNumber

        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = display.textContent;

        display.textContent = calculateEquation(firstNumber, operator, secondNumber);

        calculator.dataset.previousKeyType = 'equal';

    }
})

function calculateEquation(firstNumber, operator, secondNumber) {

    firstNumber = parseInt(firstNumber);
    operator = operator;
    secondNumber = parseInt(secondNumber);

    switch (operator) {
        case 'plus':
            return firstNumber + secondNumber;
        case 'minus':
            return firstNumber - secondNumber;
        case 'times':
            return firstNumber * secondNumber;
        case 'divide':
            return firstNumber / secondNumber;
    }
}



