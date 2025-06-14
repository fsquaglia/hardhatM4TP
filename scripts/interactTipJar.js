const { ethers } = require("ethers");
const dotenv = require("dotenv");
const tipJarABI = require("../artifacts/contracts/TipJar.sol/TipJar.json");

dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const TIPJAR_ADDRESS = "0xfEa49fB3D060FfA36246178f4Fa5e75F182DD608";

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
);

const wallet = new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider);

const tipJarContract = new ethers.Contract(
  TIPJAR_ADDRESS,
  tipJarABI.abi,
  wallet
);

// Enviar propina con mensaje
async function sendTip(message, amountInEth) {
  console.log(
    `Enviando propina de ${amountInEth} ETH con mensaje: "${message}"...`
  );
  const tx = await tipJarContract.tip(message, {
    value: ethers.parseEther(amountInEth),
  });
  const receipt = await tx.wait();
  console.log("Propina enviada con éxito");
  console.log("Tx Hash:", receipt.hash);
}

// Ver saldo del contrato
async function getContractBalance() {
  const balance = await provider.getBalance(TIPJAR_ADDRESS);
  console.log(
    `Balance actual del contrato: ${ethers.formatEther(balance)} ETH`
  );
  return balance;
}

// Retirar fondos (solo owner)
async function withdrawFunds() {
  console.log("Retirando fondos...");
  const tx = await tipJarContract.withdraw();
  const receipt = await tx.wait();
  console.log("Fondos retirados con éxito");
  console.log("Tx Hash:", receipt.hash);
}

// Ejecutar funciones
async function main() {
  // await sendTip("Aguante los Smart Contracts 😁", "0.01");
  await withdrawFunds();
  await getContractBalance();
}

main().catch((error) => {
  console.error("Error al ejecutar el script:", error);
});
