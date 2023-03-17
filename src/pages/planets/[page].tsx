import PlanetsList from "@/components/PlanetList";
import { PlanetsAPI } from "@/type";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Array<{
    name: string;
    id: string;
  }> = [];
  try {
    // https://swapi.dev/api/planets
    const page = context.query.page;
    console.log(page)
    const res = await fetch(`https://swapi.dev/api/planets/?page=${context.query.page}`);
    const data: PlanetsAPI = await res.json();
    
    props.push(
      ...data.results.map((planet) => {
        const name = planet.name;
        // get id from url
        const id = planet.url.split("/").slice(-2)[0];


        
        return { name, id };
      })
    );

  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      data: props,
    },
  };
};

type HomeProps = {
  data: Array<{
    name: string;
    id: string;
  }>;
};

export default function Home(props: HomeProps) {
  return <PlanetsList data={props.data} />;
}