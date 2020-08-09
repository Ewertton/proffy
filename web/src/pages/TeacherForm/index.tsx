import React, { FormEvent } from 'react';
import {useHistory} from 'react-router-dom'

import warningIcon from '../../assets/images/icons/warning.svg'
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Input from '../../components/Input';

import './style.css';
import { useState } from 'react';
import api from '../../services/api';



function TeacherForm(){

    const history = useHistory();


    const [name,setName] = useState('');
    const [avatar,setAvatar] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [bio,setBio] = useState('');

    const [subject,setSubject] = useState('');
    const [cost,setCost] = useState('');

    const [scheduleItens,setScheduleItens] = useState([
        {week_day: 0,
         from: "",
         to: ""
        }
    ]);

    function addNewScheduleItem(){
        setScheduleItens([
            ...scheduleItens,
            {
                week_day: 0,
                from:'',
                to: ''
            }

        ])
    }

    function setScheduleItemValue(position:number, field: string, value: string){
        const updateScheduleItens = scheduleItens.map((scheduleItem, index)=>{
            if( index === position ){
                return{
                    ...scheduleItem,[field]: value
                };
            }
            return scheduleItem;
        });
        setScheduleItens(updateScheduleItens);
    }

    function handleCreateClass(event: FormEvent){
        event.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(() =>{
            alert('Cadastro realizado com sucessp!!');

            history.push('/')
        }).catch(()=>{
            alert( 'Erro no Cadastro');
            
        })    
    }
    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrivel que você quer dar aula"
                description="O primeiro passo é preencher o formulario de inscrição"
            />
        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus Dados</legend>
                    
                        <Input name="name" label="Nome Completo" 
                                value={name} onChange={(n) => {
                                    setName(n.target.value)}}
                        />

                        <Input name="avart" label="Avatar"
                                value={avatar} onChange={(a)=>{
                                    setAvatar(a.target.value)}}
                        />

                        <Input name="whstsapp" label="Whatsapp"
                                value={whatsapp} onChange={(w)=>{
                                    setWhatsapp(w.target.value)}}
                        />
                        <Textarea name="bio" label="bio"
                                value={bio} onChange={(b)=>{
                                    setBio(b.target.value)}}
                        />

                </fieldset>

                <fieldset>
                    <legend>Sobre a Aula</legend>

                        <Select 
                            name="subject" 
                            label="Materia"
                            value={subject}
                            onChange={(s)=>{setSubject(s.target.value)}}
                            options={[
                            
                                    { value: 'Artes', label: 'Artes' },
                                    { value: 'Biologia', label: 'Biologia' },
                                    { value: 'Informatica', label: 'Informatica' }
                                
                            ]}
                        />
                        <Input name="cost" label="Custo da sua hora por aula (em R$)"
                                value={cost}
                                onChange={(c)=>{setCost(c.target.value)}}
                        />
                        
                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponiveis
                        <button type="button" 

                                onClick={addNewScheduleItem}> + Novo Horario

                         </button>                            
                    </legend>

                
                    {scheduleItens.map((scheduleItem, index) =>{
                        return(
                            <div key={scheduleItem.week_day} 
                                    className="schedule-item">

                            <Select 
                                    name="week_day" 
                                    label="Dia da Semana"
                                    value={scheduleItem.week_day}
                                    onChange={w => setScheduleItemValue(
                                                    index,'week_day',w.target.value)}
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
                                <Input name="from" label="Das" 
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={f => setScheduleItemValue(
                                                        index,'from',f.target.value)}
                                />
                                <Input name="to" label="Até" 
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={t => setScheduleItemValue(
                                                        index,'to',t.target.value)}
                                />
                            </div>
                        )

                })}
                </fieldset>
                

                <footer>

                    <p>
                        <img src={warningIcon} alt="Aviso"/>
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">Salvar Cadastro</button>
                </footer>
            </form>           
        </main>

        </div>
    )
}

export default TeacherForm;