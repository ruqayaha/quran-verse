async function getVerse() {
    try {
        // We fetch the "edition" for both Arabic and English Translation
        const response = await fetch('https://api.alquran.cloud/v1/ayah/random/editions/quran-uthmani,en.asad');
        const result = await response.json();
        
        // Data from the first edition (Arabic)
        const arabic = result.data[0].text;
        // Data from the second edition (English)
        const english = result.data[1].text;
        const info = `Surah ${result.data[0].surah.englishName} (${result.data[0].surah.number}:${result.data[0].numberInSurah})`;

        document.getElementById('arabic-text').innerText = arabic;
        document.getElementById('translation-text').innerText = english;
        document.getElementById('verse-info').innerText = info;
    } catch (error) {
        console.error("Error fetching verse:", error);
    }
}

function copyToClipboard() {
    const arabic = document.getElementById('arabic-text').innerText;
    const english = document.getElementById('translation-text').innerText;
    const info = document.getElementById('verse-info').innerText;
    
    const fullText = `${arabic}\n\n${english}\n\n— ${info}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
        alert("Verse copied to clipboard!");
    });
}

// Load a verse immediately when the page opens
getVerse();
