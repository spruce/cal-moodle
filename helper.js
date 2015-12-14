var dns =  require('dns');


module.exports.getNiceTime = function getNiceTime(){
	date = new Date();
	function mG(num){
		if(num < 10){
			return "0" + num;
		}
		else{
			return num;
		}
	}
	return 	(date.getFullYear() + "-" + mG(date.getMonth()+1) + "-" + mG(date.getDate()) + " " + mG(date.getHours()) + ":" + mG(date.getMinutes()) + ":" + mG(date.getSeconds()));
}

module.exports.logDNS = function logDNS(req, beginning, cal){
  var ip = "";
  beginning = beginning || "";
  function logWithDomain(err,domains){
    
    if(domains === undefined){
      domains = [];
    }
    console.log(module.exports.getNiceTime() + ":\t" + beginning + req.params.username + "/" + req.params.id + " : "+ ip + "(" + domains[0] + ")");
  }
  
  try{
    if(req.headers['x-forwarded-for']){
      ip = req.headers['x-forwarded-for']
    }
    else{
      ip = req.connection.remoteAddress;
    }
    dns.reverse(ip, logWithDomain);
	}
	catch (e){
		console.log(module.exports.getNiceTime() + ":\tCouldn't get the Address for forwarded>"+req.headers['x-forwarded-for']+"< or >"+req.connection.remoteAddress+"<");
		console.log("The error was:", e);
	}
}

module.exports.shouldFilter = function shouldFilter(filters, field){
  for(var i = 0, l = filters.length; i < l; i++){
    if(filters[i].value == field){
      return true;
    }
  }
  return false;
}
// ev = for now it's the fields value
module.exports.replace = function replace(replacements, ev, field){
  for(var i = 0, l = replacements.length; i < l; i++){
    if(field != replacements[i].field){
      continue;
    }
    if(ev == replacements[i].fromValue && replacements[i].type == 21){
      return replacements[i].toValue;
    }
  }
  return ev;
}