// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Create a new keypair
const newPair = new Keypair();

// Extract the public and private keys from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public Key of the generated keypair", publicKey);

// Get the wallet balance from a given account address
const getWalletBalance = async (accountaddress) => {
    try {
        // Get balance of the provided wallet address
        const walletBalance = await connection.getBalance(
            new PublicKey(accountaddress)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (accountaddress) => {
    try {
        // Request airdrop of 2 SOL to the provided wallet address
        console.log("Airdropping some SOL to the wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(accountaddress),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance(publicKey); // Pass the publicKey or any other account address you want to check
    await airDropSol(publicKey); // Pass the publicKey or any other account address you want to airdrop to
    await getWalletBalance(publicKey); // Pass the publicKey or any other account address you want to check
}

mainFunction();
