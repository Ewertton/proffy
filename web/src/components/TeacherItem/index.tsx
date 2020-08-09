import React from 'react';

import './style.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api';


export interface Teacher {
    id: number,
    subject: string,
    cost: number,
    name: string,
    avatar: string
    whatsapp: number,
    bio: string
}

interface TeacherItemProps{
    teacher: Teacher;
} 



const TeacherItem: React.FC<TeacherItemProps> = ({ teacher })=>{
    
    function createNewConnection(){
        api.post('connections',{
            user_id: teacher.id,
        });

    }

    return(
        <article className='teacher-item'>
            <header>
                <img src={teacher.avatar} alt=""/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
                <p>
                    {teacher.bio}
                </p>
            <footer>

                <p>
                    Preço/Hora 
                    <strong>R$ {teacher.cost}</strong>
                </p>

                <a 
                    onClick={createNewConnection} 
                    href={`https://wa.me/55${teacher.whatsapp}`} 
                    target="_blank">

                    <img src={whatsappIcon} alt=""/>
                    Entrar em Contato
                </a>
            </footer>

        </article>

    );
}

export default TeacherItem;