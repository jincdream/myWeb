var ip = [];
var jin = {};
jin.index = function(req, res) {
	var bl = ip.some(function _ip(item, index, arry) {
		return item == req.ip;
	});
	if (!bl)
		ip.push(req.ip);
	res.render('index', {
		order: ip.length,
		show: ""
	});
	console.log(bl);
};
jin.resume = function(req, res) {
	res.render('resume', {
		show: "leftShow"
	});
};
jin.photo = function(req, res) {
	res.render('myphoto', {
		show: "leftShow",
		resume: "resume"
	});
};
exports.jin = jin;