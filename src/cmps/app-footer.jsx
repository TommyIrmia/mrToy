import logo from '../assets/img/toylogo.png'

export function AppFooter() {
    return (
        <footer>
            <div className="logo">
                <img src={logo} alt="Logo.." />
                Mister Toy
            </div>
            <small>All Rights Reserved To Me (ONLY IF IT'S ANY GOOD)</small>
        </footer>
    )
}