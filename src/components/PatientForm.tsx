import { useForm } from "react-hook-form"

import Error from "./Error";
import { DraftPatient } from "../types/types";
import { usePatientStore } from "../store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PatientForm() {

    const { activeId, addPatient, patients, updatePatient } = usePatientStore();
    // const addPatien = usePatientStore((state) => state.addPatient);

    const { formState: { errors }, handleSubmit, register, reset, setValue } = useForm<DraftPatient>();
  
    useEffect(
        () => {
            if (activeId) {
                const activePatient = patients.filter((patient) => patient.id === activeId)[0];
                setValue('caretaker', activePatient.caretaker);
                setValue('date', activePatient.date);
                setValue('email', activePatient.email);
                setValue('name', activePatient.name);
                setValue('symptoms', activePatient.symptoms);
            }
        },
        [activeId]
    );

    const registerPatient = (data: DraftPatient) => {
        if (activeId) {
            updatePatient(data);
            toast('Paciente actualizado correctamente', { type: 'success' });
        } else {
            addPatient(data);
            toast.success('Paciente registrado correctamente');
        }
        reset();
    };

    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" noValidate onSubmit={handleSubmit(registerPatient)}>
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input className="w-full p-3 border border-gray-100"
                        id="name"
                        placeholder="Nombre del Paciente"
                        type="text"
                        {
                            ...register(
                                'name',
                                {
                                    maxLength: {
                                        message: 'Máximo 50 caracteres',
                                        value: 50
                                    },
                                    required: 'El nombre del paciente es obligatorio',
                                }
                            )
                        } />
                        { errors.name && <Error>{errors.name?.message}</Error> }
                        {/* { errors.maxLength && <Error>{errors.maxLength?.message?.toString()}</Error> } */}
                </div>
  
                <div className="mb-5">
                  <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                      Propietario 
                  </label>
                  <input className="w-full p-3 border border-gray-100"
                      id="caretaker"
                      placeholder="Nombre del Propietario"
                      type="text"
                      {
                          ...register('caretaker', { required: 'El nombre del propietario es obligatorio' })
                      } />
                      { errors.caretaker && <Error>{errors.caretaker?.message}</Error> }
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input className="w-full p-3 border border-gray-100"
                    id="email"
                    placeholder="Email de Registro"
                    type="email"
                    {
                        ...register(
                            "email",
                            {
                                required: "El email es Obligatorio",
                                pattern: {
                                    message: 'Email no válido',
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                }
                            }
                        )
                    }  />
                    { errors.email && <Error>{errors.email?.message}</Error> }
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha Alta 
                  </label>
                  <input className="w-full p-3 border border-gray-100"
                    id="date"
                    type="date"
                    {
                        ...register('date', { required: 'La fecha de alta es obligatoria' })
                    } />
                    { errors.date && <Error>{errors.date?.message}</Error> }
              </div>
              
              <div className="mb-5">
                <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                    Síntomas
                </label>
                <textarea className="w-full p-3 border border-gray-100"
                    id="symptoms"
                    placeholder="Síntomas del paciente"
                    {
                        ...register('symptoms', { required: 'Los sintomas son obligatorios' })
                    } />
                    { errors.symptoms && <Error>{errors.symptoms?.message}</Error> }
              </div>
              <input className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  type="submit"
                  value='Guardar Paciente'/>
          </form> 
      </div>
    )
  }