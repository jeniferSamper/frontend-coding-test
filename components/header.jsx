import 'bootstrap/dist/css/bootstrap.min.css';
import lego from "../images/lego.png"
import Image from 'next/image'

function NavBar() {

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href={'/'}>
                    <Image src={lego}  alt='img2' width="60" height="60"></Image>
                </a>
                <h2>Lego Fans</h2>
            </div>
        </nav>
    )
}

export { NavBar }
