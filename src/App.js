import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const [row, setRow] = useState({
    currRow: 0,
    // Store text for each index of each row
    text: [""]
  });

  const handleClick = (rowNum) => {
    // Set current row
    const updatedRow = { ...row };
    updatedRow.currRow = rowNum;
    setRow(updatedRow);
  }

  // Insert text
  useEffect(() => {
    const handleKeyDown = (event) => {
     // filter out non alpha numeric
     if (event.key === "Backspace") {

      const updatedRow = { ...row };

      if (updatedRow.text[updatedRow.currRow].length === 0 && updatedRow.currRow !== 0) {
        updatedRow.text.pop();
        updatedRow.currRow -= 1;
      } else {

        let text = updatedRow.text[updatedRow.currRow].split("");
        text.pop();
  
        updatedRow.text[updatedRow.currRow] = text.join("");
      }

      


      setRow(updatedRow);

     } else if (event.key === "Enter") {
      const updatedRow = { ...row };
      // create new row
      updatedRow.text.push("");
      updatedRow.currRow += 1;

      setRow(updatedRow);

      console.log(row.text)

     } else if (event.key === " ") {

      const updatedRow = { ...row };
      updatedRow.text[updatedRow.currRow] = updatedRow.text[updatedRow.currRow] + " ";
      setRow(updatedRow);

     } else if (((event.key >= 'a' && event.key <= 'z') || 
               (event.key >= 'A' && event.key <= 'Z')) && 
                event.key.split("").length <= 1) {

      // set text in current row
      const updatedRow = { ...row };

      if (updatedRow.text[updatedRow.currRow]) {
        updatedRow.text[updatedRow.currRow] = updatedRow.text[updatedRow.currRow] + event.key;
      } else {
        updatedRow.text[updatedRow.currRow] = event.key;
      }

      setRow(updatedRow);
     }
 
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [row]);


  const Row = (props) => {
    return (
      <div onClick={() => handleClick(props.index)} className={`row ${row.currRow === props.index ? 'current' : ''}`}>
        {row.text[props.index]}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="toolbar">
        <h5>Toolbar</h5>
      </div>
      <div className="canvas">
        {row.text.map((row, i) => (
          <Row key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
