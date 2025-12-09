import { Ear, Wind, Thermometer, Stethoscope, Activity, Mic2 } from "lucide-react";

export const mockServices = [
    {
        id: "sinuplasty",
        name: "Balloon Sinuplasty",
        category: "Nose & Sinus",
        description: "A minimally invasive procedure to open blocked sinus passages and relieve chronic sinusitis symptoms.",
        symptoms: ["Chronic Congestion", "Facial Pain", "Headaches"],
        icon: Wind,
    },
    {
        id: "allergy",
        name: "Allergy Immunotherapy",
        category: "Allergy",
        description: "Long-term treatment to decrease sensitivity to allergens like pollen, dust mites, and pet dander.",
        symptoms: ["Sneezing", "Runny Nose", "Itchy Eyes"],
        icon: Thermometer,
    },
    {
        id: "audiology",
        name: "Comprehensive Hearing Exam",
        category: "Ear & Hearing",
        description: "Detailed assessment of hearing ability and ear health to diagnose hearing loss.",
        symptoms: ["Hearing Loss", "Tinnitus", "Ear Fullness"],
        icon: Ear,
    },
    {
        id: "throat",
        name: "Tonsillectomy",
        category: "Throat",
        description: "Surgical removal of the tonsils to treat recurrent infections or sleep apnea.",
        symptoms: ["Sore Throat", "Snoring", "Sleep Apnea"],
        icon: Activity,
    },
    {
        id: "voice",
        name: "Voice Therapy",
        category: "Throat",
        description: "Therapy exercises to improve voice quality and heal vocal cord injuries.",
        symptoms: ["Hoarseness", "Weak Voice", "Vocal Strain"],
        icon: Mic2,
    },
    {
        id: "checkup",
        name: "General ENT Consultation",
        category: "General",
        description: "Evaluation of ear, nose, and throat conditions by a specialist.",
        symptoms: ["General Discomfort", "Infection", "Check-up"],
        icon: Stethoscope,
    },
];
