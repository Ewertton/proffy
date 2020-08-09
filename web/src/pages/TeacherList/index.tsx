import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';


import './style.css';

function TeacherList(){ 

    const [teacher, setTeacher] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(event: FormEvent){
        event.preventDefault()

        
        const response = await api.get('classes',{
            params: {
                 week_day,
                 subject,
                 time
        }
        })
        setTeacher(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">

            <PageHeader title="Esse são os Proffys disponiveis.">

            <form id="search-teacher" onSubmit={searchTeachers} >

                <Select 
                    name="subject" 
                    label="Materia"
                    value={subject}
                    onChange={(s) => { setSubject ( s.target.value )}}
                    options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Informatica', label: 'Informatica' }
                        ]}
                />

                <Select 
                    name="week_day" 
                    label="Dia da Semana"
                    value={week_day}
                    onChange={(w) => { setWeek_day ( w.target.value )}}
                    options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-Feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-Feira' },
                            { value: '4', label: 'Quinta-Feira' },
                            { value: '5', label: 'Sexta-Feira' },
                            { value: '6', label: 'Sabado' }
                        ]}
                    />

                <Input 
                    type="time" name="time" label="Hora" 
                    value={time}
                    onChange={(t) => { setTime ( t.target.value )}}   
                />

                <button type="submit">Buscar</button>
            </form>
            </PageHeader>

            <main>
                { teacher.map((teacher: Teacher) =>{
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;