import React from 'react';
import { Document, Packer, Paragraph, ImageRun } from 'docxtemplater';
import { saveAs } from 'file-saver';

const ImageToDocxConverter = () => {
  const convertImageToDocx = (image, fileName) => {
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob);

        const doc = new Document();
        const imageRun = new ImageRun({ path: imageURL, data: blob });
        const paragraph = new Paragraph().addRun(imageRun);
        doc.addParagraph(paragraph);

        const packer = new Packer();
        const buffer = packer.toBuffer(doc);
        saveAs(new Blob([buffer]), fileName);
      })
      .catch((error) => console.error('Error:', error));
  };

  return null; // Komponen ini tidak merender apa pun, hanya berfungsi untuk meng-handle konversi dan pengunduhan gambar
};

export default ImageToDocxConverter;
