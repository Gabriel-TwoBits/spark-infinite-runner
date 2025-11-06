import k from "../kaplayCtx";
import { translations } from "../kaplayCtx";

export default function languageMenu(){
    k.add([
        k.text(T("disclaimer"), {font: "mania", size: 30}),
        k.pos(0, 20),
        "localized",
        { translationKey: "disclaimer" },
    ]);
    
    k.add([
        k.text(T("game-title"), {font: "mania", size: 70}),
        k.pos(k.center().x, k.center().y - 200),
        k.anchor("center"),
        "localized", // Add the localized tag
        { translationKey: "game-title" } // Store the key
    ]);

    // Language buttons
    const buttonENbox = k.add([
        k.rect(400, 150, {radius: 4}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x - 400, k.center().y),
        k.z(-1),
    ]);
    
    buttonENbox.add([
        k.text("ENGLISH", {font: "mania", size: 70}),
        k.anchor("center"),
        k.z(2),
    ]);
    
    const buttonPTbox = k.add([
        k.rect(400, 150, {radius: 4}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x + 400, k.center().y),
        k.z(-1),
    ]);

    buttonPTbox.add([
        k.text("PORTUGUÊS", {font: "mania", size: 70}),
        k.anchor("center"),
    ]);

    const buttonStartbox = k.add([
        k.rect(300, 150, {radius: 4}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x, k.center().y + 250),
    ]);

    k.add([
        k.text(T("start-button"), {font: "mania", size: 70}),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y + 250),
        "localized",
        { translationKey: "start-button" },
    ]);

    k.add([
        k.text(T("hint"), {font: "mania", size: 30}),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y + 375),
        "localized",
        { translationKey: "hint" },
    ])

    buttonStartbox.onClick(() => k.go("main-menu"))
    buttonENbox.onClick(() => setLanguage("en"));
    buttonPTbox.onClick(() => setLanguage("pt"));

};

let currentLanguage = "pt"; // Default language

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