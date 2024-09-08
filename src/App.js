import React, { useState, useEffect } from "react";
import { PokemonList } from "./PokemonList";
import axios from "axios";   // to get somenthing from api
import { Pagination } from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([])  // set it as empty array
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {    // makes fetch request then returns a promise
      setLoading(false)
      setNextPageUrl(res.data.next)  
      setPrevPageUrl(res.data.previous)  
      setPokemon(res.data.results.map(p => p.name))
      })

      return () => cancel()
  }, [currentPageUrl]); // if we put something in array, it'll re-run our effect and we want to run it 1 single time
  // everytime we change currentPageUrl, we want to refetch the pokemons 

  // not a correct way, it's called an affect (something we want to happen), we need to re-render (refresh) our application when it does happen

  // axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {    // makes fetch request then returns a promise
  //   setPokemon(res.data.results.map(p => p.name))
  // })

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    // empty fragments are used because js allows to return only 1 object
    <>  
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage = {nextPageUrl ? gotoNextPage : null}
        gotoPrevPage = {prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
