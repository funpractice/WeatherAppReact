import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import './Search.css'
import cities from '../../cities.json'


interface Props {
  setcity:Dispatch<SetStateAction<string>>;
}

const Search:FC<Props> = (props) => {
  
  const [input, setInput] = useState("");
  
  const [searchedCities, setSearchedCities] = useState<Array<String>>([]);
  const searchedCity = cities.filter(data=>data.name.toLowerCase().includes(input.toLowerCase()))
  
    function handleChange (e:React.ChangeEvent<HTMLInputElement>):void {
        const { value } = e.target;
        setInput(value);
      }
      function clickEvent(e: React.MouseEvent<HTMLLIElement>){
        const input = e.target as HTMLLIElement;
        props.setcity(input.innerText)
        let existingCities:Array<String> = []
        localStorage.getItem("cities")!==null&&(JSON.parse(localStorage.getItem("cities")||"")).map((data:any)=>existingCities.push(data))
        
        existingCities.length<5?existingCities.push(input.innerText):existingCities.shift(); existingCities.push(input.innerText);
        let newcities =existingCities&& new Set(existingCities)
        let uniqueCities = Array.from(newcities);
          localStorage.setItem("cities", JSON.stringify(uniqueCities));
          uniqueCities&&setSearchedCities(uniqueCities);
        setInput('')
      }
      function clickEvent2(e: React.MouseEvent<HTMLDivElement>){
        const input = e.target as HTMLDivElement;
        props.setcity(input.innerText)
        let existingCities:Array<String> = []
        localStorage.getItem("cities")!==null&&(JSON.parse(localStorage.getItem("cities")||"")).map((data:any)=>existingCities.push(data))
        existingCities.length<5?existingCities.push(input.innerText):existingCities.shift(); existingCities.push(input.innerText);
        let newcities =existingCities&& new Set(existingCities)
      let uniqueCities = Array.from(newcities);
        localStorage.setItem("cities", JSON.stringify(uniqueCities));
        setSearchedCities(uniqueCities);
        setInput('')
      }
    let clear = input.length>1? 'fa fa-close icon2': 'none'
    let search = input.length>1? 'form-control input-search inputsearch': 'form-control inputsearch'
    let searchList = input.length>1? 'suggestions inputsearch': 'no-suggestions inputsearch'


    useEffect(() => {
      let searchedCities = localStorage.getItem("cities")&&JSON.parse(localStorage.getItem("cities")||"")
      let newcities =searchedCities&& new Set(searchedCities)
      newcities =newcities&& Array.from(newcities);
      setSearchedCities(newcities);
    },[])


    return (
        <div style={{
          width:'100%',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
              <input
                type="text"
                className={search}
                placeholder="Search Location"
                style={{
                  border: "1x solid black",
                  borderRadius: "20px",
                  width: "500px",
                }}
                value={input}
          onChange={handleChange}
              />
          {input.length > 1 ? 
              <ul className={searchList} style={{position:"absolute"}}>
                
                {searchedCity.map((data)=>
                <li key={data.id} onClick={(e:React.MouseEvent<HTMLLIElement>)=>clickEvent(e)} >
                  {data.name}
                  <i
                className='fa fa-search icon1'
              ></i>
                </li>
                )}
                  
        </ul>
           : 
           <></>
          }
        </div>
          <i
            onClick={() => setInput('')}
            className={clear}
          ></i>
            </div>
            {searchedCities&&searchedCities.length>0?
            <div className='searchedCity' style={{display:'flex',justifyContent:'center',margin:'5px',alignItems:'center',width:'100%',flexWrap:'wrap'}}>
              Recent: 
            {searchedCities.map((data:any)=>
            
            <div className='recent' onClick={(e:React.MouseEvent<HTMLDivElement>)=>clickEvent2(e)} style={{display:'flex',justifyContent:'center',background: "rgba(255, 255, 255, 0.28)",height:'35px',margin:'5px',padding:'5px',borderRadius:'10px'}}>{data}</div>
            )}</div>
            :
           <></>
            
            }
          </div>
    )
}

export default Search
