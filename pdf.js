const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
// Embed a font, set the font size, and render some text
// doc
//   .font('fonts/PalatinoBold.ttf')
//   .fontSize(25)
//   .text('Some text with an embedded font!', 100, 100);

// Add an image, constrain it to a given size, and center it vertically and horizontally
// doc.image('path/to/image.png', {
//   fit: [250, 300],
//   align: 'center',
//   valign: 'center'
// });

// Add another page
const generate = async (objs) => {

  // Create a document
  const doc = new PDFDocument({ size: 'A4', margin: 20 });

  // Pipe its output somewhere, like to a file or HTTP response
  const stream = doc.pipe(blobStream());

  // const font = fetch('./fonts/firaCodeReguler.ttf')
  // const arrayBuffer = font.arrayBuffer()
  // const test = await axios.get('/fonts/firaCodeReguler.ttf');
  const font = await fetch('./fonts/fira_code.ttf');
  const arrayBuffer = await font.arrayBuffer();

  const icon = await fetch('./img/icon.png');
  const iconBuffer = await icon.arrayBuffer();

  const logo = await fetch('./img/logo.png');
  const logoBuffer = await logo.arrayBuffer();

  // console.log(test.data);
  doc.registerFont('FiraCode', arrayBuffer);

  const hight = 284;

  var count = 0;
  objs.forEach(obj => {
    doc
      .rect(13, 20 + (count * hight), 567, 233.506)
      .dash(11)
      .stroke()
      .font('FiraCode')
      .fontSize(14)
      .text(`PENERIMA : ${obj.penerima}`, 57, 45 + (count * hight))
      .image(iconBuffer, 133, 72 + (count * hight), { width: 15 })
      .text(`${obj.nomor}`, 160, 72 + (count * hight))
      .text(`${obj.alamat}`, 55, 112 + (count * hight))
      .moveTo(13, 189 + (count * hight))
      .lineTo(581, 189 + (count * hight))
      .dash(2)
      .stroke()
      .text(`PENGIRIM : ${obj.pengirim}`, 55, 196 + (count * hight))
      .image(iconBuffer, 133, 222 + (count * hight), { width: 15 })
      .text(`${obj.nomorPengirim}`, 160, 222 + (count * hight))
      .image(logoBuffer, 461, 215 + (count * hight), { width: 94 });

    count++;
  });

  // Finalize PDF file
  doc.end();

  // Create new promise
  const p1 = new Promise((resolve, reject) => {

    stream.on('finish', function () {

      resolve("Finish");

      // get a blob you can do whatever you like with
      const blob = stream.toBlob('application/pdf');
      // console.log(blob);
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
      // console.log(fileURL)
    });
  });

  return p1;
}

exports.generate = generate;