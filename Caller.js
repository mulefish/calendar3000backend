/* THIS object is a caller friendly logger -- Idea taken from PERL's caller() method. */ 

const stack = require('callsite');
const cc = require('cli-color')

// Stacktrace noise, mostly 
const skip = {
    "handle": "",
    "next": "",
    "dispatch": "",
    "handle": "",
    "anon": "",
    "process_params": "",
    "next": "",
    "urlencodedParser": "",
    "param": "",
    "Module._compile": "",
    "Module._extensions..js": "",
    "Module.load": "",
    "tryModuleLoad": "",
    "Module._load": "",
    "Module.runMain": ""
}

class Caller {

	/* For TEST RUNNER results */ 
    verdict(verdict, msg) {
        let ary = stack()
        ary.forEach((site, i) => {

            if (i == 1) {
                const func = site.getFunctionName() || 'anon'
                const absoluteFile = site.getFileName()
                const ary = absoluteFile.split("\/")
                const relativeFile = ary[ary.length - 1]

                const line = site.getLineNumber()
                if (skip.hasOwnProperty(func)) {
                    // do nothing
                } else {
                    if (verdict === true) {
                        console.log(cc.bgGreen("PASS") + " " + msg + " | " + cc.bgYellowBright(func))
                    } else {
                        console.log(cc.blink(cc.bgRed("FAIL")) + " " + msg + " | " + cc.bgYellowBright(func))
                    }
                }
            }
        });
	}
	
	/* For emitting to standard out whatever message */ 
    msg(msg) {
        let ary = stack()
        ary.forEach((site, i) => {

            if (i == 1) {
                const func = site.getFunctionName() || 'anon'
                const absoluteFile = site.getFileName()
                const ary = absoluteFile.split("\/")
                const relativeFile = ary[ary.length - 1]


                const line = site.getLineNumber()
                if (skip.hasOwnProperty(func)) {
                    // do nothing
                } else {
                    console.log(msg + " | " + line + " | " + cc.bgYellowBright(func))
                }
            }
        });
    }

    errorMsg(msg) {
        let ary = stack()
        ary.forEach((site, i) => {
            if (i == 1) {
                const func = site.getFunctionName() || 'anon'
                const absoluteFile = site.getFileName()
                const ary = absoluteFile.split("\/")
                const relativeFile = ary[ary.length - 1]


                const line = site.getLineNumber()
                if (skip.hasOwnProperty(func)) {
                    // do nothing
                } else {
                    console.log("ERROR: " + cc.bgRed(msg) + " | " + line + " | " + cc.bgYellowBright(func))
                }
            }
        });
    }


	/* Show call stack but ignore noise */ 
    showStack() {
        let ary = stack()
        ary.forEach((site, i) => {
            if (i > 0) {
                const func = site.getFunctionName() || 'anon'
                const absoluteFile = site.getFileName()
                const ary = absoluteFile.split("\/")
                const relativeFile = ary[ary.length - 1]


                const line = site.getLineNumber()
                if (skip.hasOwnProperty(func)) {
                    // do nothing
                } else {
                    console.log(cc.bold(i) + " of " + cc.bold(ary.length) + "  line: " + cc.bgYellowBright(line) + " from '" + cc.bgYellowBright(relativeFile) + "' ( func " + cc.bgYellowBright(func) + ")")

                }
            }
        });
    }
}
module.exports = {
    Caller
}