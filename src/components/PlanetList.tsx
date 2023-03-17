import Link from "next/link";
import styled from "styled-components";

const PlanetsList = ({
  data,
}: {
  data: Array<{
    name: string;
    id: string;
  }>;
}) => {
  return (
    <div>
      <h1>Planets</h1>
      <ul>
        {data.map((planet) => (
          
          <li key={planet.id}>
            <Link href={`/planet/${planet.id}`}>{planet.name}</Link>
          </li>
        ))}
      </ul>
      <BotonPaginas>
            <BotonClick botonPaginaValida = {true}
                onClick={() => {
                    //setPage(page - 1);
                    window.scroll(0,0);
                    
                    // Poner que paginaInvalida que debo poner BotonNextOrPrevous true
                }}
            >Anterior Pagina
            </BotonClick>

            <BotonClick botonPaginaValida = {true}
                onClick={() => {
                    //setPage(page + 1);
                    window.scroll(0,0);
                    
                }}
            >Siguiente Pagina
            </BotonClick>
        </BotonPaginas>
      
    </div>
  );
};

export default PlanetsList;

type InputProps = {
  botonPaginaValida: boolean,
}

const BotonClick = styled.button<InputProps>`
    min-width: 130px;
    height: 40px;
    color: #fff;
    padding: 5px 10px;
    margin: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: ${props => props.botonPaginaValida ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    outline: none;
    border-radius: 5px;
    border: 2px solid #212529;
    background: #212529; 
    :active {
        background-color: red
    }
`

const BotonPaginas = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
`