const express = require('express');
const ejs     = require('ejs');
const RtmpServer = require('rtmp-server');
const ffmpeg = require('fluent-ffmpeg');
const HLSServer = require('hls-server');
const findRemoveSync = require('find-remove')

 const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')

const server = express();

// const hls = new HLSServer(server, {
//   path: '/live',
//   dir: 'streams'
// });

const rtmpServer = new RtmpServer();

server.set('view engine', 'ejs');
server.use('/live', express.static(__dirname + '/streams')); // in index.ejs -->  hls.loadSource('https://'+location.host+'/live/output.m3u8');

server.get('/', (req, res) => {
  res.status(200).json('start server')
  //res.render('index');
});

server.get('/stream', (req, res) => {
  console.log('stream Page')
  
  res.render('index');
});



server.get('*', (req,res) => {
  console.log("GET /*");
});

var ffmpegStream = new ffmpeg({ source: 'rtsp://185.217.90.19:554/11', nolog: true, timeout: 432000 });


ffmpeg.setFfmpegPath(ffmpegInstaller.path);

//ffmpegStream.setFfmpegPath("C:\\Program Files\\FFMPEG\\bin\\ffmpeg.exe");
ffmpegStream.addOptions([
    '-c:v libx264',
    '-c:a aac',
    '-ac 1',
    '-strict -2',
    '-crf 18',
    '-profile:v baseline',
    '-maxrate 400k',
    '-bufsize 1835k',
    '-pix_fmt yuv420p',
    '-hls_time 10',
    '-hls_list_size 6',
    '-hls_wrap 10',
    '-start_number 1'
  ]).output('streams/output.m3u8').on('end', () => { console.log("End"); }).run(


     (function() {

      setInterval(() => {
         var result = findRemoveSync('./streams', { age: { seconds: 30 }, extensions: '.ts' });
         console.log(result);
    }, 50000);
  
    console.log('removeed Files')
  
   })()
  


  );








server.listen(8000, () => { console.log("HTTP/HLS Server Listen: localhost:8000"); });






// -----------------------

