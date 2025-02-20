import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import './styles.css';
import logoImg from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';



function Landing(){
    const [totalConnections, setConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then( response =>{
            const { total } = response.data;

            setConnections(total);
        })
    },[]);




    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div id="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua Plataforma de Estudos Online</h2>
                </div>

                <img src={landing} alt="Plataforma de estudos" 
                    className="hero-image"/>

                <div className="buttons-container">
                    
                    <Link to="/study/" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                   
                    <Link to="/give-classes/" className="give-classes">
                        <img src={giveClassesIcon} alt="Ensinar"/>
                        Ensinar
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} Conexões já realizadas
                    <img src={purpleHeartIcon} alt="Coração roxo"/>
                </span>
            </div>
        </div>


    )
}


export default Landing;