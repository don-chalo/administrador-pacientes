import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { DraftPatient, Patient } from "./types/types"

type PatientState = {
    activeId: Patient["id"],
    patients: Patient[],
    addPatient: (data: DraftPatient) => void,
    deletePatient: (id: Patient["id"]) => void,
    getPatientById: (id: Patient["id"]) => void,
    updatePatient: (patient: DraftPatient) => void
};

export const usePatientStore = create<PatientState>()(
    persist(
        (set) => ({
            patients: [],
            activeId: '',
            addPatient: (data) => {
                const newPatient: Patient = {
                    ...data,
                    id: uuidv4()
                };
                set((state) => ({
                    patients: [...state.patients, newPatient]
                }));
            },
            deletePatient: (id) => {
                set((state) => ({
                    patients: state.patients.filter((patient) => patient.id !== id)
                }));
            },
            getPatientById: (id) => {
                set(() => ({
                    activeId: id
                }));
            },
            updatePatient: (data) => {
                set((state) => ({
                    activeId: '',
                    patients: state.patients.map((patient) => patient.id === state.activeId ? { ...data, id: patient.id } : patient )
                }));
            }
        }),
        {
            name: "patient-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
);
