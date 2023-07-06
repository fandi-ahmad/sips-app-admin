import React from 'react'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver';

const GenerateDoc = () => {

  // const generateWordDocument = () => {
  //   let doc = new Document()
  //   doc.createParagraph('this is a first paragraph')
  //   saveDocToFile(doc, 'dokumen.docx')
  // }

  // const saveDocToFile = (doc, fileName) => {
  //   const packer = new Packer()
  //   const miniType = "aplication/vnd.openxmlformats-officedocument.wordprocessing"

  //   packer.toBlob(doc).then((blob) => {
  //     const docblob = blob.slice(0, blob.size, miniType)
  //     saveAs(docblob, fileName)
  //   })
  // }

  const generateDocx = () => {
    const doc = new Document({
      creator: "Nama Pembuat Dokumen"
    });
    doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun("Contoh teks dalam file DOCX."),
          ],
        }),
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx");
    });
  };


  return (
    <>
      <button onClick={generateDocx}>klik</button>
    </>
  )
}

export default GenerateDoc