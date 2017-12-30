const SHA256 = require('crypto-js/sha256')


class Block {
    constructor(index,timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
       return new Block(0, '1/12/2017', 'Genesis Block', '0'); 
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let zerCoin = new Blockchain;
zerCoin.addBlock(new Block(1, '5/12/2017', {amount: 1}));
zerCoin.addBlock(new Block(2, '7/12/2017', {amount: 5}));
zerCoin.addBlock(new Block(3, '9/12/2017', {amount: 12}));

