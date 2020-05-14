var winston = require('winston'); // 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file'); //로그 일별 처리 모듈
var moment = require('moment'); // 시간 처리 모듈


function timeStampFormat(){
    return mement().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
};

var logger = new (winston.Logger)({
    transports:[
        new (winstonDaily)({
            name : 'info-file',
            filename : './log/server',
            datePattern : '_yyyy-MM-dd.log',
            colorize : false,
            maxsize : 50000000,
            maxFiles : 1000,
            level : 'info',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
        }),
        new (winston.transports.Console)({
            name : 'debug-console',
            colorize : true,
            level : 'debug',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
        })
    ],
    exceptionHandlers : [
        new (winstonDaliy)({
            name : 'exception-file',
            filename : './log/exception',
            datePattern : '_yyyy-MM-dd.log',
            colorize : false,
            maxsize : 50000000,
            maxFiles : 1000,
            level : 'error',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
        }),
        new (winston.transports.Colsole)({
            name : 'exception-console',
            colorize : true,
            level : 'debug',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
        })
    ]
});




//**********************추가 소스

var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function (exists) {
    if (exists) {
    	fs.unlink(outname, function (err) {
    		if (err) throw err;
    		logger.info('기존 파일 [' + outname +'] 삭제함.');
    	});
    }

    var infile = fs.createReadStream(inname, {flags: 'r'} );
	var outfile = fs.createWriteStream(outname, {flags: 'w'});

	infile.pipe(outfile);
	logger.info('파일 복사 [' + inname + '] -> [' + outname + ']');
});
