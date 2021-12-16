import LoaderImg from '../assets/loader/grid.svg'


export function Loader() {

    return <div className="loader">
        <img src={LoaderImg} alt="Loading.." />
    </div>
}