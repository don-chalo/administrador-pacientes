export type Patient = {
    caretaker: string;
    date: Date;
    email: string;
    id: string;
    name: string;
    symptoms: string;
}

export type DraftPatient = Omit<Patient, 'id'>;