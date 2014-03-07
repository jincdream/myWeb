function Book() {
	var count = 0;
	return function nextP(hBook, sBook) {
		var hB = hBook.eq(count);
		var img = hB.find('img');
		img.eq(1).css({
			'display': 'inline-block',
			'opacity': '1'
		});
		if (count > 0) {
			hBook.eq(count - 1).find('img').eq(1).css({
				transform: 'rotateY(-180deg)',
				opacity: '1'
			});
		} else {
			sBook.find('img').eq(1).css({
				transform: 'rotateY(-180deg)'
			});
		}
		img.eq(0).css({
			transform: 'rotateY(0deg)',
			opacity: '1'
		});
		return count++;
	};
}
(function() {
	var stage = $('div.stage');
	var hBook = stage.find('.hBook');
	var sBook = stage.find('.sBook');
	var book = new Book();
	$('#next').click(function() {
		book(hBook, sBook);
	});
})();

/*	if(count){
			bookL.addClass('redeadL').removeClass('bookL');
			bookR.addClass('readed').removeClass('bookR');
			waitR.attr("class","bookR");
			waiting.attr("class","waitR");

			bookR.attr('class', 'readed');
			bookL.attr('class', 'readedL');
			waitR.before(waiting).css('position','relative');
		}*/