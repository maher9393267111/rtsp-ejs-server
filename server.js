const express = require('express');
const ejs     = require('ejs');
//const RtmpServer = require('rtmp-server');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const PORT = process.env.PORT || 8000;

const HLSServer = require('hls-server');

const server = express();

const hls = new HLSServer(server, {
  path: '/live',
  dir: 'streams'
});



//const rtmpServer = new RtmpServer();

server.set('view engine', 'ejs');
server.use('/live', express.static(__dirname + '/streams'));

server.get('/', (req, res) => {
  res.render('index');
});

server.get('*', (req,res) => {
  console.log("GET /*");
  res.render('hello');
});

//var ffmpegStream = new ffmpeg({ source: 'rtsp://185.217.90.19:554/11', nolog: true, timeout: 432000 });

//ffmpeg.setFfmpegPath(ffmpegInstaller.path);
//ffmpegStream.setFfmpegPath("C:\\Program Files\\FFMPEG\\bin\\ffmpeg.exe");



// ffmpegStream.addOptions([
  

    

//     '-profile:v baseline',
//     '-level 3.0',
//     '-start_number 0',
//     '-hls_time 10',
//     '-hls_list_size 0',
//     '-f hls'



//   ]).output('streams/output.m3u8').on('end', () => { console.log("End"); }).run();





// rtmpServer.on('client', client => { 
//   client.on('connect', () => {
//      console.log('connect', client.app);
//   });
  
//   client.on('play', ({ streamName }) => {
//     console.log('PLAY', streamName);
//   });
  
//   client.on('publish', ({ streamName }) => {
//     console.log('PUBLISH', streamName);
//   });
  
//   client.on('stop', () => {
//     console.log('client disconnected');
//   });
// });

// rtmpServer.on('error', err => {
//   throw err;
// });

//rtmpServer.listen(1935, () => { console.log("RTMP Server Listen: localhost:1935"); });
server.listen(PORT, () => { console.log("HTTP/HLS Server Listen: localhost:8000"); });