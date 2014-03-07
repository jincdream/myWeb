function Book() { //css3翻页，可以更完美
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
			sBook.find('img').eq(0).css({
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
	var stage = $('div.stage'),
		hBook = stage.find('.hBook'),
		sBook = stage.find('.sBook'),
		book = new Book(),
		inx = 0;
	$('#next').click(function() {
		if (inx <= 3)
			inx = book(hBook, sBook);
		else
			book = null;
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