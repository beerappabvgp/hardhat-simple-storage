const {ethers} = require("hardhat");
const {expect, assert} = require("chai");
describe("SimpleStorage" , () => {
  let simpleStorageFactory , simpleStorage
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  })
  it("Should start with a fav number of 0" , async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = 0;
    assert.equal(currentValue.toString() , expectedValue);
  });
  it.only("Should update when we call store" , async () => {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString() , expectedValue);
  });

})