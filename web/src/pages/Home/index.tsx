import logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom'; //Usado para usar o conceito de SPA, não ter que recarregar a aplicação inteira ao trocar de pagina.
import React from 'react';
import './styles.css';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coletas de forma eficiente.</p>

                    <Link to="/create-point">
                        <span>
                        <FiLogIn />
                    </span>

                        <strong>
                            Cadastre um ponto de coleta
                    </strong>
                    </Link>
                </main>


            </div>
        </div>
    );
}

export default Home;