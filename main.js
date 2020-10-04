const SHA256 = require('crypto-js/sha256');

class block {
    constructor(body,timestamp,height,previousHash=''){
        this.body = body;
        this.timestamp = timestamp;
        this.height = height;
        this.previousHash = previousHash;
        this.Hash = this.calculateHash();
    }
    calculateHash() {
return SHA256(this.body + this.previousHash + this.timestamp + JSON.stringify(this.body)).toString();
    }
}
class blockchain{
    constructor(){
        this.chain = [this.createGenesisblock()];
    }
    createGenesisblock(){
        return new block([],"01/10/2020","1325438","0");
    }
    getLatestblock(){
        return this.chain[this.chain.length-1];
    }
    addblock(newblock){
        newblock.previousHash = this.getLatestblock().Hash;
        newblock.Hash = newblock.calculateHash();
        this.chain.push(newblock);
    }

    isChainValid(){
        for(let i=1; i<this.chain.length;i++){
            const currentblock = this.chain[i];
            const previousblock = this.chain[i-1];

            if(currentblock.Hash !== currentblock.calculateHash()){
                return false;
            }


                if(currentblock.previousHash !== previousblock.Hash){
                    return false;
                }  
            }
            return true;
        
    }
}
 
let savejeeCoin =  new blockchain();
savejeeCoin.addblock(new block(1,"10/10/2020",{amount:4}));
savejeeCoin.addblock(new block(2,"12/10/2020",{amount: 10}));

console.log('Is blockchain valid?'+ savejeeCoin.isChainValid());

savejeeCoin.chain[1].body = {amount:100};
savejeeCoin.chain[1].hash = savejeeCoin.chain[1].calculateHash();

console.log('Is blockchain valid?'+ savejeeCoin.isChainValid());

//console.log(JSON.stringify(savejeeCoin, null, 4));