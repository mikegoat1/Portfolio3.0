import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdfUrl from "../../assets/10-31-24 Resume Coding .pdf";

const PdfViewer = () => {
  return (
    <>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdfUrl} />
      </Worker> 
      
    </>
  );
};

export default PdfViewer;
