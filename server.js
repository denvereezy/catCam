'use strict'
const mysql         = require('mysql'),
      five          = require('johnny-five'),
      raspi         = require('raspi-io'),
      child_process = require('child_process'),
      fs            = require('fs'),
      PicService    = require('./services/picService'),
      board         = new five.Board({io: new raspi()});

require('events').EventEmitter.prototype._maxListeners = 20;

let i = 0;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    port: 3306,
    database: 'catCam'
});

connection.connect();

const picService = new PicService(connection);

board.on('ready', () => {
    console.log('board ready');

    const motion = new five.Motion('P1-7'),
          led    = new five.Led('P1-11');

    motion.on('calibrated', () => {
        console.log('calibrated');
    });

    motion.on('motionstart', () => {
        console.log('motion detected');
        led.on();

        let filename = 'image_' + i + '.jpg';
        let args = [
            '-w',
            '365',
            '-h',
            '365',
            '-o',
            filename,
            '-t',
            '1'
        ];
        let spawn = child_process.spawn('raspistill', args);

        spawn.on('exit', (code) => {
            console.log('A photo has been taken ' + filename + ' exit code ' + code);
            let timestamp = Date.now();
            i++;
            const data = {
                filename: filename,
                exit_code: code,
                time_stamp: timestamp
            };
            if ((/jpg$/).test(filename)) {
              let dir = 'public/img/';
              if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
              }
              let command = 'mv ' + filename + ' public/img/';
              child_process.exec(command, (error, stdout, stderr) => {
                data.file_path = 'img/ ' + filename;
              });
            }
            picService.upload(data);
        });
    });

    motion.on('motionend', () => {
        led.off();
        console.log('motion ended');
    });
});

process.on('SIGINT', () => {
    process.exit();
});
