$(document).ready(function () {
	var cart = [];
	var cart_item_obj = {
		id: '',
		count: 0,
		info: ''
	};
	cart_ids = []
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse(localStorage.getItem('cart'))
	}
	for (i = 0; i < cart.length; i++) {
		cart_ids.push(cart[i].id)
	}

	menu_burger();
	searching_get_data();
	add_to_cart();

	function menu_burger() {
		active = false;
		$(".burger").click(function () {
			if (!active) {
				active = true;
				$("nav").css("top", "0")
				$("body").css("overflow", "hidden")
				$(".burger").addClass("active")
			}
			else {
				active = false;
				$("nav").css("top", "-100%")
				$("body").css("overflow", "visible")
				$(".burger").removeClass("active")
			}
		})
	}

	function searching_get_data() {
		document.getElementById('button').addEventListener('click', clicked, false)
		function clicked() {
			var search = $("#search").val();
			document.getElementById('results').innerHTML = ''
			$.ajax({
				url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "&maxResults=40",
				dataType: "json",
				success: function (data) {
					show_results(data)
				},
				type: 'GET'
			});
		}
	}

	function show_results(data) {
		for (i = 0; i < data.items.length; i++) {
			if (data.items[i].saleInfo.saleability == "FOR_SALE") {
				if (!cart_ids.includes(data.items[i].id)) {
					results.innerHTML +=
						"<div class='res'><div class='res_main'>Название: " +
						data.items[i].volumeInfo.title +
						"</br>Цена: " +
						data.items[i].saleInfo.listPrice.amount +
						"</br>Дата издания: " +
						data.items[i].volumeInfo.publishedDate +
						"</div>" +
						"<button type='button' class='btn' id='" +
						data.items[i].id +
						"'>Добавить в корзину</button>" +
						"</div>"
				}
				else {
					results.innerHTML +=
						"<div class='res'><div class='res_main'>Название: " +
						data.items[i].volumeInfo.title +
						"</br>Цена: " +
						data.items[i].saleInfo.listPrice.amount +
						"</br>Дата издания: " +
						data.items[i].volumeInfo.publishedDate +
						"</div>" +
						"<button type='button' class='btn' id='" +
						data.items[i].id +
						"' style='background-color:#5e695d;'>Уже в корзине</button>" +
						"</div>"
				}
			}
			else {
				if (!cart_ids.includes(data.items[i].id)) {
					results.innerHTML +=
						"<div class='res'><div class='res_main'>Название: " +
						data.items[i].volumeInfo.title +
						"</br>Цена: не указана" +
						"</br>Дата издания: " +
						data.items[i].volumeInfo.publishedDate +
						"</div>" +
						"<button type='button' class='btn' id='" +
						data.items[i].id +
						"'>Добавить в корзину</button>" +
						"</div>"

				}
				else {
					results.innerHTML +=
						"<div class='res'><div class='res_main'>Название: " +
						data.items[i].volumeInfo.title +
						"</br>Цена: не указана" +
						"</br>Дата издания: " +
						data.items[i].volumeInfo.publishedDate +
						"</div>" +
						"<button type='button' class='btn' id='" +
						data.items[i].id +
						"' style='background-color:#5e695d;'>Уже в корзине</button>" +
						"</div>"
				}
			}
		}
	}

	function add_to_cart() {
		document.addEventListener('click', function (e) {
			if (e.target.classList.contains('btn')) {
				if (!cart_ids.includes(e.target.id)) {
					var cart_item = Object.create(cart_item_obj);
					cart_item.id = e.target.id;
					cart_item.count = 1;
					$.ajax({
						url: "https://www.googleapis.com/books/v1/volumes/" + e.target.id,
						dataType: "json",
						success: function (data) {
							if (data.saleInfo.saleability == "FOR_SALE") {
								cart_item.info +=
									"<div class='res_main'>Название: " +
									data.volumeInfo.title +
									"</br>Цена: " +
									data.saleInfo.listPrice.amount +
									"</br>Дата издания: " +
									data.volumeInfo.publishedDate +
									"</div>"
							}
							else {
								cart_item.info +=
									"<div class='res_main'>Название: " +
									data.volumeInfo.title +
									"</br>Цена: не указана" +
									"</br>Дата издания: " +
									data.volumeInfo.publishedDate +
									"</div>"
							}
						},
						type: 'GET'
					});

					cart.push(cart_item)
					cart_ids.push(e.target.id)

					document.getElementById(e.target.id).innerText = 'Уже в корзине';
					document.getElementById(e.target.id).style = 'background-color:#5e695d;';
				}

				setTimeout(function () {
					localStorage.setItem('cart', JSON.stringify(cart))
				}, 1000);
			}
		})
	}
})
