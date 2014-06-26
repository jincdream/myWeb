var ip = [];
ip.length = 20;
var jin = {};
jin.index = function(req, res) {
	var bl = ip.some(function (item, index, arry) {
		return item == req.ip;
	});
	if (!bl)
		ip.push(req.ip);
	res.render('index', {
		order: ip.length,
		show: "",
		back: "hidden"
	});
	console.log(bl);
};
jin.resume = function(req, res) {
	res.render('resume', {
		show: "leftShow",
		back: "hidden"
	});
};
jin.photo = function(req, res) {
	res.render('myphoto', {
		show: "leftShow",
		resume: "resume",
		firefoxBug: "firefoxBug",
		back: "back"
	});
};
//ajax ↓
jin.jiu = function(req, res) {
	res.render('jiu',{
		firfoxBug: "firfoxBug"
	});
};
jin.listS = function(req, res) {
	res.render('listS');
};
jin.listY = function(req, res) {
	res.render('listY');
};
jin.back = function(req,res){
	res.render('back');
};
jin.music = function(req,res){
	res.render('music');
};
/*(res.sendfile('/demo/myWeb/cnij/views/jiu.html');*/
exports.jin = jin;