// Representasi Pohon Keputusan (Sama seperti sebelumnya, SESUAIKAN DENGAN MODEL ANDA)
const decisionTree = {
    start: {
        question: "APAKAH ADA BUILDER MENGANGGUR?",
        options: [
            { text: "YA", next: "builderAvailable" },
            { text: "TIDAK", next: "noBuilder" }
        ]
    },

    builderAvailable: {
        question: "APAKAH TOWN HALL SUDAH MAKSIMAL?",
        options: [
            { text: "YA", next: "noUpgradeTH" },
            { text: "TIDAK", next: "upgradeTH" }
        ]
    },

    upgradeTH: {
        question: "UPGRADE TOWN HALL HINGGA LEVEL MAKS",
        options: [
            { text: "OK", next: "Rekomendasi: Prioritaskan upgrade Town Hall Anda!" } // Ini bisa jadi hasil akhir atau pertanyaan lanjutan
        ]
    },

    noUpgradeTH: {
        question: "APA PRIORITAS UTAMA SAAT INI?",
        options: [
            { text: "PERTAHANAN", next: "priorityDefense" },
            { text: "SUMBER DAYA", next: "priorityResource" },
            { text: "PASUKAN", next: "priorityArmy" }
        ]
    },

    // ... (Lanjutkan node pohon keputusan lainnya dari contoh sebelumnya)
    // Misalnya:
    priorityDefense: {
        question: "APAKAH PERTAHANAN PENTING SUDAH MAKSIMAL?",
        options: [
            { text: "YA",  next: "considerWalls" },
            { text: "TIDAK", next: "Rekomendasi: Upgrade bangunan pertahanan terpenting Anda (Inferno Tower, Eagle Artillery, X-Bow)!" }
        ]
    },
    considerWalls: {
        question: "APAKAH LEVEL TEMBOK ANDA MAKSIMAL?",
        options: [
            { text: "YA", next: "checkTraps" },
            { text: "TIDAK", next: "Rekomendasi: Gunakan builder untuk upgrade tembok Anda!"}
        ]
    },
    checkTraps: {
        question: "APAKAH JEBAKAN (TRAPS) ANDA SUDAH MAKSIMAL?",
        options: [
            { text: "YA", next: "checkUpgrade" },
            { text: "TIDAK", next: "Rekomendasi: Upgrade jebakan (traps) Anda!"  }
        ]
    },
    priorityResource: {
        question: "APAKAH KOLEKTOR SUMBER DAYA SUDAH MAKSIMAL?",
        options: [
            { text: "YA", next: "storageResource" },
            { text: "TIDAK", next: "Rekomendasi: Upgrade kolektor sumber daya Anda untuk pendapatan pasif!" }
        ]
    },
    storageResource:{
        question: "APAKAH PENYIMPANAN SUMBER DAYA SUDAH MAKSIMAL?",
        options: [
            { text: "YA", next: "considerWalls"},
            { text: "TIDAK", next: "Rekomendasi: Upgrade penyimpanan sumber daya Anda untuk daya tampung lebih besar!"}
        ]
    },
    priorityArmy: {
        question: "APAKAH INGIN MEMBUKA ATAU MEMPERKUAT PASUKAN?",
        options: [
            { text: "YA", next: "upgradeTroops" },
            { text: "TIDAK", next: "considerWalls" }
        ]
    },
    upgradeTroops: {
        question: "APA PRIORITAS UTAMA SAAT INI?",
        options: [
            { text: "BELUM PUNYA PASUKAN", next: ""},
            { text: "PERLU SPELL", next: "Rekomendasi: Upgrade spell factory"},
            { text: "PERLU PASUKAN LEBIH KUAT", next: "Rekomendasi: Upgrade barraks atau dark barraks"}
        ]
    },
    noBuilder: {
        question: "SEMUA BUILDER ANDA SEDANG BEKERJA.",
        options: [
            { text: "OK", next: "Rekomendasi: Bersabar dan kumpulkan sumber daya. Persiapkan upgrade berikutnya!" }
        ]
    },
    checkUpgrade: {
        question: "APAKAH ADA BANGUNGAN YANG BELUM DI-UPGRADE?",
        options: [
            { text: "YA", next: "noUpgradeTH"},
            { text: "TIDAK", next: "Rekomendasi: Upgrade Town Hall"}
        ]
    }
};

let currentNode = decisionTree.start; // Node awal kuis

// Mengambil elemen HTML
const startScreen = document.getElementById('start-screen');
const questionArea = document.getElementById('question-area');
const resultArea = document.getElementById('result-area');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultText = document.getElementById('result-text');


// Fungsi untuk memulai kuis dari layar awal
function startQuiz() {
    startScreen.classList.add('hidden'); // Sembunyikan layar awal
    displayQuestion(currentNode); // Tampilkan pertanyaan pertama
}

// Fungsi untuk menampilkan pertanyaan
function displayQuestion(node) {
    questionArea.classList.remove('hidden');
    resultArea.classList.add('hidden');

    questionText.textContent = node.question;
    optionsContainer.innerHTML = ''; // Kosongkan opsi sebelumnya

    node.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.classList.add('option-button');
        button.onclick = () => {
            handleAnswer(option.next);
        };
        optionsContainer.appendChild(button);
    });
}

// Fungsi untuk menangani jawaban
function handleAnswer(next) {
    if (typeof next === 'string') {
        // Jika 'next' adalah string, itu berarti itu adalah hasil akhir
        displayResult(next);
    } else {
        // Jika 'next' adalah objek, itu berarti itu adalah node pertanyaan berikutnya
        currentNode = next;
        displayQuestion(currentNode);
    }
}

// ...existing code...
function handleAnswer(next) {
    if (typeof next === 'string' && next.startsWith('Rekomendasi:')) {
        // Jika 'next' adalah string hasil rekomendasi
        displayResult(next);
    } else if (typeof next === 'string' && decisionTree[next]) {
        // Jika 'next' adalah key node berikutnya
        currentNode = decisionTree[next];
        displayQuestion(currentNode);
    } else {
        // Fallback jika tidak ditemukan
        displayResult("Terjadi kesalahan pada alur pohon keputusan.");
    }
}
// ...existing code...

// Fungsi untuk menampilkan hasil
function displayResult(result) {
    questionArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    resultText.textContent = result;
}

// Fungsi untuk memulai ulang kuis (kembali ke layar awal)
function restartQuiz() {
    startScreen.classList.remove('hidden'); // Tampilkan kembali layar awal
    questionArea.classList.add('hidden'); // Pastikan area pertanyaan tersembunyi
    resultArea.classList.add('hidden'); // Pastikan area hasil tersembunyi
    currentNode = decisionTree.start; // Reset node current ke awal
}

// Memulai kuis saat halaman dimuat (akan menampilkan layar awal)
document.addEventListener('DOMContentLoaded', () => {
    // startQuiz() tidak dipanggil di sini, karena kita ingin start-screen muncul duluan
    // start-screen sudah diatur sebagai visible di HTML secara default
});

//Tutup dropdown saat klik di luar menu
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (!dropdown.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

// // Tampilkan kembali dropdown saat hover
const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('mouseenter', function() {
    const dropdownMenu = this.querySelector('.dropdown-menu');
    dropdownMenu.style.display = 'block';
});
dropdown.addEventListener('mouseleave', function() {
    const dropdownMenu = this.querySelector('.dropdown-menu');
    dropdownMenu.style.display = 'none';
});