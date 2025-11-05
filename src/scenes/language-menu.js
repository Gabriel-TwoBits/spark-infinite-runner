import k from "../kaplayCtx";
import { translations } from "../kaplayCtx";

export default function languageMenu(){
    k.add([
        k.text(T("game-title"), {font: "mania", size: 70}),
        k.pos(k.center().x, 100),
        k.anchor("center"),
        "localized", // Add the localized tag
        { translationKey: "game-title" } // Store the key
    ]);

    // Language buttons
    const buttonEN = k.add([
        k.text("ENGLISH", {font: "mania", size: 70}),
        k.pos(100, 300),
        k.area(),
    ]);
    
    const buttonPT = k.add([
        k.text("PORTUGUÊS", {font: "mania", size: 70}),
        k.pos(400, 300),
        k.area(),
    ]);

    const buttonStart = k.add([
        k.text(T("start-button"), {font: "mania", size: 70}),
        k.pos(k.center().x, 500),
        k.anchor("center"),
        k.area(),
        "localized",
        { translationKey: "start-button" },
    ]);

    buttonStart.onClick(() => k.go("main-menu"))
    buttonEN.onClick(() => setLanguage("en"));
    buttonPT.onClick(() => setLanguage("pt"));

};

let currentLanguage = "en"; // Default language

export function T(key) {
    // T is a shorthand for Translate
    const phrase = translations[key];
    if (phrase && phrase[currentLanguage]) {
        return phrase[currentLanguage];
    }
    // Fallback to English if a translation is missing
    return translations[key]["en"] || "MISSING TRANSLATION"; 
}

function setLanguage(langCode) {
    currentLanguage = langCode;
    // You will need a way to update all existing text objects on screen
    updateAllTexts(); 
}

// Function to update all text objects in the current scene
function updateAllTexts() {
    // k.get("tag") retorna um Array de objetos Kaplay
    const localizedObjects = k.get("localized");

    // Iteramos usando o método forEach nativo de Arrays
    localizedObjects.forEach((textObject) => {
        const key = textObject.translationKey;
        if (key) {
            // Atualiza a propriedade 'text' do objeto Kaplay
            textObject.text = T(key); 
        }
    });
}