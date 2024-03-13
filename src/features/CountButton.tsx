import React, { useState, useEffect } from "react";
import { AiOutlineSend } from 'react-icons/ai';
import { TfiReload } from "react-icons/tfi";
import { GoArrowDown } from "react-icons/go";
import { PiMagicWandDuotone } from "react-icons/pi";
import ReactDOM from 'react-dom';

export const CountButton = () => {
 
  const [popUp, setPopUp] = useState(false); // This state is used to open and close the popup
    const [generate, setGenerate] = useState(false); // This state is used to  change the popup screen when clicked on generate
    const [inputValue, setInputValue] = useState(''); // THis state is used to store the prompt
    const [message, setMessage] = useState(''); // This state is used to store the prompt once user clicks on generate.
  
    const displayText = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    
    const handleDivFocus = (event: FocusEvent) => {
      const divElement = event.target as HTMLElement;
      const iconWrapper = document.createElement("div");
      iconWrapper.className = "icon-wrapper";
  
      // Render the React icon component directly inside the iconWrapper
      ReactDOM.render(<PiMagicWandDuotone onClick={()=>{setPopUp(true)}} style={{ color: 'blue' }} className="icon-image" />, iconWrapper);
      divElement.appendChild(iconWrapper);
      const styles = `
        .icon-wrapper {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: white;
          margin-bottom: 10px;
          margin-right: 12%;
          cursor: default;
        }
        
        .icon-wrapper:hover {
          cursor: pointer;
        }
        
        .icon-image {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        `;
      const style = document.createElement("style");
      style.textContent = styles;
      document.head.appendChild(style);
    };
  
    const handleDivBlur = (event: FocusEvent) => {
      const divElement = event.target as HTMLElement;
      const iconWrapper = divElement.querySelector(".icon-wrapper");
      if (iconWrapper) {
        divElement.removeChild(iconWrapper);
      }
    };
  
    // Function to handle input change
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    // Function to handle Generate button click
    const handleGenerateClick = () => {
      setMessage(inputValue);
      setInputValue('');
      setGenerate(true);
      console.log('Input value:', inputValue);
    };  
  
    // close the popup when clicked outside the popup 
    const handOutsideClick = (event) =>{
      if (event.target.className.includes('fixed inset-0')) {
        setPopUp(false);
      }
    }
  
    const handleInsertClick = () => {
      // Find the <div> tag in the document for inserting message
      const divElements = document.getElementsByClassName(
        "msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate"
      );
      
      // Iterate through each element with the specified class
      Array.from(divElements).forEach((element) => {
        // Remove the placeholder
        element.removeAttribute('data-placeholder');
  
        // Find the <p> tag within the current element
        const paragraph = element.querySelector('p');
        if (paragraph) {
          // Replace its content with the displayText state value
          paragraph.textContent = displayText;
        }
      });
  
      const divElements2 = document.getElementsByClassName("msg-form__placeholder t-14 t-black--light t-normal")
      Array.from(divElements2).forEach((element) => {
        // Remove the Placeholder
        element.removeAttribute('data-placeholder');
        
      });
      // Reset generate state after inserting text
      setGenerate(false);
      setPopUp(false)
    };
  
    useEffect(() => {
      // Event Listener for finding the message box and its focus and blur
      const addEventListenersToDivs = () => {
        // Find the Div Tag in the document to find the message box
        const divElements = document.getElementsByClassName(
          "msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate"
        );
        // if div loaded then check for focus and blur  else wait for 1 second and check again for div tag
        if (divElements.length > 0) {
          Array.from(divElements).forEach((divElement) => {
            divElement.addEventListener("focus", handleDivFocus);
            divElement.addEventListener("blur", handleDivBlur);
          });
          return () => {
            Array.from(divElements).forEach((divElement) => {
              divElement.removeEventListener("focus", handleDivFocus);
              divElement.removeEventListener("blur", handleDivBlur);
            });
          };
        } else {
          setTimeout(addEventListenersToDivs, 1000);
        }
      };
      addEventListenersToDivs();
    }, []);
  
    return (
      <div className="z-50 flex fixed top-32 right-8">
      {popUp && (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handOutsideClick}>
          <div id="authentication-modal" aria-hidden="true" style={{"width":"30%"}} className="overflow-y-auto overflow-x-hidden bg-white rounded-lg shadow max-h-[calc(100vh - 8rem)]">
            <div className="relative p-4 w-full  max-h-[calc(100vh - 8rem)]">       
              {generate && (
                <div>
                  <div className="chat-message p-2">
                    <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xl max-w-xl mx-2 order-1 items-end">
                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-black">{message}</span>
                      </div>
                    </div>
                  </div>
                  <div className="chat-message p-2">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-xl max-w-xl mx-2 order-2 items-start">     
                        <span className="px-4 py-2 rounded-lg inline-block bg-blue-300 text-black">{displayText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}        
              <div className="p-4 md:p-5">
                <form className="space-y-4">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">            
                      <input type="text" name="name" id="name" style={{fontSize:"15px"}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your Prompt" value={inputValue} onChange={handleChange}/>
                    </div>
                  </div>
                  {generate ? (
                    <div className="flex justify-end space-x-4" style={{fontSize:"15px"}}>
                      <button type="button" className="text-black bg-white border border-black hover:bg-gray-200  rounded-md px-5 py-2.5 dark:hover:bg-gray-600 dark:hover:text-black" onClick={handleInsertClick}>
                        <GoArrowDown className="inline-block mr-2" />  Insert
                      </button>
                      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:hover:bg-blue-600 dark:hover:text-blue-700 dark:focus:ring-blue-800">
                        <TfiReload className="inline-block mr-2" />  Regenerate
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-4" style={{fontSize:"15px"}}>
                      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleGenerateClick}>
                        <AiOutlineSend className="inline-block mr-2" />  Generate
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>    
      )}
    </div>
  )
}
