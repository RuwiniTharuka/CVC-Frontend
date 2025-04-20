
import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaupload";
export default function Testing() {
  const [file, setFile]= useState(null);
  function handleUpload(){
    mediaUpload(file).then(
      (url)=>{
        console.log();
        toast.success("file uploaded successfully")
      }
    ).catch(
      (error)=>{
        console.log(error);
        toast.error("file upload failed")
      }
    )
  }
  return(
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <input type="file" 
      onChange={(e)=>{
        setFile(e.target.files[0]);
      }}
      />
      <button
        onClick={handleUpload}
        className="bg-gray-700 text-white p-2 rounded-lg">Upload
      </button>
    </div>
    );
  }



 /* import { createClient } from "@supabase/supabase-js";
 const supabase = createClient(
    "https://rdcumovmyyqrghkeuakp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkY3Vtb3ZteXlxcmdoa2V1YWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3OTE2NTYsImV4cCI6MjA2MDM2NzY1Nn0.Y1HcMCFAwpeCSD7UV5QXG4gNI_EyOzbGhFgnDJwd4V4"
  );
  function handleUpload() {
    const fileName=file.name
    //const arr=fileName.split(".")
    //const fileExtension=arr[arr.length-1]
    const newfileName=new Date().getTime()+fileName//+fileExtension
    supabase.storage.from("images").upload(newfileName , file , {
        cacheControl: "3600",
        upsert: false,
      }).then(
        () => {
        toast.success("File uploaded successfully");
      }
    ).catch(
      () => {
        toast.error("File upload failed");
      });
  }
 return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <input type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
        }}
      />
      <button onClick={handleUpload}
        className="bg-gray-700 text-white p-2 rounded-lg"
      >
        Upload
      </button>
    </div>
  );
}
/*import { useState } from "react";

export default function Testing(){
   const [number, setNumber] = useState(0)
   const [status,setStatus] =useState("Pending")
    function increment(){
        let newValue =number+1;
        setNumber(newValue)
    }
    function decrement(){
        let newValue =number-1;
        setNumber(newValue)
    }
    return(
    <div className="w-full h-screen flex flex-col justify-center items-center">
           <span className="text-3xl font-bold">{number}</span>
           <div className="w-ful flex justify-center">
                <button onClick={increment}className="bg-blue-500 text-white px-4 py-2 rounded-lg  w-[60px] cursor-pointer">+</button>
                <button onClick={decrement}className="bg-blue-500 text-white px-4 py-2 rounded-lg  w-[60px] cursor-pointer">-</button>
           </div>
    
         <span className="text-3xl font-bold">{status}</span>
         <div className="w-ful flex justify-center">
              <button onClick={()=>{
                setStatus("Passed")
              }}className="bg-blue-500 text-white p-2 rounded-lg  w-[60px] cursor-pointer">Pass</button>
              <button onClick={()=>{
                setStatus("Failed")
              }}className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">Fail</button>
         </div>
      </div>
    )
}*/
