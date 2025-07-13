// import { createFFmpeg, fetchFle } from '@ffmpeg/ffmpeg';

// let ffmpeg = null;

// const loadFFmpeg = async () => {
//   if (ffmpeg) return ffmpeg;
//   // ffmpeg = createFFmpeg({ log: true, corePath: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/ffmpeg-core.js' });
//   // await ffmpeg.load();
//   return ffmpeg;
// };

// export const recordCanvas = async (canvas, duration = 5, fps = 30, onProgress) => {
//   const currentFFmpeg = await loadFFmpeg();

//   const stream = canvas.captureStream(fps);
//   const recordedChunks = [];
//   const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

//   mediaRecorder.ondataavailable = (event) => {
//     if (event.data.size > 0) {
//       recordedChunks.push(event.data);
//     }
//   };

//   return new Promise((resolve, reject) => {
//     mediaRecorder.onstop = async () => {
//       const blob = new Blob(recordedChunks, { type: 'video/webm' });
//       const arrayBuffer = await blob.arrayBuffer();
//       const inputFileName = 'input.webm';
//       const outputFileName = 'output.gif';

//       currentFFmpeg.FS('writeFile', inputFileName, await fetchFile(arrayBuffer));

//       await currentFFmpeg.run(
//         '-i', inputFileName,
//         '-vf', `fps=${fps},scale=320:-1:flags=lanczos`,
//         '-c:v', 'gif',
//         '-f', 'gif',
//         outputFileName
//       );

//       const data = currentFFmpeg.FS('readFile', outputFileName);
//       const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));

//       resolve(url);
//     };

//     mediaRecorder.onerror = (event) => {
//       reject(event.error);
//     };

//     mediaRecorder.start();
//     setTimeout(() => {
//       mediaRecorder.stop();
//     }, duration * 1000);
//   });
// };

export const downloadCanvasAsImage = (canvas, fileName = 'particle-effect.png') => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  link.click();
};