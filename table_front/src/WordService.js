import * as Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

function generateWord(anomalies, htmlContent) {
  return fetch('template.docx')
    .then(response => response.arrayBuffer())
    .then(templateBuffer => {
      const zip = new PizZip(templateBuffer);
      const doc = new Docxtemplater();
      doc.loadZip(zip);

      // Replace the {{htmlContent}} placeholder with the provided HTML content
     
      doc.setData({ anomalies, htmlContent });

      try {
        doc.render();
      } catch (error) {
        console.error('Error rendering template:', error);
        throw error;
      }

      const outputBuffer = doc.getZip().generate({
        type: 'arraybuffer',
      });

      return new Blob([outputBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    });
}

export { generateWord };
