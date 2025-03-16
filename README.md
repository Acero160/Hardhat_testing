# 🎰 **CryptoLotto** - A Decentralized Lottery Smart Contract

**CryptoLotto** is a decentralized lottery built on the Ethereum blockchain using **Solidity** and **Hardhat**. This project enables users to buy **ERC20 tokens** and **lottery tickets**, and participate in a lottery where a winner is randomly chosen. The contract is fully tested using **Hardhat** and **Chai** to ensure functionality and correctness.

## 🧪 **Testing Overview**

One of the core strengths of this project is its extensive test suite, which ensures the contract behaves as expected in various scenarios. The tests are written using **Hardhat**, **Mocha**, and **Chai**, covering all the essential features and edge cases. Here’s a summary of the tests:

### 🔧 **Test Scenarios Covered**

- **Deployment Tests**
  - Ensures that the contract is deployed correctly and initializes with the expected state, including the token balance.
  
- **Minting ERC20 Tokens**
  - Tests for minting functionality, ensuring only the owner can mint tokens and the contract’s balance increases accordingly.

- **Buying Tokens**
  - Verifies the process of purchasing tokens via the `buyTokensERC20` function. This test ensures that users can only buy tokens if enough tokens are available and that the correct amount of Ether is paid.

- **User Information**
  - Checks that a user is registered properly and their contract information is stored correctly after interacting with the contract.

- **Buying Tickets**
  - Verifies that users can buy lottery tickets with the purchased tokens, ensuring ticket assignments are done correctly and users can’t purchase tickets without sufficient funds.

- **Winner Generation**
  - Ensures that only the contract owner can generate a winner and that a random winner is selected fairly from users who have purchased tickets. The winner’s address receives 90% of the prize, and the owner receives the remaining 10%.

### 📝 **Test Suite**

- **The tests are located in the `test/` directory. They verify that all critical functions of the contract work as expected, covering scenarios like insufficient funds, ownership restrictions, and successful token transfers.**

## 🛠 **Technologies Used**
- **Solidity**: Smart contract development language.
- **Hardhat**: Ethereum development environment, used for deployment and testing.
- **OpenZeppelin Contracts**: Used for implementing **ERC20**, **ERC721**, and **Ownable** functionalities.
- **Mocha & Chai**: Testing frameworks used for writing unit tests and assertions.

## 📦 **Installation**

To get started, clone this repository and install the dependencies:

```bash
git clone https://github.com/yourusername/cryptolotto.git
cd cryptolotto
npm install
```
## **📝 Running the Tests**
You can run the tests using Hardhat. The test suite will automatically check all the critical functions of the contract. To run the tests, simply execute:

```bash
npx hardhat test
```
**Example Test Output**
````bash
  Lottery
    Deploy
      ✓ Should set the right initial balance
      ✓ Should deploy NFTs contract
    Mint ERC20
      ✓ Should revert the mint, not the owner
      ✓ Shouldn't revert the mint
    Buy tokens ERC20
      ✓ Should revert the transaction, not enough tokens
      ✓ Should revert the transaction, not enough ethers
      ✓ Shouldn't revert the transaction
    Users Info
      ✓ Shouldn't have any information
      ✓ Should have information
    Buy Tickets
      ✓ Shouldn't can buy any tickets
      ✓ Should can buy tickets
    Generate winner
      ✓ Shouldn't generate winner, not the owner
      ✓ Shouldn't generate winner, no tickets bought
      ✓ Should generate winner
````
## **🔐 Security Considerations**
- **Access Control: Only the contract owner can mint new tokens or generate winners. This is enforced using OpenZeppelin's Ownable modifier.**
- **Randomness: The random number for selecting a winner is generated using block data. While this is sufficient for a demo, it may need to be replaced with a more secure source of randomness (e.g., Chainlink VRF) for production use.**
## **📄 License**
- **This project is licensed under the MIT License - see the LICENSE file for details.**

## **👨‍💻 Contributing**
**Feel free to fork this repository, submit issues, and create pull requests. Contributions are welcome!**




