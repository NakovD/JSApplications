function solve(_classToExtend) {
    let classToExtend = _classToExtend;
    classToExtend.prototype.species = 'Human';
    classToExtend.prototype.toSpeciesString = function (params) {
        return `I am a ${this.species}. ${this.toString()}`;        
    } 
}
solve();