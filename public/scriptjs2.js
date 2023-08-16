// 獲取購物車按鈕和視窗元素

var cartButton = document.getElementById('buycar');
var cartWindow = document.querySelector('.cartWindow');

// 點擊購物車按鈕時顯示視窗內容
function windowopen() {
    var cartWindow = document.querySelector('.cartWindow');
    cartWindow.classList.add('active');

}

var x = document.getElementById("x");
x.addEventListener('click', function () {
    cartWindow.classList.remove('active');
}
)





/*=====================================購物車功能開始=========================================*/

window.addEventListener('load', function () {
    var foodList = [
        {
            id: 'omurice',
            name: '蛋包飯',
            price: 90,
            image: '00/1106-2.jpg',
            prepTime: 10, // Default preparation time in minutes for 蛋包飯
        },
        // Add other meal items here...
        {
            id: 'muffin',
            name: '鬆餅',
            price: 50,
            image: '00/1106-3.jpg',
            prepTime: 5, // Default preparation time in minutes for 鬆餅
        },
        // Add the new meal item here...
        {
            id: 'melaleuca',
            name: '千層麵',
            price: 80,
            image: '00/1106-4.jpg',
            prepTime: 10, // Default preparation time in minutes for 千層麵
        },

        {
            id: 'pizza',
            name: '披薩',
            price: 399,
            image: '00/224.jpg',
            prepTime: 15,
        },

        {
            id: 'pasta',
            name: '義大利麵',
            price: 115,
            image: '00/1106-5.jpg',
            prepTime: 10,
        },

        {
            id: 'stew',
            name: '燉飯',
            price: 120,
            image: '00/1106-6.jpg',
            prepTime: 20,
        },
    ];



    var fooditems = document.getElementById('fooditems');

    function countItemsInCart(mealType) {
        var count = 0;
        var foodElements = fooditems.querySelectorAll(`[id="${mealType}"]`);
        for (var i = 0; i < foodElements.length; i++) {
            if (foodElements[i].id === mealType) {
                count++;
            }
        }
        return count;
    }

    function calculateTotalAmount() {
        var foodElements = fooditems.getElementsByClassName('fooditem');
        var totalAmount = 0;
        var orderForm = document.getElementById('orderForm');
        for (var i = 0; i < foodElements.length; (i++) / 2) {
            var mealType = foodElements[i].id;
            var quantityElement = foodElements[i].querySelector(`.${mealType}quantity`);
            var quantity = parseInt(quantityElement.innerText);

            var existingInput = orderForm.querySelector(`[name="${mealType}quantity"]`);
            if (existingInput) {
                existingInput.value = quantity.toString();
            } else {
                var inputElement = document.createElement("input");
                inputElement.type = "hidden";
                inputElement.name = mealType + "quantity";
                inputElement.value = quantity.toString();
                orderForm.appendChild(inputElement);
            }
        }
        for (var i = 0; i < foodElements.length; i++) {
            var mealType = foodElements[i].id;
            var quantityElement = foodElements[i].querySelector(`.${mealType}quantity`);
            var quantity = parseInt(quantityElement.innerText);

            var meal = foodList.find(item => item.id === mealType);
            if (meal) {
                totalAmount += meal.price * quantity;
            }
        }
        return totalAmount;
    }

    function calculateTotalPrepTime() {
        var foodElements = fooditems.getElementsByClassName('fooditem');
        var totalPrepTime = 0;
        for (var i = 0; i < foodElements.length; i++) {
            var mealType = foodElements[i].id;
            var quantityElement = foodElements[i].querySelector(`.${mealType}quantity`);
            var quantity = parseInt(quantityElement.innerText);
            var meal = foodList.find(item => item.id === mealType);
            if (meal) {
                totalPrepTime += meal.prepTime * quantity;

            }
        }
        return totalPrepTime;
    }


    function updateTotalAmount() {
        var totalAmount = calculateTotalAmount();
        var totalPrepTime = calculateTotalPrepTime();
        document.getElementById('sqlprice').value = totalAmount;
        document.getElementById('sqltime').value = totalPrepTime;

        if (totalPrepTime >= 60) {
            totalPrepTime = parseInt(totalPrepTime / 60) + '分鐘' + (totalPrepTime % 60) + '秒';
        } else {
            totalPrepTime = totalPrepTime + '秒';
        }
        document.getElementById('money').innerText = '金額：$' + totalAmount;
        document.getElementById('time').innerText = '預計時間：' + totalPrepTime;
    }



    function showFoodItems(mealType) {

        var mealCount = countItemsInCart(mealType);
        if (mealCount < 1) {
            var meal = foodList.find(item => item.id === mealType);
            if (meal) {
                var mealElement = `
                <div id="${meal.id}" class="fooditem">
                    <div class="deletemeal">X</div>
                    <img src="${meal.image}" alt="${meal.name}" width="auto" height="100%" class="foodimg">
                    <div class="foodp">$${meal.price}</div>
                    <div class="foodname">${meal.name}</div>
                    <div class="prepTime">${meal.prepTime} 秒</div> <!-- Display the preparation time -->
                    <div class="controlband">
                        <div class="bandbtn">-</div>
                        <div class="${meal.id}quantity">1</div>
                        <div class="bandbtn">+</div>
                    </div>
                </div>
            `;
                fooditems.innerHTML += mealElement;
                updateTotalAmount(); // Update the total amount after adding a food item
            }
        }
    }





    fooditems.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('deletemeal')) {
            target.parentElement.remove();
            orderForm.removeChild(orderForm.querySelector(`[name="${target.parentElement.id}quantity"]`));
            updateTotalAmount(); // Update the total amount after removing a food item
        } else if (target.classList.contains('bandbtn')) {
            var mealType = target.parentElement.parentElement.id;
            var quantityElement = target.parentElement.querySelector(`.${mealType}quantity`);
            var quantity = parseInt(quantityElement.innerText);
            if (target.innerText === '+') {
                if (quantity < 10) {
                    quantity++;
                } else {
                    alert('最多只能買10個');
                }
            } else if (target.innerText === '-') {
                if (quantity > 1) {
                    quantity--;
                } else {
                    alert('最少要買一個');
                }
            }
            quantityElement.innerText = quantity;
            updateTotalAmount(); // Update the total amount after changing the quantity of a food item
        }
    });
    document.getElementById('omuricebuycarbtn').addEventListener('click', function () {
        showFoodItems('omurice');
    });

    document.getElementById('muffinbuycarbtn').addEventListener('click', function () {
        showFoodItems('muffin');
    });

    // Add event listener for the new meal item button
    document.getElementById('melaleucabuycarbtn').addEventListener('click', function () {
        showFoodItems('melaleuca');
    });

    document.getElementById('pizzabuycarbtn').addEventListener('click', function () {
        showFoodItems('pizza');
    });

    document.getElementById('pastabuycarbtn').addEventListener('click', function () {
        showFoodItems('pasta');
    });

    document.getElementById('stewbuycarbtn').addEventListener('click', function () {
        showFoodItems('stew');
    });




    var flytime = document.getElementById('flytime');
    var shstime = document.getElementById('shstime').value;


    $(document).ready(function () {
        flytime.innerText = shstime;
        setInterval(function () {
            if (shstime > 0) {
                shstime--;
                document.getElementById('order').innerText = '等待';
                document.getElementById('order').disabled = true;
                omuricebuycarbtn.disabled = true;
                muffinbuycarbtn.disabled = true;
                melaleucabuycarbtn.disabled = true;
                pizzabuycarbtn.disabled = true;
                pastabuycarbtn.disabled = true;
                stewbuycarbtn.disabled = true;
                omuricebuycarbtn.innerText = '等待';
                muffinbuycarbtn.innerText = '等待';
                melaleucabuycarbtn.innerText = '等待';
                pizzabuycarbtn.innerText = '等待';
                pastabuycarbtn.innerText = '等待';
                stewbuycarbtn.innerText = '等待';
                omuricebuycarbtn.style.backgroundColor = 'gray';
                muffinbuycarbtn.style.backgroundColor = 'gray';
                melaleucabuycarbtn.style.backgroundColor = 'gray';
                pizzabuycarbtn.style.backgroundColor = 'gray';
                pastabuycarbtn.style.backgroundColor = 'gray';
                stewbuycarbtn.style.backgroundColor = 'gray';

                flytime.innerText = shstime + '秒';
            } else if (shstime == 0) {
                document.getElementById('order').innerText = '買單';
                document.getElementById('order').disabled = false;
                omuricebuycarbtn.disabled = false;
                muffinbuycarbtn.disabled = false;
                melaleucabuycarbtn.disabled = false;
                pizzabuycarbtn.disabled = false;
                pastabuycarbtn.disabled = false;
                stewbuycarbtn.disabled = false;
                omuricebuycarbtn.innerText = '加入購物車';
                muffinbuycarbtn.innerText = '加入購物車';
                melaleucabuycarbtn.innerText = '加入購物車';
                pizzabuycarbtn.innerText = '加入購物車';
                pastabuycarbtn.innerText = '加入購物車';
                stewbuycarbtn.innerText = '加入購物車';

                omuricebuycarbtn.style.backgroundColor = '#571e9d';
                muffinbuycarbtn.style.backgroundColor = '#571e9d';
                melaleucabuycarbtn.style.backgroundColor = '#571e9d';
                pizzabuycarbtn.style.backgroundColor = '#571e9d';
                pastabuycarbtn.style.backgroundColor = '#571e9d';
                stewbuycarbtn.style.backgroundColor = '#571e9d';

                

                clearInterval();
            }
        }, 1000);
    });


    // Add event listener for the order button if needed
    document.getElementById('order').addEventListener('click', function () {


        var totalAmount = calculateTotalAmount();
        var totalPrepTime = calculateTotalPrepTime();

        if (totalPrepTime >= 60) {
            totalPrepTime = parseInt(totalPrepTime / 60) + '分鐘' + (totalPrepTime % 60) + '秒';
        } else {
            totalPrepTime = totalPrepTime + '秒';
        }
        alert('總金額：$' + totalAmount);
        alert('時間：' + totalPrepTime);

    });
});
/*=====================================購物車功能結束=========================================*/




























