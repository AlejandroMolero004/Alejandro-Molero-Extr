import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { character } from "../../islands/Characters.tsx";

export const handler:Handlers<character>={
    GET:async(_req:Request,ctx:FreshContext<unknown,character>)=>{
        const id=ctx.params.id
        console.log(id)
        const url="https://rickandmortyapi.com/api/character/"+id
        const response=await fetch(url)
        const data:character=await response.json()
      
        return ctx.render(data)
    }
}

const Page=(props:PageProps<character>)=>{
    console.log(props.data)
    return (
        <div>
            <a href="/">Volver</a>
            <h1>{props.data.name}</h1>
            <img src={props.data.image}/>
            <p>Status:{props.data.status}</p>
            <p>species:{props.data.species}</p>
            <p>Gender:{props.data.gender}</p>
            <p>Origin:{props.data.origin.name}</p>
            <p>Location:{props.data.location.name}</p>
        </div>
    )
}
export default Page