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
function getJiu(url){
	$.get(url, function(data) {
		$('.span10').html(data);
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
			$.get('')
		});
	});
}
(function() {
	//Ajax获取气泡酒-画册getJiu('jiu');
	var linkJ = $('.jiu').find('a');
	linkJ.click(function(event) {
		event.preventDefault();
		getJiu('jiu');
	});
	
})();