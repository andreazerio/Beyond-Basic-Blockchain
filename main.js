const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index,timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined: ' + this.hash)
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }

    createGenesisBlock() {
       return new Block(0, '1/12/2017', 'Genesis Block', '0'); 
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) return false;
            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }
}

let zerCoin = new Blockchain;
let time = 0;
while (time < 30) {
    time++
    console.log(`mining block ${zerCoin.chain[zerCoin.chain.length - 1].index + 1}`);
    zerCoin.addBlock(new Block(zerCoin.chain[zerCoin.chain.length - 1].index + 1, Date.now(), {amount: Math.random() * 100}));
};
// zerCoin.chain[1].data = {amount: 10000000}
console.log(zerCoin.isChainValid() ? `this is your zerCoin chain: ${JSON.stringify(zerCoin.chain, null, 2)}` : `Blockchain not valid`);