const stack = require('callsite');
const cc = require('cli-color')
const skip = {
	"handle":"",
	"next":"",
	"dispatch":"",
	"handle":"",
	"anon":"",
	"process_params":"",
	"next":"",
	"urlencodedParser":"",
    "param":"",
    "Module._compile":"",
    "Module._extensions..js":"",
    "Module.load":"",
    "tryModuleLoad":"",
    "Module._load":"",
    "Module.runMain":""
}

class Caller {
	verdict(verdict, msg) {



		let ary = stack()
		ary.forEach((site, i)=>{

			if ( i == 1 ) {
				const func = site.getFunctionName() || 'anon'
				const absoluteFile = site.getFileName()
				const ary = absoluteFile.split("\/")
				const relativeFile = ary[ary.length - 1] 
				

				const line = site.getLineNumber() 
				if ( skip.hasOwnProperty( func )) {
					// do nothing
				} else {
                    if ( verdict === true ) {
                        console.log( cc.bgGreen("PASS") + " " + msg + " | " + cc.bgYellowBright(func) )
                    } else {
    					console.log( cc.blink(cc.bgRed("FAIL")) + " " + msg + " | " + cc.bgYellowBright(func) )
                    }
				}
			}
		});
	  }

	showStack() {
		// Show all methods involved in calling outside of default node stuff
		let ary = stack()
		ary.forEach((site, i)=>{
			if ( i > 0 ) {
				const func = site.getFunctionName() || 'anon'
				const absoluteFile = site.getFileName()
				const ary = absoluteFile.split("\/")
				const relativeFile = ary[ary.length - 1] 
				

				const line = site.getLineNumber() 
				if ( skip.hasOwnProperty( func )) {
					// do nothing
				} else {
					console.log( cc.bold(i) + " of " + cc.bold(ary.length) + "  line: " + cc.bgYellowBright(line) + " from '" + cc.bgYellowBright(relativeFile) + "' ( func " + cc.bgYellowBright(func) + ")")

				}
			}
		});
	  }
}
module.exports={Caller}