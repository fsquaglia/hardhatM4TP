const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Este módulo se encarga de desplegar el contrato TipJar sin parámetros adicionales.
module.exports = buildModule("TipJarModule", (m) => {
  // No hay parámetros que pasar al constructor
  const tipJar = m.contract("TipJar", []);

  return { tipJar };
});
