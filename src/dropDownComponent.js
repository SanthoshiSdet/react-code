import React, { useEffect, useState ,useRef} from "react";
export default function DropDownComponent() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showResponse,setShowResponse]=useState(false);
  function onInputChangeFunction(e) {
    const { value } = e.target;
    setInputValue(value);
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(inputValue);

    }, 300);
    return () => {
      clearTimeout(handler);
    if(inputValue===""){
        setShowResponse(false)
    }
}
  }, [inputValue]);
// const setTimerForFunction=()=>{
//     const handler = setTimeout(() => {
//         console.log("inside")
//               setDebouncedQuery(inputValue);
//                   clearTimeout(handler)

//             }, 300);
//             console.log("ourtside")
//     }
  const fetchData = async () => {
    try {
        console.log("called")
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedQuery}`
      );
      const data = await response.json();
      setSuggestions(data.meals || []);
      setShowResponse(true)

    } catch {
      console.error("Error fetching data");
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);
  const [focusedIndex, setFocusedIndex] = useState(0); // Track the focused item
  const listRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      
      );
     
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
        setInputValue(suggestions[focusedIndex].strMeal)
        setSuggestions([])
        setFocusedIndex(0)
       
      }
    }
    console.log(focusedIndex,"focusedIndex")
  
}

  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
        
      const listItems = listRef.current.querySelectorAll('li');
      if (listItems[focusedIndex]) {
        listItems[focusedIndex].focus();
        // listItems[focusedIndex].scrollIntoView();
      }
    }
  }, [focusedIndex]);
  return (
    <div className="task1">
      <h2>Task 1 : Autocomplete Input API fetch</h2>
      {/* <label className="" htmlFor="input">Enter input here</label> */}
      <input
        type="text"
        id="input"  
        onChange={onInputChangeFunction}
        placeholder="Enter meal here"
        value={inputValue}
      />
      
      {suggestions.length > 0 &&showResponse&& (
        <ul className="autocomplete-container"  ref={listRef} >
          {suggestions.map((item,index) => (
            <li tabIndex={index===0?"0":"-1"}   className={focusedIndex === index ? 'focused' : ''} key={item.idMeal} onKeyDown={handleKeyDown}>{item.strMeal}</li>
          ))}
        </ul>
      )}
      {inputValue.length>0 &&showResponse&& suggestions.length===0 && <div>No suggestions found</div>}
    </div>
  );
}
