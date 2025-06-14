const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TipJar", () => {
  let TipJar, tipJar, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    TipJar = await ethers.getContractFactory("TipJar");
    tipJar = await TipJar.deploy();
    await tipJar.waitForDeployment();
  });

  it("debe recibir propinas y emitir evento", async () => {
    await expect(
      tipJar.connect(addr1).tip("Buena suerte!", {
        value: ethers.parseEther("0.01"),
      })
    )
      .to.emit(tipJar, "NewTip")
      .withArgs(addr1.address, ethers.parseEther("0.01"), "Buena suerte!");
  });

  it("solo el owner puede retirar", async () => {
    await expect(tipJar.connect(addr1).withdraw()).to.be.revertedWith(
      "Solo el owner puede retirar"
    );
  });

  it("actualiza balance correctamente", async () => {
    await tipJar.connect(addr1).tip("Hola!", {
      value: ethers.parseEther("0.05"),
    });
    const balance = await tipJar.getBalance();
    expect(balance).to.equal(ethers.parseEther("0.05"));
  });
});
