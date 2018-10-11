// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// DB
const db = require('../database/index.js');

// Creates a client
const client = new speech.SpeechClient();

// The name of the audio file to transcribe
// const fileName = './sample/shutdown-1800.wav';
module.exports = function(url) {

    //detail file
    var stats = fs.statSync(url)
    var fileSizeInBytes = stats["size"]
    //Convert the file size to megabytes (optional)
    var fileSizeInMegabytes = fileSizeInBytes / 1000000.0


    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(url);
    const audioBytes = file.toString('base64');

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
        content: audioBytes,
    };
    const config = {
        languageCode: 'vi-VN',
    };
    const request = {
        audio: audio,
        config: config,
    };

    // Detects speech in the audio file
    client
        .recognize(request)
        .then(data => {
            const response = data[0];
            const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
            db(url, transcription, fileSizeInMegabytes);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}
