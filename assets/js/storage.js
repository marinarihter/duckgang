import { STORAGE_KEY } from "./const.js";

export function getTopScoreFromLocalStorage () {
    let topScore = localStorage.getItem(STORAGE_KEY) || 0;
    if (topScore === 0) {
        localStorage.setItem(STORAGE_KEY, 0);
    }
    return topScore;
}

export function setTopScoreIntoLocalStorage () {
    if (this.score > getTopScoreFromLocalStorage()) {
        localStorage.setItem(STORAGE_KEY, this.score)
    }
}