import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";

export type character={
    id:number
    name:string
    image:string
    status:string
    gender:string
    origin:{
        name:string
    }
    location:{
        name:string
    }
    species:string
}
export type apidata={
    info:{
        count: number,
        pages: number,
        next: string,
        prev: string
    },
    results:character[]
}
const Characters:FunctionalComponent=()=>{
    const [Characters,setCharacters]=useState<apidata>()
    const [actualPage,setactualPage]=useState<number>()
    const [search,setSearch]=useState<string>("")
    useEffect(()=>{
            getallcharacters()
            setactualPage(1)
    },[])

    const getallcharacters=async()=>{
        const url="https://rickandmortyapi.com/api/character"
        const Response=await fetch(url)
        const data:apidata=await Response.json()
        setCharacters(data)
        
    }
    const nextPage=async()=>{
        if(actualPage){
            if(Characters?.info.next){
                const url=Characters.info.next
                const Response=await fetch(url)
                const data:apidata=await Response.json()
                setCharacters(data)
                setactualPage(actualPage+1)
            }          
        }
        
    }
    const prevPage=async()=>{
        if(actualPage){
            if(Characters?.info.prev){
                const url=Characters.info.prev
                const Response=await fetch(url)
                const data:apidata=await Response.json()
                setCharacters(data)
                setactualPage(actualPage-1)
            }          
        }
    }
    const searchcharacter=async(name:string)=>{
        const url="https://rickandmortyapi.com/api/character/?name="+name
        const Response=await fetch(url)
        const data:apidata=await Response.json()
        setCharacters(data)
    }
    
    
    return (
        <>
            <h1>Rick and Morty Characters</h1>
            <div class="search-form">
                <input class="search-input" type="text" name="name" onInput={(e)=>setSearch(e.currentTarget.value)}/>
                <button class="button" onClick={(_e)=>searchcharacter(search)}>buscar</button>
            </div>
            <div class="characters">
                {Characters?.results.map((c)=>{
                    return (
                        <a href={"/character/"+c.id}>
                            <div class="character-card">
                                <img src={c.image}/>
                                <p>{c.name}</p>
                            </div>
                        </a>    
                    )
                })}
            </div>
            <div class="pagination">
                <button onClick={()=>prevPage()}>Anterior</button>
                <p>{actualPage}/{Characters?.info.pages}</p>
                <button onClick={()=>nextPage()}>Siguiente</button>
                
            </div>

        </>
        
    )
}

export default Characters