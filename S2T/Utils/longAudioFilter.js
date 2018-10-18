// import getAudioDuration from "get-audio-duration";
import fs from 'fs-extra';
import musicData from 'musicmetadata';

function longAudioFilter(srcPath) {
  const parser = musicData(
    fs.createReadStream(srcPath),
    { duration: true },
    (err, metaData) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(metaData);
      }
    }
  )
}

longAudioFilter("./Utils/1.mp3");

export default longAudioFilter;