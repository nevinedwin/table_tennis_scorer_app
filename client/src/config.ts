// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const { VITE_ENV, VITE_FIREBASE_API_KEY } = import.meta.env;

type ENV = "dev" | "prod";

// Your web app's Firebase configuration
const configData = {
    dev: {
        firebase: {
            apiKey: VITE_FIREBASE_API_KEY,
            authDomain: "tt-webapp-dev.firebaseapp.com",
            projectId: "tt-webapp-dev",
            storageBucket: "tt-webapp-dev.appspot.com",
            messagingSenderId: "714056832189",
            appId: "1:714056832189:web:ca147ba370f6eef56453d4"
        },
        baseUrl: `http://localhost:8081/api/v1`
    },
    prod: {
        firebase: {
            apiKey: VITE_FIREBASE_API_KEY,
            authDomain: "tt-webapp.firebaseapp.com",
            projectId: "tt-webapp",
            storageBucket: "tt-webapp.appspot.com",
            messagingSenderId: "714056832189",
            appId: "1:714056832189:web:ca147ba370f6eef56453d4"
        },
        baseUrl: ``
    }
};

// Initialize Firebase
export const app = initializeApp(configData[VITE_ENV as ENV].firebase);

export const getConfig = () => {
    const env = VITE_ENV as ENV;
    return configData[env] || configData.dev;
};