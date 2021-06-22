$(document).ready(function () {
	var cart = [];

	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse(localStorage.getItem('cart'))
	}

	var str = ''
	if (cart.length > 0) {
		for (i = 0; i < cart.length; i++) {
			str += "<div class='res'>" +
				cart[i].info +
				"<button type='button' class='btnplus' id='btnplus____" +
				cart[i].id + 
				"'> + </button>" +
				"<div class='count'>" + 
				cart[i].count + "</div>" +
				"<button type='button' class='btnminus' id='btnminus____" +
				cart[i].id + 
				"'> - </button>" +
				'</br>' +
				"</div>"
		}
		$('#cart').html(str)
	}
	else {
		$('#cart').html("<div>Ваша корзина пуста</div>")
	}

	document.addEventListener('click', function (e) {
		if (e.target.classList.contains('btnplus')) {
			z = e.target.id.split("____")
			for (i = 0; i < cart.length; i++) {
				if (cart[i].id == z[1]) {
					cart[i].count += 1
				}
			}
		}
		if (e.target.classList.contains('btnminus')) {
			z = e.target.id.split("____")
			for (i = 0; i < cart.length; i++) {
				if (cart[i].id == z[1]) {
					if (cart[i].count != 1) {
						cart[i].count -= 1
					}
					else {
						result = confirm("Delete?");
						if (result) {
							$(cart[i].id).parent().parent().remove();
							cart.splice(i, 1);
							if (cart.length == 0) {
								$('#cart').html("<div>Ваша корзина пуста</div>")
							}
						}
					}
				}
			}
		}
		localStorage.setItem('cart', JSON.stringify(cart))
		if (cart.length > 0) {
			var str = ''
			for (i = 0; i < cart.length; i++) {
				str += "<div class='res'>" +
					cart[i].info +
					"<button type='button' class='btnplus' id='btnplus____" +
					cart[i].id + 
					"'> + </button>" +
					"<div class='count'>" + 
					cart[i].count + 
					"</div>" +
					"<button type='button' class='btnminus' id='btnminus____" +
					cart[i].id + 
					"'> - </button>" +
					'</br>' +
					"</div>"
			}
			$('#cart').html(str)
		}
	})

})

