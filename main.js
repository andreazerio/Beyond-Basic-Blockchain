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

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.hash = this.calculateHash();
        }
        console.log('Block mined' + this.hash)
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
zerCoin.addBlock(new Block(1, '5/12/2017', {amount: 1}));
zerCoin.addBlock(new Block(2, '7/12/2017', {amount: 5}));
zerCoin.addBlock(new Block(3, '9/12/2017', {amount: 12}));

zerCoin.chain[1].data = {amount: 100}
zerCoin.chain[1].calculateHash();
console.log(zerCoin.isChainValid() ? 'blockchain is valid' : 'error in the blockchain');
