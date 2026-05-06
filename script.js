const levels = [
    {
        title: "Mission 1: Sparky the Space-Dog",
        story: "Sparky has the 'Wobbly-Tail' mutation. Let's fix the typo in his DNA so he can wag his tail in zero gravity!",
        dna: "ATGAGTACTACGGTGCTAGCTAAGACCTAG", 
        correctPamIndex: 25, 
        answer: "AUGAUGCCACGAUCGAUUCU",
        // Cute Dog Photo
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fHww"
    },
    {
        title: "Mission 2: The Super-Tomato",
        story: "Bella's prize-winning tomato plant has a 'Frost-Bite' typo. Let's clear the mutation so it can survive the cold winter!",
        dna: "TTAGGATCGATCGATCGATCGATCGCCTAG", 
        correctPamIndex: 25, 
        answer: "UAGCUAGCUAGCUAGCUAGC",
        // Tomato Plant
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80"
    },
    {
        title: "Mission 3: Alex the Astronaut",
        story: "Alex is experiencing 'Stardust-Fatigue' due to a typo in his energy cells. Let's use our scissors to help him explore the galaxy!",
        dna: "AATGATGACGTAAGCTAGTAGGCTACCTAG", 
        correctPamIndex: 25, 
        answer: "ACUGCAUUCGAUCAUCCGAU",
        // Floating Astronaut
        image: "https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&w=400&q=80" 
    },
    {
        title: "Mission 4: The Deep-Sea Jelly",
        story: "A rare jellyfish has a 'Fading-Glow' mutation. Let's fix the typo so it can light up the dark ocean again!",
        dna: "ATATAGTGTAGTGATAATAGTAGTACCTAG", 
        correctPamIndex: 25, 
        answer: "CACAUCACUAUUAUCAUCAU",
        // Glowing Jellyfish
        image: "https://images.unsplash.com/photo-1508311603478-ce574376c3cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVsbHlmaXNofGVufDB8fDB8fHww" 
    },
    {
        title: "Mission 5: The Dino-Clone",
        story: "Our cloned Triceratops has a 'Brittle-Horn' glitch. Let's fix the DNA instructions so he can play safely in the park!",
        dna: "TAGATATGATGTATGATGTATGACCGTATA", 
        correctPamIndex: 23, 
        answer: "UAUACUACAUACUACAUACU",
        // Cool Reptile/Dino vibe
        image: "https://images.unsplash.com/photo-1633876204719-dd74580764ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlub3NhdXJ8ZW58MHx8MHx8fDA%3D" 
    }
];
let currentLevelIndex = 0;
let targetLocked = false;

function showScreen(screenId) {
    document.getElementById('menu-screen').classList.remove('active');
    document.getElementById('rules-screen').classList.remove('active');
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    currentLevelIndex = 0;
    showScreen('game-screen');
    loadLevel();
}

function loadLevel() {
    targetLocked = false;
    const level = levels[currentLevelIndex];
    
    document.getElementById('mission-progress').innerText = "Mission " + (currentLevelIndex + 1) + " / " + levels.length;
    document.getElementById('level-title').innerText = level.title;
    
    // NEW: Updates the image for the specific mission
    document.getElementById('mission-image').src = level.image;
    
    document.getElementById('level-story').innerText = level.story;
    document.getElementById('message').innerText = "Step 1: Click the FIRST 'C' of the Anchor (CC_) to lock your scissors onto the DNA.";
    document.getElementById('message').className = "info";
    document.getElementById('input-section').style.display = "none";
    document.getElementById('next-level-section').style.display = "none";
    document.getElementById('rnaInput').value = "";

    const board = document.getElementById('dna-board');
    board.innerHTML = "";
    
    for (let i = 0; i < level.dna.length; i++) {
        let span = document.createElement("span");
        span.innerText = level.dna[i];
        span.className = "dna-base";
        span.id = "base-" + i;
        span.onclick = function() { scanSequence(i); };
        board.appendChild(span);
    }
}

function scanSequence(clickedIndex) {
    if (targetLocked) return; 

    const level = levels[currentLevelIndex];
    const msg = document.getElementById('message');

    if (clickedIndex < 20) {
        msg.innerText = "⚠️ Scissors can't fit! The Anchor needs 20 letters of DNA to its left.";
        msg.className = "error";
        return;
    }

    if (clickedIndex === level.correctPamIndex) {
        targetLocked = true;
        msg.innerText = "🎯 ANCHOR LOCKED! The 20-letter mutation is now color-coded. Translate it below!";
        msg.className = "success";
        
        for (let i = 0; i < level.dna.length; i++) {
            let base = document.getElementById("base-" + i);
            
            if (i >= clickedIndex - 20 && i < clickedIndex) {
                let letter = level.dna[i];
                base.className = "dna-base color-" + letter; 
            } 
            else if (i >= clickedIndex && i < clickedIndex + 3) {
                base.className = "dna-base locked-pam"; 
            } 
            else {
                base.className = "dna-base dimmed";
            }
        }
        
        document.getElementById('input-section').style.display = "block";
        document.getElementById('rnaInput').focus(); 

    } else {
        msg.innerText = "❌ That's not the correct Anchor. Look for the 'CC' combination!";
        msg.className = "error";
    }
}

document.getElementById('rnaInput').addEventListener('input', function (e) {
    let val = this.value.toUpperCase();
    this.value = val.replace(/[^AUCG]/g, ''); 
});

function checkRNA() {
    const input = document.getElementById('rnaInput').value;
    const msg = document.getElementById('message');
    const level = levels[currentLevelIndex];

    if (input.length !== 20) {
        msg.innerText = "⚠️ Your Key must have exactly 20 letters! You currently have " + input.length + ".";
        msg.className = "error";
        return;
    }

    if (input === level.answer) {
        msg.innerText = "🎉 SUCCESS! Perfect binding! You cleanly cut out the typo.";
        msg.className = "success";
        document.getElementById('next-level-section').style.display = "block";
        
        if (currentLevelIndex === levels.length - 1) {
            document.getElementById('next-btn').innerText = "FINISH GAME 🏆";
            document.getElementById('next-btn').style.backgroundColor = "#16a34a";
            document.getElementById('next-btn').style.boxShadow = "0 6px 0 #15803d";
        }
    } else {
        msg.innerText = "💥 OOPS! The key didn't fit. Check the colors and try again.";
        msg.className = "error";
    }
}

function nextLevel() {
    currentLevelIndex++;
    if (currentLevelIndex < levels.length) {
        loadLevel();
    } else {
        document.getElementById('game-screen').innerHTML = `
            <br><br>
            <h1 style='font-size: 50px; color: #16a34a; text-shadow: 0 4px 0 #dcfce7;'>🏆 GAME CLEARED!</h1>
            <p style='color:#475569; font-size: 24px; margin-bottom: 30px; line-height: 1.4;'>You successfully used CRISPR to fix every typo and save the day!<br><br><strong>Help us improve the simulation by leaving quick feedback!</strong></p>
            
            <a href="https://forms.gle/MzfShmtLjrB3LXQq5" target="_blank" style="text-decoration: none;">
                <button class='btn' style='background-color: #8b5cf6; box-shadow: 0 6px 0 #6d28d9; font-size: 26px; padding: 20px 40px; margin-bottom: 15px;'>📝 Submit Quick Feedback</button>
            </a>
            <br><br>
            <button class='btn btn-secondary' style='font-size: 20px; max-width: 250px;' onclick='location.reload()'>Play Again</button>
        `;
    }
}
