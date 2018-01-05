# Beyond Basic Blockchain

## Overview

A little project to start exploring Blockchain technology. 

The purpose of this project is to understand how a blockchain works by creating a very simple and basic example of it.

## The Blockchain  

A blockchain is a distributed database that maintains a continuously growing list of ordered records. The advantage of using a blockchain as a ledger is its security and accountability due to the decentralised network, proof-of-work algorithm and incryption of users.

This projects contains the basic skeleton of a blockchain: 

1. Encryption using SHA256 algorithm
2. Proof-of-work algorithm using Bitcoin-style difficulty parameter to allow mining of blocks

This is not a complete implementation but simply a look inside the blockchain technology to see how it works interaly. I will soon be implementing more essential features (including the P2P network).

The Blockchain will allow for new blocks to be added according to the proof-of-work algorithm, however an change to a block will alter its hash and will not be allowed;

To create the Blockchain simply open a new command line and run the following: 

```node main.js```

By uncommenting the code in green you will try to modify the Blockchain, which will result in it being not valid. To see this simply re-type

```node main.js```

in your terminal window.
