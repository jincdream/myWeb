function Book() {
	this.count = 0;
} //css3翻页，可以更完美

Book.prototype.nextP = function(hBook, sBook) {
	var hB = hBook.eq(this.count);
	var img = hB.find('img');
	img.eq(1).css({
		'opacity': '1'
	});
	if (this.count > 0) {
		hBook.eq(this.count - 1).find('img').eq(1).css({
			transform: 'rotateY(-180deg)',
			opacity: '1'
		});
	} else {
		sBook.find('img').eq(0).css({
			transform: 'rotateY(-180deg)'
		});
		$('.uiUp').css('cursor', 'pointer').find('span').animate({
			opacity: 0
		}, 400);
	}
	img.eq(0).css({
		transform: 'rotateY(0deg)',
		opacity: '1'
	});
	console.log(this.count);
	return this.count++;
};
Book.prototype.upP = function(hBook, sBook) {
	if (this.count <= 0) {
		this.count = 0;
	} else {
		this.count--;
	}
	var hB = hBook.eq(this.count);
	var img = hB.find('img');
	if (this.count > 0) {
		hBook.eq(this.count - 1).find('img').eq(1).css({
			transform: 'rotateY(0deg)',
			opacity: '1'
		});
	} else {
		sBook.find('img').eq(0).css({
			transform: 'rotateY(0deg)'
		});
	}
	img.eq(1).css({
		'opacity': '0'
	});
	img.eq(0).css({
		transform: 'rotateY(180deg)',
		opacity: '0'
	});
	return this.count;
};


(function() {
	//Ajax获取气泡酒-画册getJiu('jiu');
	var linkS = $('a.sheji'),
		linkY = $('a.sheying'),
		back = $('li.back'),
		span10 = $('div.span10');
	back.click(function(event) {
		event.preventDefault();
		$.get('/back', function(data) {
			span10.html(data);
		});
	});
	linkS.click(function(event) {
		event.preventDefault();
		$('div.p-r').animate({
			top: '-100%'
		}, 400, function() {
			$.get('p/listS', function(data) {
				$('div.pRight').html(data).css('paddingTop', '16%');
				sheji();
			});
		});
	});
	linkY.click(function(event) {
		event.preventDefault();
		$('div.pRight').css({
			'width': '15%',
			'float': 'left'
		});
		$('div.pLeft').css({
			'width': '85%',
			'height': '100%'
		});
		$('.span10').css({
			'overflow': 'hidden',
			'height': '100%'
		});
		$('div.p-l').animate({
				'top': '100%'
			},
			400, function() {
				$.get('/p/listY', function(data) {
					$('div.pLeft').html(data);
					slid();
				});
			});
	});

	function getJiu(url) {
		$.get(url, function(data) {
			span10.html(data);
			var stage = $('div.stage'),
				hBook = stage.find('.hBook'),
				sBook = stage.find('.sBook'),
				jiu = new Book(),
				inx = -1;
			$('#next').click(function() {
				if (inx <= 3)
					inx = jiu.nextP(hBook, sBook);
			}); /**/
			$('#up').click(function(event) {
				inx = jiu.upP(hBook, sBook);
				if (inx <= 0) {
					$('.uiUp').css('cursor', 'default');
				}
			});
			$('.back').click(function(event) {
				stage.hide();
				$.get('');
			});
		});
	}

	function sheji() {
		$('div.img-list a').click(function(event) {
			event.preventDefault();
			getJiu('/jiu');
		});
	}

	function slid() {
		var img = $('div.slid-l img');
		$('div.slid-r div').each(function(index, el) {

			var i = index,
				r= $(this);
			r.mouseover(function(event) {
				img.each(function(index, el) {
					$(this).css({
						'transform': 'translateY(-' + i * 100 + '%)'
					}).attr('class', 'slid-l-1');
				});
				img.eq(index).attr('class', 'slid-l-2');
			});
		});
	}
})();