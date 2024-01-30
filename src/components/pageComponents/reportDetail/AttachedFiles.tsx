import React from 'react';

const AttachedFiles = ({ files }:any) => {
  return (
    <div className="bottom-0 left-0 p-4 pl-30 mt-10">
      <h1 className="text-xl md:text-[1.5rem] lg:text-[2.5rem] font-bold h-fit">Attached Files:</h1>
      <ul className="list-inside text-white mt-5 pl-5 list-none">
        {files.map((file:any, index:any) => (
          <li key={index}><a href={file.url} download={file.fileName} target="_blank" rel="noopener noreferrer">{file.fileName}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default AttachedFiles;