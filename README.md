# TipJar - Contrato de propinas en Ethereum

## Requisitos

- Node.js
- Hardhat con Ethers.js
- Alchemy
- Cuenta en Sepolia con ETH

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Agregar variables a .env ALCHEMY_API_KEY="" SEPOLIA_PRIVATE_KEY=""
   ETHERSCAN_API_KEY=""

3. Compilar

```bash
npx hardhat compile
```

4. Testear

```bash
npx hardhat test
```

5. Deployar en Sepolia

```bash
npx hardhat run ignition/modules/Deploy.js --network sepolia
```

6. Interactuar

##### Editar el archivo scripts/interactTipJar.js comentando y descomentando las líneas necesarias dentro de la función:

"async function main() {..."

Correr con:

```bash
npx hardhat run scripts/interactTipJar.js
```
