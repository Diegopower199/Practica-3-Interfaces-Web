import PlanetComponent from "@/components/Planet";
import { Planet, PlanetAPI } from "@/type";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link"; 



const Planeta = () => {
    const [data, setDataPlanet] = useState<Planet | undefined>();
    const [id, setId] = useState<number>(1);
    
    const fetchData = async () => {
        try {
            
            const chars = await fetch(`https://swapi.dev/api/planets/${id}`);
            const dataAPI: PlanetAPI = await chars.json();

            //const names = json.results.map( (char: any) => char.name)
            const data: Planet = {
                ...dataAPI,
                residents: await Promise.all(
                    dataAPI.residents.map(async (r: string) => {
                      const data = await fetch(r);
                      return await data.json();
                    })
                ),

                films: await Promise.all(
                    dataAPI.films.map(async (f: string) => {
                      const data = await fetch(f);
                      return await data.json();
                    })
                ),

            }

            setDataPlanet(data);
            //console.log(data);

        }

        catch (e) {
            //setDataPlanet()
        }
        
    };


    useEffect ( () => {
        var URLactual = window.location;
        console.log("Informacion: ", URLactual.href.split("/").slice(-1)[0]);
        fetchData();
        setId(parseInt(URLactual.href.split("/").slice(-1)[0]));

    }, [id])


    return <>
        <h1>HOLA</h1>
        {data?.name}
        <div>
            <Link href="/">Back</Link>
            <h1>{data?.name}</h1>
            <p>Rotation period: {data?.rotation_period}</p>
            <p>Orbital period: {data?.orbital_period}</p>
            <p>Diameter: {data?.diameter}</p>
            <p>Climate: {data?.climate}</p>
            <p>Gravity: {data?.gravity}</p>
            <p>Terrain: {data?.terrain}</p>
            <p>Surface water: {data?.surface_water}</p>
            <p>Population: {data?.population}</p>
            <h2>Residents</h2>
            <ul>
            {data?.residents.map((resident) => (
                <li key={resident.name}>{resident.name}</li>
            ))}
            </ul>
            <h2>Films</h2>
            <ul>
            {data?.films.map((film) => (
                <li key={film.title}>{film.title}</li>
            ))}
            </ul>
        </div>
        
    </>;
}

export default Planeta;
/*
name: planet.name,
                rotation_period: planet.rotation_period,
                orbital_period: planet.orbital_period,
                diameter: planet.diameter,
                climate: planet.climate,
                gravity: planet.gravity,
                terrain: planet.terrain,
                surface_water: planet.surface_water,
                population: planet.population,
                residents: await Promise.all(
                    json.re
                ),
                films: planet.films,
                created: planet.created,
                edited: planet.edited,
                url: planet.url,
                */