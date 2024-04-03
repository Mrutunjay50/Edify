import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {saveAs} from 'file-saver'
import apiurl from "../../utils";

const MyPDFComponent = ({ subject, title, inwhat, handleClick }) => {
  const [documentVal, setDocumentVal] = useState({
    inwhat: inwhat,
    subject : subject,
    title : title,
    noteSummary : ""
  });

  const handleChange = (e) =>{
    setDocumentVal({...documentVal, [e.target.name] : e.target.value})
  }

  const createDownloadPDF = async () => {
    try {
      await apiurl.post('/create-pdf', documentVal);
  
      const response = await apiurl.get('/fetch-pdf', { responseType: "blob" });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'newPdf.pdf');
    } catch (error) {
      // Handle any errors that might occur during the requests
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="relative right-0 mb-5 mt-3">
      <div className="border-b-[2px] border-r-[2px] border-grey shadow-xl">
        <TextField
          id="standard-multiline-static"
          label="FOR NOTES"
          InputLabelProps={{ sx: { color: "blue-500" } }}
          multiline
          rows={14}
          sx={{ width: 450, height: 390, marginLeft: 1 }}
          placeholder="Write your own notes...HERE"
          variant="standard"
          name="noteSummary"
          onChange={handleChange}
          value={documentVal.noteSummary}
        />
      </div>
      <div
        onClick={() => {createDownloadPDF(); handleClick(55)} }
        className="relative left-[15.7rem] bg-black/80 text-white h-[3rem] w-[10rem] cursor-pointer mt-[2.7rem] rounded-md hover:bg-white border-b-[2px] border-r-[2px] shadow-md shadow-grey"
      >
        <h2 className="text-white font-sans p-[0.6rem] pl-9 hover:text-black/90  rounded-md">
          Save as Pdf
        </h2>
      </div>
    </div>
  );
};

export default MyPDFComponent;
